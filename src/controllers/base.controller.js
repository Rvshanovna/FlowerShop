import { isValidObjectId } from "mongoose";

import { catchAsync } from "../middlewares/catch-async.js";
import { ApiError } from "../utils/api.error.js";
import { successRes } from "../utils/success-Res.js";

export class BaseController {
  constructor(model, relation = null) {
    this.model = model;
    this.relation = relation;
  }

  // CREATE
  create = catchAsync(async (req, res) => {
    const data = await this.model.create(req.body);
    return successRes(res, data, 201);
  });

  // FIND ALL
  findAll = catchAsync(async (_req, res) => {
    const query = this.model.find();

    if (this.relation) {
      query.populate(this.relation);
    }

    const data = await query;
    return successRes(res, data);
  });

  // FIND ONE
  findOne = catchAsync(async (req, res) => {
    const data = await this._getById(req.params.id);
    return successRes(res, data);
  });

  // UPDATE
  update = catchAsync(async (req, res) => {
    const { id } = req.params;
    await this._getById(id);

    const updatedData = await this.model.findByIdAndUpdate(
      id,
      req.body,
      {
        new: true,
        runValidators: true
      }
    );

    return successRes(res, updatedData);
  });

// DELETE
  remove = catchAsync(async (req, res) => {
    const { id } = req.params;
    await this._getById(id);

    await this.model.findByIdAndDelete(id);
    return successRes(res, null, 204);
  });


// ====== HELPERS ======

  async _getById(id) {
    if (!isValidObjectId(id)) {
      throw new ApiError("Invalid Object ID", 400);
    }

    const query = this.model.findById(id);
    if (this.relation) {
      query.populate(this.relation);
    }

    const data = await query;

    if (!data) {
      throw new ApiError("Not found", 404);
    }

    return data;
  }

  async _isExists(filter, message) {
    const exists = await this.model.findOne(filter);
    if (exists) {
      throw new ApiError(`${message} already exists`, 409);
    }
  }
}
