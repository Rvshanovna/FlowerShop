import Joi from "joi";

class ReviewValidation {
  create(data) {
    const schema = Joi.object({
      customerId: Joi.string().required(),
      productId: Joi.string().required(),
      rating: Joi.number().integer().min(1).max(5).required(),
      comment: Joi.string().optional()
    });
    return schema.validate(data, { abortEarly: false });
  }

  update(data) {
    const schema = Joi.object({
      rating: Joi.number().integer().min(1).max(5).optional(),
      comment: Joi.string().optional()
    });
    return schema.validate(data, { abortEarly: false });
  }
}

export default new ReviewValidation();
