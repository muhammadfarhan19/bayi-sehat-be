"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.BBperU = void 0;
const BBperU_Male_1 = __importDefault(require("./BBperU_Male"));
const BBperU_Female_1 = __importDefault(require("./BBperU_Female"));
exports.BBperU = {
    M: BBperU_Male_1.default,
    F: BBperU_Female_1.default,
    categories: [
        [-3, 'Severely Underweight'],
        [-2, 'Underweight'],
        [1, 'Normal']
    ],
    fallbackCategory: 'Overweight'
};
