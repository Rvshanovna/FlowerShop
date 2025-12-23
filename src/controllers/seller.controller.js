import { BaseController } from "./base.controller.js";
import User from "../schemas/users.schema.js";
import crypto from "../utils/crypto.js";
import { catchAsync } from "../middlewares/catch-async.js";
import { successRes } from "../utils/success-res.js";
import { Roles } from "../enums/index.js";
import { ApiError } from "../utils/api.error.js";

class SellerController extends BaseController {
  create = catchAsync(async (req, res) => {
    const { phoneNumber, email, username, password } = req.body;
    
    await this._isExists({ phoneNumber }, "Phone number");
    if(email) await this._isExists({ email }, "Email address");
    if(username) await this._isExists({ username }, "Username");

    const hashedPassword = await crypto.decode(password);
    delete req.body.password;

    const seller = await User.create({
      ...req.body,
      hashedPassword,
      role: Roles.SELLER
    });

    return successRes(res, seller, 201);
  });
}

export default new SellerController(User);
