"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const app = (0, express_1.default)();
const port = process.env.PORT || 8080;
app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});
app.use(express_1.default.static("build"));
const items = [
    {
        name: "Laptop",
        price: 1000
    },
    {
        name: "Desktop",
        price: 2100
    },
];
app.get('/api/items', (req, res) => {
    res.send(items);
});
