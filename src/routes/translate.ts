import { NextFunction, Request, Response, Router } from "express";
import { BaseRoute } from "./route";


/**
 * / route
 *
 * @class Translate
 */
export class TranslateRoute extends BaseRoute {

  /**
   * Create the routes.
   *
   * @class TranslateRoute
   * @method create
   * @static
   */
  public static create(router: Router) {
    //log
    console.log("[TranslateRoute::create] Creating translate route.");

    //add home page route
    router.get("/translate", (req: Request, res: Response, next: NextFunction) => {
      new TranslateRoute().index(req, res, next);
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
    this.title = "Translate | LetMeSee";

    //set options
    let options: Object = {
      "message": "Welcome to translate"
    };

    //render template
    this.render(req, res, "translate", options);
  }
}