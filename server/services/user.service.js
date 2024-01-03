// import { Jwt } from "jsonwebtoken";
const jwt =  require ("jsonwebtoken");
// import bcrypt from "bcrypt";
const bcrypt =  require ("bcrypt");
const hashpwd = password=> bcrypt.hashSync(password,bcrypt.genSaltSync(12))

require('dotenv').config()
// console.log(process.env.SECRET_KEY)
class UserService {
  constructor(client) {
    this.User = client.db().collection("users");
  }

  extractUserData(payload) {
    const user = {
      name: payload.name,
      email: payload.email,
      password: payload.password,
      address : payload.address,
      phone : payload.phone,
      token:payload.token,
      isAdmin: payload.isAdmin,
    };
    Object.keys(user).forEach(
      (key) => user[key] === undefined && delete user[key]
    );
    return user;
  }

  async check(filter) {
    // console.log( filter.email);
    const cursor = await this.User.find(filter);
    return await cursor.toArray();
  }

  async register(payload) {
    const JWTtoken = jwt.sign({phone: payload.phone,password: payload.password},process.env.SECRET_KEY,{expiresIn:'1d'})
    console.log(JWTtoken)
    const input = {
      "name" : payload.name,
      "phone" : payload.phone,
      "address" : payload.address,
      "email" : payload.email,
      "password"  :hashpwd(payload.password),
      "token" : JWTtoken,
    }
    const user = await this.extractUserData(input);
    const result = await this.User.findOneAndUpdate(
      user,
      { $set: { isAdmin: true, } },
      { returnDocument: "after", upsert: true }
    );
    
    return result;
    }


    

}

module.exports = UserService;
