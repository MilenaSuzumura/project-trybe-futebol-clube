"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.app = exports.App = void 0;
const express = require("express");
const loginRouter_1 = require("./database/routes/loginRouter");
const matchesRouter_1 = require("./database/routes/matchesRouter");
const teamsRouter_1 = require("./database/routes/teamsRouter");
const leaderboardRoute_1 = require("./database/routes/leaderboardRoute");
class App {
    constructor() {
        this.app = express();
        this.config();
        // Não remover essa rota
        this.app.get('/', (req, res) => res.json({ ok: true }));
        this.app.use('/login', loginRouter_1.default);
        this.app.use('/teams', teamsRouter_1.default);
        this.app.use('/matches', matchesRouter_1.default);
        this.app.use('/leaderboard', leaderboardRoute_1.default);
    }
    config() {
        const accessControl = (_req, res, next) => {
            res.header('Access-Control-Allow-Origin', '*');
            res.header('Access-Control-Allow-Methods', 'GET,POST,DELETE,OPTIONS,PUT,PATCH');
            res.header('Access-Control-Allow-Headers', '*');
            next();
        };
        this.app.use(express.json());
        this.app.use(accessControl);
    }
    start(PORT) {
        this.app.listen(PORT, () => console.log(`Running on port ${PORT}`));
    }
}
exports.App = App;
// Essa segunda exportação é estratégica, e a execução dos testes de cobertura depende dela
exports.app = new App().app;
//# sourceMappingURL=app.js.map