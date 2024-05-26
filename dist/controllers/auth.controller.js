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
exports.getUsers = exports.refreshSession = exports.createUserSession = exports.userRegistration = void 0;
const auth_validation_1 = require("../validations/auth.validation");
const logger_1 = require("../utils/logger");
const hashing_1 = require("../utils/hashing");
const prisma_1 = __importDefault(require("../lib/prisma"));
const jwt_1 = require("../utils/jwt");
const userRegistration = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { error, value } = (0, auth_validation_1.createUserValidation)(req.body);
    if (error) {
        logger_1.logger.info('ERR: user - registration = ', error.details[0].message);
        return res.status(422).send({
            status: false,
            statusCode: 422,
            message: error.message
        });
    }
    try {
        value.password = `${(0, hashing_1.hashing)(value.password)}`;
        yield prisma_1.default.user.create({
            data: {
                id: value.id,
                name: value.name,
                email: value.email,
                password: value.password
            }
        });
        logger_1.logger.info('User created');
        return res.status(201).json({
            status: true,
            statusCode: 201,
            message: 'User Registration Successfully'
        });
    }
    catch (error) {
        logger_1.logger.info('ERR: auth - registration = ', error);
        return res.status(422).send({
            status: false,
            statusCode: 422,
            message: error.message
        });
    }
});
exports.userRegistration = userRegistration;
const createUserSession = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { error, value } = (0, auth_validation_1.createSessionValidation)(req.body);
    if (error) {
        logger_1.logger.info('ERR: user - login = ', error.details[0].message);
        return res.status(422).send({
            status: false,
            statusCode: 422,
            message: error.message
        });
    }
    try {
        const user = yield prisma_1.default.user.findUnique({
            where: {
                email: value.email
            }
        });
        const isValid = (0, hashing_1.checkPassword)(value.password, user === null || user === void 0 ? void 0 : user.password);
        if (!isValid || !user) {
            return res.status(401).json({
                status: false,
                statusCode: 401,
                message: 'Email atau Kata Sandi Salah!!'
            });
        }
        const accessToken = (0, jwt_1.signJWT)(Object.assign({}, user), { expiresIn: '1d' });
        const refreshToken = (0, jwt_1.signJWT)(Object.assign({}, user), { expiresIn: '1y' });
        logger_1.logger.info('SUCCESS: User Login');
        return res
            .status(200)
            .send({ status: true, statusCode: 200, message: 'Login Berhasil', data: { accessToken, refreshToken } });
    }
    catch (error) {
        logger_1.logger.info('ERR: user - login = ', error.message);
        return res.status(422).send({
            status: false,
            statusCode: 422,
            message: error.message
        });
    }
});
exports.createUserSession = createUserSession;
const refreshSession = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { error, value } = (0, auth_validation_1.refreshSessionValidation)(req.body);
    if (error) {
        logger_1.logger.info('ERR: auth - refresh token = ', error.details[0].message);
        return res.status(422).send({
            status: false,
            statusCode: 422,
            message: error.details[0].message
        });
    }
    try {
        const { decoded } = (0, jwt_1.verifyJWT)(value.refreshToken);
        const user = yield prisma_1.default.user.findUnique({
            where: {
                email: decoded._doc.email
            }
        });
        if (!user)
            return false;
        const accessToken = (0, jwt_1.signJWT)(Object.assign({}, user), {
            expiresIn: '1d'
        });
        return res
            .status(200)
            .send({ status: true, statusCode: 200, message: 'Refresh Session Successfully', data: { accessToken } });
    }
    catch (error) {
        logger_1.logger.info('ERR: refresh - token = ', error.message);
        return res.status(422).send({
            status: false,
            statusCode: 422,
            message: error.message
        });
    }
});
exports.refreshSession = refreshSession;
const getUsers = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const users = yield prisma_1.default.user.findFirst({
            select: {
                name: true,
                email: true
            }
        });
        return res.status(200).json({
            status: true,
            statusCode: 200,
            message: 'Users fetched successfully',
            data: users
        });
    }
    catch (error) {
        logger_1.logger.error('Error fetching users:', error);
        return res.status(500).json({
            status: false,
            statusCode: 500,
            message: 'Internal server error'
        });
    }
});
exports.getUsers = getUsers;
