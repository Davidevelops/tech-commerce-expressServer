"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const db_1 = require("./config/db");
const app_1 = __importDefault(require("./app"));
(0, db_1.connectToDB)().then(() => {
    app_1.default.listen(process.env.PORT || 5000, () => console.log("server running on port: ", process.env.PORT));
});
