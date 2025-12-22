import { BaseController } from "./base.controller.js";
import Delivery from "../schemas/delivery.schema.js";
import { catchAsync } from "../middlewares/catch-async.js";
import { successRes } from "../utils/success-res.js";

class DeliveryController extends BaseController {
  create = catchAsync(async (req, res) => {
    const data = await Delivery.create(req.body);
    return successRes(res, data, 201);
  });

  update = catchAsync(async (req, res) => {
    const { id } = req.params;
    await this._getById(id);

    const updatedData = await Delivery.findByIdAndUpdate(id, req.body, {
      new: true,
      runValidators: true
    });

    return successRes(res, updatedData, 200);
  });

  remove = catchAsync(async (req, res) => {
    const { id } = req.params;
    await this._getById(id);

    await Delivery.findByIdAndDelete(id);
    return successRes(res, null, 204);
  });
}

export default new DeliveryController(Delivery);
