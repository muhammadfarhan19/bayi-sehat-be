"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.createBabyValidation = void 0;
const joi_1 = __importDefault(require("joi"));
const createBabyValidation = (payload) => {
    const schema = joi_1.default.object({
        name: joi_1.default.string().required(),
        gender: joi_1.default.string().required(),
        birthdate: joi_1.default.date().required(),
        parent_name: joi_1.default.string().required(),
        address: joi_1.default.string().allow('', null).default('Dukuh Gading'),
        phone_number: joi_1.default.string().allow('', null).default('-')
    });
    return schema.validate(payload);
};
exports.createBabyValidation = createBabyValidation;
