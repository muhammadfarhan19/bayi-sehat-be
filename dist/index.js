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
// app.get('/auth/', getUsers)
// app.post('/auth/register', userRegistration)
// app.post('/auth/login', createUserSession)
// app.post('/auth/refresh', refreshSession)
// app.get('/baby/', getBaby)
// app.get('/baby/detail/:id', getBabyDetail)
// app.post('/baby/create', createBaby)
// app.delete('/baby/delete/:id', deleteBaby)
// app.put('/baby/put/:id', updateBaby)
// app.get('/baby/male', getMaleBaby)
// app.get('/baby/female', getFemaleBaby)
// app.post('/condition/create/:id', requireBaby, createBabyCondition)
// app.delete('/condition/delete/:id', requireBaby, DeleteBabyCondition)
// app.get('/condition/:id', requireBaby, getBabyConditions)
// app.get('/condition/detail/:id', requireBaby, getDetailBabyCondition)
// app.put('/condition/update/:id', requireBaby, updateBabyCondition)
app.listen(port, () => {
    logger_1.logger.info(`listening on http://localhost:${port}`);
});
exports.default = app;
