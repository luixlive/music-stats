const Joi = require('joi');

module.exports = Joi.object().keys({
  accessToken: Joi.string().min(151).required(),
  profile: Joi.object().keys({
    displayName: Joi.string().required(),
    externalUrls: Joi.object().required(),
    followers: Joi.object().required(),
    href: Joi.string().uri().required(),
    id: Joi.string().required(),
    images: Joi.array().required(),
    type: Joi.string().required(),
    uri: Joi.string().required(),
  }).required(),
  refreshToken: Joi.string().min(131).required(),
});
