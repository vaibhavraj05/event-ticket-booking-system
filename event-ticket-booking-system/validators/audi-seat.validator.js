const Joi = require('joi');
const {validateRequest} = require('../helper/common-functions.helper')

const createAudiSeatSchema = async (req, res, next) => {
    const schema = Joi.object({
        audiId: Joi.string().uuid().required(),
        seatNo: Joi.number().min(0).required(),
        seatType:Joi.string()
        .valid("gold", "silver","platinum")
        .label("Seat Type should be [gold,platinum,silver] only"),
    });
    validateRequest(req, res, next, schema, 'body');
}
const getAudiSeatSchema = async (req, res, next) => {
    const schema = Joi.object({
        audiId: Joi.string().uuid().required(),
    });
    validateRequest(req, res, next, schema, 'body');
}



module.exports={
    createAudiSeatSchema,getAudiSeatSchema
}