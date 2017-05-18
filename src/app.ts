// src/app.ts

import http = require("http");
import { Server } from "./server";

let myApp = new Server();

let httpServer = http.createServer(myApp.app);

httpServer.on("listening", onListening);

httpServer.listen(3000, '127.0.0.1');
httpServer.on("error",onError);



/**
 * Called when the server starts listening
 * 
 */
function onListening() {
  var addr = httpServer.address();
  var bind = typeof addr === "string"
    ? "pipe " + addr
    : "port " + addr.port;
  console.log("Listening on " + bind);
}


/**
 * Called when there is an error
 * 
 * @param {Error} err 
 */
function onError(err: Error)
{
  console.error(err.message);
  console.error(err.stack);
}
