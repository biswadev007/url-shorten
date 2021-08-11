const randomstring = require("randomstring");

const createData = (fullUrl) => {
  return [
    {
      fullUrl,
      shortUrl: randomstring.generate({
        length: 7,
        charset: "alphabetic",
      }),
    },
  ];
};

module.exports = {
    createData
}