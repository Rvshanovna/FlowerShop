import Joi from "joi";

class ProductValidator {
    create(data) {
        const product = Joi.object({
            name: Joi.string().min(3).required(),
            description: Joi.string().optional(),
            image: Joi.string().optional(),
            color: Joi.string().optional(),
            price: Joi.number().min(0).required(),
            quantity: Joi.number().min(1).required(),
            isAvaible: Joi.boolean().required(),
            categoryId: Joi.string().hex().length(24).required()
        });
        return product.validate(data);
    }

    update(data) {
        const product = Joi.object({
            name: Joi.string().min(3).optional(),
            description: Joi.string().optional(),
            image: Joi.string().optional(),
            color: Joi.string().optional(),
            price: Joi.number().min(0).optional(),
            quantity: Joi.number().min(1).optional(),
            isAvaible: Joi.boolean().optional(),
            categoryId: Joi.string().hex().length(24).optional()
        });
        return product.validate(data);
    }
}

export default new ProductValidator();
