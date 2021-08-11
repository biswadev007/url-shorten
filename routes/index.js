const urlShrinkRoutes = require("./urlShrink.routes");

module.exports = (app) => {
    app.use("/", urlShrinkRoutes);
}