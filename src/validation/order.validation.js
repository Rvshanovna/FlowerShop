import Joi from 'joi'

class OrderValidation {
    create(data){
        const schema = Joi.object({
            customerId: Joi.string().hex().length(24).required(),
            totalPrice:Joi.number().required(),
            status:Joi.string().required(),
            address:Joi.string().required()
        })
        return schema.validate(data)
    }

    update(data){
        const schema = Joi.object({            customerId: Joi.string().hex().length(24).required(),
            customerId: Joi.string().hex().length(24).optional(),
            totalPrice:Joi.number().optional(),
            status:Joi.string().optional(),
            address:Joi.string().optional()
        })
        return schema.validate(data)
    }
}

export default new OrderValidation()