"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const logger_1 = require("./utils/logger");
const body_parser_1 = __importDefault(require("body-parser"));
const cors_1 = __importDefault(require("cors"));
const deserializedToken_1 = __importDefault(require("./middleware/deserializedToken"));
const auth_controller_1 = require("./controllers/auth.controller");
const baby_controller_1 = require("./controllers/baby.controller");
const baby_1 = require("./middleware/baby");
const condition_controller_1 = require("./controllers/condition.controller");
const app = (0, express_1.default)();
const port = 4000;
const allowedOrigins = ['http://localhost:3000', 'https://bayi-sehat.vercel.app'];
app.use((0, cors_1.default)({
    origin: (origin, callback) => {
        if (!origin || allowedOrigins.includes(origin)) {
            callback(null, true);
        }
        else {
            callback(new Error('Not allowed by CORS'));
        }
    },
    methods: '*',
    allowedHeaders: ['Content-Type', 'Authorization', 'X-Requested-With', 'Accept'],
    credentials: true
}));
app.use(body_parser_1.default.urlencoded({ extended: false }));
app.use(body_parser_1.default.json());
app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Methods', '*');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization, X-Requested-With, Accept');
    res.setHeader('Access-Control-Allow-Credentials', 'true');
    next();
});
app.use(deserializedToken_1.default);
app.get('/', (req, res) => {
    res.send('Bayi Sehat API is Ready to Use');
});
app.get('/auth/', auth_controller_1.getUsers);
app.post('/auth/register', auth_controller_1.userRegistration);
app.post('/auth/login', auth_controller_1.createUserSession);
app.post('/auth/refresh', auth_controller_1.refreshSession);
app.get('/baby/', baby_controller_1.getBaby);
app.get('/baby/detail/:id', baby_controller_1.getBabyDetail);
app.post('/baby/create', baby_controller_1.createBaby);
app.delete('/baby/delete/:id', baby_controller_1.deleteBaby);
app.put('/baby/put/:id', baby_controller_1.updateBaby);
app.get('/baby/male', baby_controller_1.getMaleBaby);
app.get('/baby/female', baby_controller_1.getFemaleBaby);
app.post('/condition/create/:id', baby_1.requireBaby, condition_controller_1.createBabyCondition);
app.delete('/condition/delete/:id', baby_1.requireBaby, condition_controller_1.DeleteBabyCondition);
app.get('/condition/:id', baby_1.requireBaby, condition_controller_1.getBabyConditions);
app.get('/condition/detail/:id', baby_1.requireBaby, condition_controller_1.getDetailBabyCondition);
app.put('/condition/update/:id', baby_1.requireBaby, condition_controller_1.updateBabyCondition);
app.listen(port, () => {
    logger_1.logger.info(`listening on http://localhost:${port}`);
});
exports.default = app;
