"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const client_1 = require("@prisma/client");
let prisma;
if (process.env.NODE_ENV === 'production') {
    prisma = new client_1.PrismaClient();
}
else {
    if (!globalThis.prisma) {
        globalThis.prisma = new client_1.PrismaClient();
    }
    prisma = globalThis.prisma;
}
exports.default = prisma;
