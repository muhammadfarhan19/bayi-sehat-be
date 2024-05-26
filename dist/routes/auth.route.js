"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthRouter = void 0;
const express_1 = require("express");
const auth_controller_1 = require("../controllers/auth.controller");
exports.AuthRouter = (0, express_1.Router)();
exports.AuthRouter.post('/register', auth_controller_1.userRegistration);
exports.AuthRouter.post('/login', auth_controller_1.createUserSession);
exports.AuthRouter.post('/refresh', auth_controller_1.refreshSession);
