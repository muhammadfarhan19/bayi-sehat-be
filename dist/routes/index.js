"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const baby_controller_1 = require("../controllers/baby.controller");
// import { HealthRouter } from './health'
// import { AuthRouter } from './auth.route'
// import { BabyRouter } from './baby.route'
// import { BabyConditionRouter } from './condition.route'
// const _routes: Array<[string, Router]> = [
//   ['/', HealthRouter],
//   ['/auth', AuthRouter],
//   ['/baby', BabyRouter],
//   ['/condition', BabyConditionRouter]
// ]
// export const routes = (app: Application) => {
//   _routes.forEach((route) => {
//     const [url, router] = route
//     app.use(url, router)
//   })
// }
const router = (0, express_1.Router)();
router.get('/baby/', baby_controller_1.getBaby);
exports.default = router;
