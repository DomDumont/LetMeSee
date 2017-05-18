"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const http = require("http");
const server_1 = require("./server");
let myApp = new server_1.Server();
let httpServer = http.createServer(myApp.app);
httpServer.on("listening", onListening);
httpServer.listen(3000, '127.0.0.1');
httpServer.on("error", onError);
function onListening() {
    var addr = httpServer.address();
    var bind = typeof addr === "string"
        ? "pipe " + addr
        : "port " + addr.port;
    console.log("Listening on " + bind);
}
function onError(err) {
    console.error(err.message);
    console.error(err.stack);
}
//# sourceMappingURL=app.js.map