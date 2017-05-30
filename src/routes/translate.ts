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

    router.post("/translate", (req: Request, res: Response, next: NextFunction) => {
      new TranslateRoute().HandlePost(req, res, next);
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
  public index(req: Request, res: Response, next: NextFunction) 
  {
    //set custom title
    this.title = "Translate | LetMeSee";

    //set options
    let options: Object = {
      "message": "Welcome to translate",
       "response":"your translation will be here"
    };

    //render template
    this.render(req, res, "translate", options);
  }

  public HandlePost(req: Request, res: Response, next: NextFunction) 
  {
    //set custom title
    this.title = "Translate | LetMeSee";

    //set options
    let options: Object = {
      "message": "Translate Post",
      "response":"oh yeah"
    };

    //render template
    this.render(req, res, "translate", options);
  }
  
}