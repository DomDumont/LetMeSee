import * as express from "express";
import * as path from "path";
import { IndexRoute } from "./routes/index";

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
    //Test
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


  public config() 
  {
    //add static paths
    this.app.use(express.static(path.join(__dirname, "public")));

    //configure pug
    this.app.set("views", path.join(__dirname, "views"));
    this.app.set("view engine", "pug");

  }


  public routes() {
    //empty for now
     let router: express.Router;
    router = express.Router();

    //IndexRoute
    IndexRoute.create(router);

    //use router middleware
    this.app.use(router);
  }
}