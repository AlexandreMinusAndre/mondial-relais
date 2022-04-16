const Joi = require("joi");

function validate(obj) {
  const schema = Joi.object({
    mail: Joi.string().email({

        minDomainSegments: 2,
        tlds: { allow: ["com", "net", "fr"] }
      }).required(),
    password: Joi.string().pattern(new RegExp("^[a-zA-Z0-9]{3,30}$")).required()
    
  });
  return schema.validate(obj);
  
}

module.exports = validate;