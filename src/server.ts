import * as express from "express";
import * as path from "path";


import * as bodyParser from "body-parser";
import * as cookieParser from "cookie-parser";
import * as logger from "morgan";
import errorHandler = require("errorhandler");
import methodOverride = require("method-override");
import mongoose = require("mongoose"); //import mongoose
import * as flash from "express-flash";
import * as session from "express-session";

//routes

import { IndexRoute } from "./routes/index";
import { UsersRoute } from "./routes/users";
import { TranslateRoute } from "./routes/translate";

//interfaces
import { IUser } from "./interfaces/user"; //import IUser

//models
import { IModel } from "./models/model"; //import IModel
import { IUserModel } from "./models/user"; //import IUserModel

//schemas
import { userSchema } from "./schemas/user"; //import userSchema


export class Server {
  public app: express.Application;
  private model: IModel; //an instance of IModel

  constructor() {

    this.model = Object(); //initialize this to an empty object

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
  public api() 
  {
    //empty for now
     console.log("api 23");
  }


  public config() 
  {
    const MONGODB_CONNECTION: string = "mongodb://localhost:27017/lms";

    //add static paths
    this.app.use(express.static(path.join(__dirname, "public")));

    //configure pug
    this.app.set("views", path.join(__dirname, "views"));
    this.app.set("view engine", "pug");

    //use logger middlware
    this.app.use(logger("dev"));

    //use json form parser middlware
    this.app.use(bodyParser.json());

    //use query string parser middlware
    this.app.use(bodyParser.urlencoded({
      extended: true
    }));

    //use cookie parker middleware middlware
    this.app.use(cookieParser("SECRET_GOES_HERE"));

    //use override middlware
    this.app.use(methodOverride());

this.app.use(session({
  resave: true,
  saveUninitialized: true,
  secret: process.env.SESSION_SECRET,
}));

    this.app.use(flash());

   //use q promises
    global.Promise = require("q").Promise;
    mongoose.Promise = global.Promise;


    //connect to mongoose
    let connection: mongoose.Connection = mongoose.createConnection(MONGODB_CONNECTION);

    //create models
    this.model.user = connection.model<IUserModel>("User", userSchema);


    //catch 404 and forward to error handler
    this.app.use(function(err: any, req: express.Request, res: express.Response, next: express.NextFunction) {
        err.status = 404;
        next(err);
    });

    //error handling
    this.app.use(errorHandler());

  }


  public routes() 
  {
    //empty for now
    let router: express.Router;
    router = express.Router();

    //IndexRoute
    IndexRoute.create(router);

    //UsersRoute
    UsersRoute.create(router);

    TranslateRoute.create(router);
    

    //use router middleware
    this.app.use(router);
  }
}