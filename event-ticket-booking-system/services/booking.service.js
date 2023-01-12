const models = require("../models");
const { sequelize } = require("../models");
const moment = require("moment");
const createMovieBooking = async (payload, user) => {
  const trans = await sequelize.transaction();
  try {
    const isLocked = moment().format("hh:mm:ss");
    const lockTime = moment().add(11, "minutes").format("hh:mm:ss");
    const newPayload = {
      userId: user.id,
      movieId: payload.movieId,
      isLocked: isLocked,
      lockTime: lockTime,
    };
    await models.Booking.create(newPayload, {
      transaction: trans,
    });

    await trans.commit();
    return "movie  booking  has successfully created";
  } catch (error) {
    await trans.rollback();
    return { data: null, error: error };
  }
};

const createConcertBooking = async (payload, user) => {
  const trans = await sequelize.transaction();
  try {
    const isLocked = moment().format("hh:mm:ss");
    const lockTime = moment().add(11, "minutes").format("hh:mm:ss");
    const newPayload = {
      userId: user.id,
      concertId: payload.movieId,
      isLocked: isLocked,
      lockTime: lockTime,
    };
    await models.Booking.create(newPayload, {
      transaction: trans,
    });

    await trans.commit();
    return "concert  booking  has successfully created";
  } catch (error) {
    await trans.rollback();
    return { data: null, error: error };
  }
};

const getBooking = async (payload, user) => {
  const booking = await models.Booking.findAll({
    where: { user_id: user.id },
  });
  let bookingArray = [];
  for (let i = 0; i < booking.length; i++) {
    const currentTime = moment().format("hh:mm:ss");
    if (currentTime <= booking[i].lockTime) {
      bookingArray.push(booking[i]);
    } else {
      if (booking[i].bookingStatus == "pending") {
        await models.Booking.update(
          { bookingStatus: "failed" },
          { where: { id: booking[i].id } }
        );
      }
      bookingArray.push(booking[i]);
    }
  }
  return bookingArray;
};
module.exports = {
  createMovieBooking,
  createConcertBooking,
  getBooking,
};
