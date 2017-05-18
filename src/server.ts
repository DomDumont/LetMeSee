import * as express from "express";

export class Server {
  public app: express.Application;

  constructor() {
    //create expressjs application
    this.app = express();

    //configure application
    this.config();

    //add routes
    this.routes();

    //add api
    this.api();
  }

  /**
   * 
   * 
   * 
   * @memberof Server
   */
  public api() {
    //empty for now
  }


  public config() {
    //empty for now
  }


  public routes() {
    //empty for now
  }
}