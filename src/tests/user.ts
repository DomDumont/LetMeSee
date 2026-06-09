import "mocha";
import { should } from 'chai';


import { IUser } from "../interfaces/user";
import { IUserModel } from "../models/user";
import { userSchema } from "../schemas/user";



//import mongoose
import mongoose = require("mongoose");

//use native promises for mongoose
mongoose.Promise = global.Promise;

//connect to mongoose and create model
const MONGODB_CONNECTION: string = process.env.MONGODB_CONNECTION || "mongodb://localhost:27017/lms";
let connection: mongoose.Connection = mongoose.createConnection(MONGODB_CONNECTION);
var User: mongoose.Model<IUserModel> = connection.model<IUserModel>("User", userSchema);

//require chai and use should() assertions
should()

describe("User", function() 
  {
  describe("create()", function () 
    {
    it("should create a new User", function () 
      {
      //user object
      let user: IUser = {
        email: "foo@bar.com",
        firstName: "Brian",
        lastName: "Love"
      };

      //create user and return promise
      return new User(user).save().then(result => {
        //verify _id property exists
        should().exist(result._id);

        //verify email
        if (result.email)
        result.email.should.equal(user.email);

        //verify firstName
        if (result.firstName)
          result.firstName.should.equal(user.firstName);

        //verify lastName
        if (result.lastName)
          result.lastName.should.equal(user.lastName);
      })
    });
  });
});