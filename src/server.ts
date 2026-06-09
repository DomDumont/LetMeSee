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
import { randomBytes } from "crypto";

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
  private static readonly developmentSessionSecret = randomBytes(32).toString("hex");

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


  private getSessionSecret(): string {
    if (process.env.SESSION_SECRET) {
      return process.env.SESSION_SECRET;
    }

    if (process.env.NODE_ENV === "production") {
      throw new Error("SESSION_SECRET must be defined in production.");
    }

    return Server.developmentSessionSecret;
  }


  public config() 
  {
    const MONGODB_CONNECTION: string = process.env.MONGODB_CONNECTION || "mongodb://localhost:27017/lms";
    const isProduction: boolean = process.env.NODE_ENV === "production";

    if (isProduction) {
      this.app.set("trust proxy", 1);
    }

    //add static paths
    this.app.use(express.static(path.join(__dirname, "public")));

    //configure pug
    this.app.set("views", path.join(__dirname, "views"));
    this.app.set("view engine", "pug");

    //use logger middlware
    this.app.use(logger("dev"));

    //use json form parser middlware
    this.app.use(bodyParser.json({
      limit: "100kb"
    }));

    //use query string parser middlware
    this.app.use(bodyParser.urlencoded({
      extended: true,
      limit: "100kb"
    }));

    //use cookie parker middleware middlware
    this.app.use(cookieParser(this.getSessionSecret()));

    //use override middlware
    this.app.use(methodOverride());

    this.app.use(session({
      cookie: {
        httpOnly: true,
        sameSite: "lax",
        secure: isProduction
      },
      name: "lms.sid",
      resave: false,
      saveUninitialized: false,
      secret: this.getSessionSecret()
    }));

    this.app.use(flash());

    //use native promises
    mongoose.Promise = global.Promise;


    //connect to mongoose
    let connection: mongoose.Connection = mongoose.createConnection(MONGODB_CONNECTION);

    //create models
    this.model.user = connection.model<IUserModel>("User", userSchema);


    //catch 404 and forward to error handler
    this.app.use(function(req: express.Request, res: express.Response, next: express.NextFunction) {
      const err = new Error("Not Found") as Error & { status?: number };
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