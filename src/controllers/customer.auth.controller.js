import User from "../schemas/users.schema.js";
import { catchAsync } from "../middlewares/catch-async.js";
import { ApiError } from "../utils/api.error.js";
import crypto from "../utils/crypto.js";
import token from "../utils/token.js";
import { successRes } from "../utils/success-res.js";

class CustomerAuthController {
  // SignUp
  signup = catchAsync(async (req, res) => {
    const { email, password, username, phoneNumber } = req.body;
    
    const existsEmail = await User.findOne({ email });
    if(existsEmail) throw new ApiError('Email already exists', 409);
    
    const existsPhone = await User.findOne({ phoneNumber });
    if(existsPhone) throw new ApiError('Phone number already exists', 409);

    const hashedPassword = await crypto.decode(password);

    const user = await User.create({
      email,
      username,
      phoneNumber,
      hashedPassword,
      role: 'CUSTOMER'
    });

    return successRes(res, user, 201);
  });
//   Sign in
  signin = catchAsync(async (req, res) => {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if(!user) throw new ApiError('Invalid email or password', 400);

    const isMatch = await crypto.encode(password, user.hashedPassword);
    if(!isMatch) throw new ApiError('Invalid email or password', 400);

    const payload = { id: user._id, role: user.role, isActive: user.isActive };
    const accessToken = token.getAccess(payload);
    const refreshToken = token.getRefresh(payload, res);

    return successRes(res, { accessToken, refreshToken, user });
  });
}

export default new CustomerAuthController();
