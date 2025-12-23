import { BaseController } from "./base.controller.js";
import User from "../schemas/users.schema.js";
import { Roles } from "../enums/index.js";
import crypto from "../utils/crypto.js"; 

class CustomerController extends BaseController {
  create = async (req, res) => {
    const { fullName, phoneNumber, email, username, password } = req.body;

    if (!password) {
      return res.status(400).json({ statusCode: 400, message: "Password is required" });
    }

    const hashedPassword = await crypto.decode(password); 

    const data = await User.create({
      fullName,
      phoneNumber,
      email,
      username,
      hashedPassword,
      role: Roles.CUSTOMER
    });

    return res.status(201).json({ statusCode: 201, data });
  };

  signIn = async (_req, _res) => {
    
  };

  confirmOTP = async (_req, _res) => {
    
  };
}

export default new CustomerController(User);




