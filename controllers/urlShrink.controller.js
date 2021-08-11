const path = require("path");
const fs = require("fs");
const { createData } = require("../utils/helper");

/* Importing storage file */
const file = path.join(__dirname, "../storage/store.json");

exports.createShrinkUrl = async (req, res) => {
  const { fullUrl } = req.body;

  /* Checking required data provided or not */
  if (!fullUrl) {
    return res.status(403).send({ Message: "Required field is not provided" });
  }

  fs.readFile(file, (err, data) => {
    if (err) {
      const storeData = createData(fullUrl);

      /* if the store file not present the creating a new one with data */
      fs.appendFile(file, JSON.stringify(storeData), (err) => {
        if (err) return console.error("Error: ", err);
        res.send({ data: storeData });
      });
      return;
    }
    const fileData = JSON.parse(data.toString());
    const shortUrl = fileData.find(el => el.fullUrl === fullUrl);

    /* Checking passed url already have or not, if have then return existing shortURl else generating a new one */
    if (typeof shortUrl !== "undefined") {
      return res.status(200).send({ data: [shortUrl] });
    } else {
      const newData = createData(fullUrl);
      const storeData = [...fileData, ...newData];
      fs.writeFile(file, JSON.stringify(storeData), (err) => {
        if (err) return console.error("Error: ", err);
        return res.status(200).send({ data: newData });
      });
    }
  });
};

exports.handleShortUrl = (req, res) => {
  const { shortUrl } = req.params;

  /* Checking required data provided or not */
  if (!shortUrl) {
    return res.status(403).send({ Message: "Required field is not provided" });
  }

  fs.readFile(file, (err, data) => {
    if (err) return res.status(400).send({ Message: "Data not found" });

    const fileData = JSON.parse(data.toString());
    const storedData = fileData.find(el => el.shortUrl === shortUrl);

    /* Checking here as the shortUrl sored or not */
    if (typeof shortUrl === "undefined") {
      return res.status(400).send({ Message: "Data not found" });
    } else {
      return res.redirect(storedData.fullUrl);
    }
  });
};
