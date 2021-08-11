const express = require("express");
const routes = express.Router();

const { createShrinkUrl, handleShortUrl } = require("../controllers/urlShrink.controller");

routes.post("/", createShrinkUrl);
routes.get("/:shortUrl", handleShortUrl);

module.exports = routes;