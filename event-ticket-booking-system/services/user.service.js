const models = require("../models");
const { sequelize } = require("../models");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const UniqueStringGenerator = require("unique-string-generator");
const mailer = require("../helper/mail.helper");
const redisClient = require("../utility/redis");
const registration = async (payload) => {
  try {
    const existingUser = await models.User.findOne({
      where: { email: payload.email },
    });
    if (existingUser) {
      throw new Error("User already exists");
    }

    payload.password = await bcrypt.hash(payload.password, 10);
    const data = await models.User.create(payload);
    return "user created successufully";
  } catch (error) {
    return { data: null, error: error };
  }
};
const loginUser = async (payload) => {
  const { email, password } = payload;

  console.log(payload);

  const user = await models.User.findOne({
    where: {
      email: email,
    },
  });

  let key = user.dataValues.id + "-refresh-token";
  let refreshToken = await redisClient.get(key);
  if (!refreshToken) {
    const match = await bcrypt.compareSync(password, user.dataValues.password);
    if (!match) {
      throw new Error("Wrong email or password");
    }
    refreshToken = jwt.sign(
      { userId: user.dataValues.id },
      process.env.SECRET_KEY_REFRESH,
      {
        expiresIn: process.env.JWT_REFRESH_EXPIRATION,
      }
    );
  }

  const accessToken = jwt.sign(
    { userId: user.dataValues.id },
    process.env.SECRET_KEY_ACCESS,
    {
      expiresIn: process.env.JWT_ACCESS_EXPIRATION,
    }
  );

  await redisClient.set(key, refreshToken);

  return {
    id: user.id,
    email: user.email,
    accessToken: accessToken,
    refreshToken: refreshToken,
  };
};

const refreshToken = async (refreshToken, userId) => {
  let newAccessToken = jwt.sign(
    { userId: userId },
    process.env.SECRET_KEY_ACCESS,
    {
      expiresIn: process.env.JWT_ACCESS_EXPIRATION,
    }
  );

  return {
    accessToken: newAccessToken,
    refreshToken,
  };
};

const resetPassword = async (payload, user) => {
  const userId = user.id;
  const password = payload.oldPassword;
  const match = await bcrypt.compare(password, user.password);
  if (!match) {
    throw new Error("Wrong credentials");
  }
  const newPassword = await bcrypt.hash(payload.newPassword, 10);
  const updatePassword = await models.User.update(
    { password: newPassword },
    { where: { id: userId } }
  );

  return "password reset successfully";
};

const forgetPassword = async (payload) => {
  const email = payload.email;
  const findUser = await models.User.findOne({
    where: { email: email },
  });

  if (!findUser) {
    throw new Error("user not found");
  }
  const randomToken = UniqueStringGenerator.UniqueString();
  const body = `reset password link- ${process.env.BASE_URL}/user/reset-password/${randomToken}`;
  const subject = "reset password";
  const recipient = email;
  const userId = findUser.id;
  await redisClient.set(randomToken, userId, 20);
  mailer.sendMail(body, subject, recipient);
  return "reset password link send successfully";
};

const resetPasswordByLink = async (payload, params) => {
  const userId = await redisClient.get(params.id);
  if (!userId) {
    throw new Error("Invite expire for changing password");
  }
  const password = payload.password;
  const newPassword = await bcrypt.hash(password, 10);
  const updatePassword = await models.User.update(
    { password: newPassword },
    { where: { id: userId } }
  );

  return "password reset successfully";
};

module.exports = {
  registration,
  loginUser,
  refreshToken,
  resetPassword,
  forgetPassword,
  resetPasswordByLink,
};
