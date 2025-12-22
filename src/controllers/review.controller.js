import { BaseController } from "./base.controller.js";
import Review from "../schemas/review.schema.js";
import { catchAsync } from "../middlewares/catch-async.js";
import { successRes } from "../utils/success-res.js";

class ReviewController extends BaseController {
  create = catchAsync(async (req, res) => {
    const data = await Review.create(req.body);
    return successRes(res, data, 201);
  });

  update = catchAsync(async (req, res) => {
    const { id } = req.params;
    await this._getById(id);

    const updatedData = await Review.findByIdAndUpdate(id, req.body, {
      new: true,
      runValidators: true
    });

    return successRes(res, updatedData, 200);
  });

  remove = catchAsync(async (req, res) => {
    const { id } = req.params;
    await this._getById(id);

    await Review.findByIdAndDelete(id);
    return successRes(res, null, 204);
  });
}

export default new ReviewController(Review);
