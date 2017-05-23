import { NextFunction, Request, Response, Router } from "express";
import { BaseRoute } from "./route";


/**
 * / route
 *
 * @class User
 */
export class UsersRoute extends BaseRoute {

  /**
   * Create the routes.
   *
   * @class IndexRoute
   * @method create
   * @static
   */
  public static create(router: Router) {
    //log
    console.log("[IndexRoute::create] Creating user route.");

    //add home page route
    router.get("/users", (req: Request, res: Response, next: NextFunction) => {
      new UsersRoute().index(req, res, next);
    });
  }

  /**
   * Constructor
   *
   * @class IndexRoute
   * @constructor
   */
  constructor() {
    super();
  }

  /**
   * The home page route.
   *
   * @class IndexRoute
   * @method index
   * @param req {Request} The express Request object.
   * @param res {Response} The express Response object.
   * @next {NextFunction} Execute the next method.
   */
  public index(req: Request, res: Response, next: NextFunction) {
    //set custom title
    this.title = "Users | LetMeSee";

    //set options
    let options: Object = {
      "message": "Welcome to Users"
    };

    //render template
    this.render(req, res, "index", options);
  }
}