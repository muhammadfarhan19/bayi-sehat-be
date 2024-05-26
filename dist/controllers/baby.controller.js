"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getFemaleBaby = exports.getMaleBaby = exports.getBabyDetail = exports.deleteBaby = exports.updateBaby = exports.getBaby = exports.createBaby = void 0;
const baby_validation_1 = require("../validations/baby.validation");
const logger_1 = require("../utils/logger");
const prisma_1 = __importDefault(require("../lib/prisma"));
const commonFunctions_1 = require("../utils/commonFunctions");
const function_1 = require("..//modules/function");
const createBaby = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { error, value } = (0, baby_validation_1.createBabyValidation)(req.body);
    if (error) {
        logger_1.logger.error('Err = baby-create', error.details[0].message);
        return res.status(422).send({ status: false, statusCode: 422, message: error.details[0].message });
    }
    try {
        const baby = yield prisma_1.default.baby.create({
            data: {
                name: value.name,
                gender: value.gender === 'Laki-Laki' ? 'male' : 'female',
                birthdate: value.birthdate,
                parent_name: value.parent_name,
                address: value.address,
                phone_number: value.phone_number
            }
        });
        logger_1.logger.info('Success add new data');
        return res.status(200).send({ status: true, statusCode: 200, message: 'Berhasil Menambahkan Data', data: baby });
    }
    catch (error) {
        logger_1.logger.error('Err = baby-create', error);
        return res.status(422).send({ status: false, statusCode: 422, message: error });
    }
});
exports.createBaby = createBaby;
const getBaby = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const responses = yield prisma_1.default.baby.findMany({
            select: {
                id: true,
                name: true,
                gender: true,
                parent_name: true,
                phone_number: true,
                address: true,
                birthdate: true,
                baby_condition: true
            },
            orderBy: { name: 'asc' }
        });
        const result = responses.map((response) => {
            const lastCondition = response.baby_condition[response.baby_condition.length - 1];
            const age = (0, commonFunctions_1.calculateAgeInMonths)(response.birthdate);
            const gender = response.gender === 'male' ? 'Laki-Laki' : 'Perempuan';
            let status = null;
            if (lastCondition) {
                status = (0, function_1.Analyzer)({
                    weight: lastCondition.weight,
                    age,
                    gender: response.gender === 'male' ? 'M' : 'F'
                });
            }
            return Object.assign(Object.assign({}, response), { age,
                gender, weight: lastCondition ? lastCondition.weight : null, status: status ? status.BBperU : null });
        });
        logger_1.logger.info('Success get baby data');
        return res.status(200).send({ status: true, statusCode: 200, data: result });
    }
    catch (error) {
        logger_1.logger.error('Err = baby-get', error);
        return res.status(422).send({ status: false, statusCode: 422, message: error });
    }
});
exports.getBaby = getBaby;
const updateBaby = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { params: { id } } = req;
    const { error, value } = (0, baby_validation_1.createBabyValidation)(req.body);
    if (error) {
        logger_1.logger.error('Err = baby-update', error.details[0].message);
        return res.status(422).send({ status: false, statusCode: 422, message: error.details[0].message });
    }
    try {
        const baby = yield prisma_1.default.baby.update({
            where: {
                id
            },
            data: {
                name: value.name,
                gender: value.gender,
                birthdate: value.birthdate,
                parent_name: value.parent_name,
                address: value.address,
                phone_number: value.phone_number
            }
        });
        if (baby) {
            logger_1.logger.info('Success update new baby');
            return res.status(200).send({ status: true, statusCode: 200, message: 'Berhasil Memperbarui Data' });
        }
        else {
            logger_1.logger.info('Baby not fount');
            return res.status(404).send({ status: true, statusCode: 404, message: 'Baby not found' });
        }
    }
    catch (error) {
        logger_1.logger.error('Err = baby-update', error);
        return res.status(422).send({ status: false, statusCode: 422, message: error });
    }
});
exports.updateBaby = updateBaby;
const deleteBaby = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { params: { id } } = req;
    try {
        const response = yield prisma_1.default.baby.delete({
            where: {
                id
            }
        });
        yield prisma_1.default.baby_condition.deleteMany({
            where: {
                baby_id: id
            }
        });
        if (response) {
            logger_1.logger.info('Success delete baby');
            return res.status(200).send({ status: true, statusCode: 200, message: 'Berhasil Menghapus Data' });
        }
        else {
            logger_1.logger.info('Baby not found');
            return res.status(404).send({ status: true, statusCode: 404, message: 'Baby not found' });
        }
    }
    catch (error) {
        logger_1.logger.error('ERR: delete baby = ', error);
        return res.status(422).send({ status: false, statusCode: 422, message: error });
    }
});
exports.deleteBaby = deleteBaby;
const getBabyDetail = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { params: { id } } = req;
    try {
        const response = yield prisma_1.default.baby.findUnique({
            where: { id },
            select: {
                name: true,
                gender: true,
                parent_name: true,
                phone_number: true,
                address: true,
                birthdate: true,
                baby_condition: true
            }
        });
        if (!response) {
            return res.status(404).send({ status: false, statusCode: 404, message: 'Baby not found' });
        }
        const lastCondition = response.baby_condition[response.baby_condition.length - 1];
        const age = (0, commonFunctions_1.calculateAgeInMonths)(response.birthdate);
        const gender = response.gender === 'male' ? 'Laki-Laki' : 'Perempuan';
        let status = null;
        if (lastCondition) {
            status = (0, function_1.Analyzer)({
                weight: lastCondition.weight,
                age,
                gender: response.gender === 'male' ? 'M' : 'F'
            });
        }
        const result = Object.assign(Object.assign({}, response), { age, birthdate: (0, commonFunctions_1.dateFormatter)(response.birthdate), status: status ? status.BBperU : null });
        logger_1.logger.info('Success get detail baby');
        return res.status(200).send({ status: true, statusCode: 200, data: result });
    }
    catch (error) {
        logger_1.logger.error('ERR: detail-baby = ', error);
        return res.status(422).send({ status: false, statusCode: 422, message: error });
    }
});
exports.getBabyDetail = getBabyDetail;
const getMaleBaby = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const response = yield prisma_1.default.baby.findMany({
            where: {
                gender: 'male'
            }
        });
        logger_1.logger.info('Success get male babies');
        return res.status(200).send({ status: true, statusCode: 200, data: response });
    }
    catch (error) {
        logger_1.logger.error('Err = male baby-get', error);
        return res.status(422).send({ status: false, statusCode: 422, message: error });
    }
});
exports.getMaleBaby = getMaleBaby;
const getFemaleBaby = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const response = yield prisma_1.default.baby.findMany({
            where: {
                gender: 'female'
            }
        });
        logger_1.logger.info('Success get female babies');
        return res.status(200).send({ status: true, statusCode: 200, data: response });
    }
    catch (error) {
        logger_1.logger.error('Err = female baby-get', error);
        return res.status(422).send({ status: false, statusCode: 422, message: error });
    }
});
exports.getFemaleBaby = getFemaleBaby;
