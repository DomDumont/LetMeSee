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
      "response": this.TranslateThis(req.body.input1)
    };

    //render template
    this.render(req, res, "translate", options);
  }
  
  // https://stackoverflow.com/questions/64904/parsings-strings-extracting-words-and-phrases-javascript
  public TranslateThis(thisText)
  {
    let lines = thisText.split(/[\r\n]+/g);
    let result = ""
    for(let i= 0; i < lines.length; i++)
    {
      result += this.TranslateThisLine(lines[i])
      result += "\n"
    }
    return result
  }

  public TranslateThisLine(thisLine)
  {
    let words = thisLine.match(/("[^"]+"|[^"\s]+)/g);
    let result = ""
    for(let i= 0; i < words.length; i++)
    {
      result += this.Reverse(words[i])
      result += " "
    }
    return result
  }

  public Reverse(s)
  {
    return s.split("").reverse().join("");
  }
}