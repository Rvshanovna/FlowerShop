import { BaseController } from "./base.controller.js";
import Admin from "../schemas/users.schema.js";
import { catchAsync } from "../middlewares/catch-async.js";
import crypto from "../utils/crypto.js";
import { successRes } from "../utils/success-res.js";
import { Roles } from "../enums/index.js";
import { ApiError } from "../utils/api.error.js";

class AdminController extends BaseController {
  create = catchAsync(async (req, res) => {
    const { phoneNumber, email, username, password } = req.body;
    await this._isExists({ phoneNumber }, "Phone number");
    if (email) {
      await this._isExists({ email }, "Email adress");
    }
    if (username) {
      await this._isExists({ username }, "Username");
    }
    const hashedPassword = await crypto.decode(password);
    delete req.body.password;
    const newAdmin = await Admin.create({
      ...req.body,
      hashedPassword,
      role: Roles.ADMIN,
    });
    return successRes(res, newAdmin, 201);
  });

  update = catchAsync(async (req, res) => {
    const id = req.params?.id;
    const admin = await this._getById(id);
    const { phoneNumber, email, username, password } = req.body;
    if (phoneNumber) {
      const existsPhone = await Admin.findOne({ phoneNumber });
      if (existsPhone && existsPhone._id.toString() !== id) {
        throw new ApiError("Phone number already exists", 409);
      }
    }
    if (email) {
      const existsEmail = await Admin.findOne({ email });
      if (existsEmail && existsEmail._id.toString() !== id) {
        throw new ApiError("Email address already exists", 409);
      }
    }
    if (username) {
      const existsUsername = await Admin.findOne({ username });
      if (existsUsername && existsUsername._id.toString() !== id) {
        throw new ApiError("Username already exists", 409);
      }
    }

    let hashedPassword = admin.hashedPassword;
    if (password && req.user.role === Roles.SUPERADMIN) {
      hashedPassword = await crypto.decode(password);
      delete req.body?.password;
    }
    const updatedAdmin = await Admin.findByIdAndUpdate(
      id,
      {
        hashedPassword,
        ...req.body,
      },{ new: true }
    );
    return successRes(res, updatedAdmin, 200);
  });

  updatePassword = catchAsync(async (req, res) => {
    const id = req.params.id;
    const admin = await this._getById(id);
    const { oldPassword, newPassword } = req.body;

    if (!newPassword) {
        throw new ApiError('New password is required', 400);
    }
    if (!oldPassword && req.user.role === Roles.ADMIN) {
        throw new ApiError('Old password is required', 400);
    }

    if (oldPassword) {
        const isMatchPass = await crypto.encode(oldPassword, admin.hashedPassword);
        if (!isMatchPass) {
            throw new ApiError('Old password does not match', 400);
        }
    }

    const hashedPassword = await crypto.decode(newPassword);

    const updatedAdmin = await Admin.findByIdAndUpdate(
        id,
        { hashedPassword },
        { new: true }
    );

    return successRes(res, updatedAdmin);
});



  remove = catchAsync(async(req, res) => {
    const id = req.params.id;
    const admin = await this._getById(id);
    if(admin && admin.role === Roles.SUPERADMIN){
      throw new ApiError('Super admin is not deletable', 400);
    }
    await Admin.findByIdAndDelete(id);
    return successRes(res, {});
  })

}

export default new AdminController(Admin);
