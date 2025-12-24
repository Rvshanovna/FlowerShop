import Joi from 'joi'

class OrderItemValidation {
    create(data){
        const schema = Joi.object({
            orderId: Joi.string().hex().length(24).required(),
            productId: Joi.string().hex().length(24).required(),            
            price:Joi.number().required(),
            quantity:Joi.string().required(),
        })
        return schema.validate(data)
    }

    update(data){
        const schema = Joi.object({
            orderId: Joi.string().hex().length(24).optional(),
            productId: Joi.string().hex().length(24).optional(),            
            price:Joi.number().optional(),
            quantity:Joi.string().min(1).optional(),
        })
        return schema.validate(data)
    }
}

export default new OrderItemValidation()