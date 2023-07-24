const express = require("express");
const fetch = (...args) => import("node-fetch").then(({default: fetch}) => {fetch(...args)});

const router = express.Router();

module.exports = router;