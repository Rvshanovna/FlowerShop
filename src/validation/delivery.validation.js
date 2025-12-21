import Joi from "joi";

class DeliveryValidation {
  create(data) {
    const schema = Joi.object({
      name: Joi.string().required(),
      price: Joi.number().required(),
      orderId: Joi.string().required(), 
      userId: Joi.string().required()   
    });
    return schema.validate(data, { abortEarly: false });
  }

  update(data) {
    const schema = Joi.object({
      name: Joi.string().optional(),
      price: Joi.number().optional(),
      orderId: Joi.string().optional(),
      userId: Joi.string().optional()
    });
    return schema.validate(data, { abortEarly: false });
  }
}

export default new DeliveryValidation();
