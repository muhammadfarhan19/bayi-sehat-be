"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AntropometricRouter = void 0;
const express_1 = require("express");
const antropometri_controller_1 = require("../controllers/antropometri.controller");
exports.AntropometricRouter = (0, express_1.Router)();
exports.AntropometricRouter.get('/', antropometri_controller_1.getAntropometric);
