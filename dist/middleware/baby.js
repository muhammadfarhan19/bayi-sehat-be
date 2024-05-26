"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.requireBaby = void 0;
const requireBaby = (req, res, next) => {
    const baby = req.params.id || req.body.id;
    if (!baby) {
        return res.sendStatus(403).json({ message: 'Baby not found' });
    }
    return next();
};
exports.requireBaby = requireBaby;
