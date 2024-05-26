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
exports.updateBabyCondition = exports.DeleteBabyCondition = exports.getDetailBabyCondition = exports.getBabyConditions = exports.createBabyCondition = void 0;
const prisma_1 = __importDefault(require("../lib/prisma"));
const logger_1 = require("../utils/logger");
const condition_validation_1 = require("../validations/condition.validation");
const createBabyCondition = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { error, value } = (0, condition_validation_1.createBabyConditionValidation)(req.body);
    const { params: { id } } = req;
    if (error) {
        logger_1.logger.error('Err = baby condition-create', error.details[0].message);
        return res.status(422).send({ status: false, statusCode: 422, message: error.details[0].message });
    }
    try {
        const checkBaby = yield prisma_1.default.baby.findUnique({
            where: {
                id
            }
        });
        if (!checkBaby) {
            return res.status(404).send({ status: false, statusCode: 404, message: 'Baby not found' });
        }
        const response = yield prisma_1.default.baby_condition.create({
            data: {
                month: value.month,
                weight: value.weight,
                height: value.height,
                baby: {
                    connect: {
                        id
                    }
                }
            }
        });
        logger_1.logger.info('Add baby condition successfully');
        return res.status(201).send({ status: true, statusCode: 201, message: 'Berhasil Menambahkan Data', data: response });
    }
    catch (error) {
        logger_1.logger.error('ERR: create - condition = ', error);
        return res.status(422).send({ status: false, statusCode: 422, message: error });
    }
});
exports.createBabyCondition = createBabyCondition;
const getBabyConditions = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { params: { id } } = req;
    try {
        const responses = yield prisma_1.default.baby_condition.findMany({
            where: {
                baby_id: id
            }
        });
        logger_1.logger.info('Get baby conditions successfully');
        return res.status(200).send({ status: true, statusCode: 200, data: responses });
    }
    catch (error) {
        logger_1.logger.error('Err = baby-read', error);
        return res.status(422).send({ status: false, statuseCode: 422, message: error });
    }
});
exports.getBabyConditions = getBabyConditions;
const getDetailBabyCondition = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    try {
        const response = yield prisma_1.default.baby_condition.findFirst({
            where: {
                id
            }
        });
        if (response) {
            logger_1.logger.info('Get detail baby condition successfully');
            return res.status(200).send({ status: true, statusCode: 200, data: response });
        }
        else {
            logger_1.logger.warn('No baby condition found for the given ID and condition ID');
            return res.status(404).send({ status: false, statusCode: 404, message: 'Baby condition not found' });
        }
    }
    catch (error) {
        logger_1.logger.error('Err = baby condition-read', error);
        return res.status(422).send({ status: false, statusCode: 422, message: error });
    }
});
exports.getDetailBabyCondition = getDetailBabyCondition;
const DeleteBabyCondition = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { params: { id } } = req;
    try {
        const response = yield prisma_1.default.baby_condition.delete({
            where: {
                id
            }
        });
        if (response) {
            logger_1.logger.info('Delete Baby Condition Successfully');
            res.status(200).send({ status: true, statusCode: 200, message: 'Berhasil Menghapus Data' });
        }
        else {
            logger_1.logger.info('Baby Condition not Found');
            return res.status(404).send({ status: true, statusCode: 404, message: 'Gagal Menghapus Data' });
        }
    }
    catch (error) {
        logger_1.logger.error('Err = baby-read', error);
        return res.status(422).send({ status: false, statuseCode: 422, message: error });
    }
});
exports.DeleteBabyCondition = DeleteBabyCondition;
const updateBabyCondition = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { params: { id } } = req;
    const { error, value } = (0, condition_validation_1.createBabyConditionValidation)(req.body);
    if (error) {
        logger_1.logger.error('Err = baby condition-create', error.details[0].message);
        return res.status(422).send({ status: false, statusCode: 422, message: error.details[0].message });
    }
    try {
        yield prisma_1.default.baby_condition.update({
            where: {
                id
            },
            data: {
                month: value.month,
                weight: value.weight,
                height: value.height
            }
        });
        logger_1.logger.info('Update baby condition successfully');
        return res.status(201).send({ status: true, statusCode: 201, message: 'Berhasil Memperbarui Kondisi' });
    }
    catch (error) {
        logger_1.logger.error('ERR: update - condition = ', error);
        return res.status(422).send({ status: false, statusCode: 422, message: error });
    }
});
exports.updateBabyCondition = updateBabyCondition;
