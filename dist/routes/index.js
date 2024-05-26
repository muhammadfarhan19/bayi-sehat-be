"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const homepage_controller_1 = require("../controllers/homepage.controller");
const baby_controller_1 = require("../controllers/baby.controller");
const router = (0, express_1.Router)();
router.get('/home', homepage_controller_1.homePageHandler);
router.get('/baby', baby_controller_1.getBaby);
exports.default = router;
