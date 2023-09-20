"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const database_1 = require("./database");
const setTimeout = () => {
    console.table(database_1.users);
    console.table(database_1.products);
};
setTimeout();
console.log((0, database_1.createUser)("u003", "Astrodev", "astrodev@email.com", "astrodev99"));
console.log((0, database_1.getAllUsers)());
//# sourceMappingURL=index.js.map