"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const dotenv_1 = __importDefault(require("dotenv"));
const cors_1 = __importDefault(require("cors"));
const body_parser_1 = __importDefault(require("body-parser"));
const cookie_parser_1 = __importDefault(require("cookie-parser"));
const db_connect_1 = __importDefault(require("./config/db.connect"));
const auth_1 = __importDefault(require("./routers/auth"));
const user_1 = __importDefault(require("./routers/user"));
const errorHandle_1 = require("./middlewares/errorHandle");
dotenv_1.default.config();
const app = (0, express_1.default)();
app.use(body_parser_1.default.urlencoded({ extended: false }));
app.use(body_parser_1.default.json());
app.use((0, cors_1.default)());
app.use((0, cookie_parser_1.default)());
const port = process.env.PORT || 5000;
app.use("/api/auth", auth_1.default);
app.use("/api/users", user_1.default);
app.use(errorHandle_1.handleError);
app.listen(port, () => {
    console.log(`Sever running at PORT ${port}`);
    (0, db_connect_1.default)();
});
//# sourceMappingURL=index.js.map