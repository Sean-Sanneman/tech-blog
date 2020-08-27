const router = require("express").Router();
const api_routes = require("./api_routes/");
const main = require("./main_routes");
const dashboard = require("./dashboard_routes");

router.use("/", main);
router.use("/dashboard", dashboard);
router.use("/api", api_routes);


module.exports = router;