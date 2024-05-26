"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.routes = void 0;
const health_1 = require("./health");
const auth_route_1 = require("./auth.route");
const baby_route_1 = require("./baby.route");
const condition_route_1 = require("./condition.route");
const _routes = [
    ['/', health_1.HealthRouter],
    ['/auth', auth_route_1.AuthRouter],
    ['/baby', baby_route_1.BabyRouter],
    ['/condition', condition_route_1.BabyConditionRouter]
];
const routes = (app) => {
    _routes.forEach((route) => {
        const [url, router] = route;
        app.use(url, router);
    });
};
exports.routes = routes;
