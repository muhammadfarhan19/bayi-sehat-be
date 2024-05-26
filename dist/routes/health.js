"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.HealthRouter = void 0;
const express_1 = require("express");
const logger_1 = require("../utils/logger");
exports.HealthRouter = (0, express_1.Router)();
exports.HealthRouter.get('/', (req, res, next) => {
    logger_1.logger.info('Health check succes');
    res.status(200).send({ status: '200', message: 'Bayi Sehat API is Ready' });
});
