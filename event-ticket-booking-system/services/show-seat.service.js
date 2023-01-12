const models = require("../models");
const moment = require("moment");
const { sequelize } = require("../models");
const createShowSeat = async (payload, booking) => {
  const trans = await sequelize.transaction();
  try {
    const getBooking = await models.Booking.findOne(
      { where: { id: booking.id } },
      { transaction: trans }
    );
    if (!getBooking) {
      throw new Error("booking doesn't exists");
    }
    if (getBooking.bookingStatus == "failed") {
      throw new Error("booking failed can't book the seats");
    }
    const showSeat = await models.ShowSeat.findOne(
      { where: { audi_seat_id: payload.audiSeatId } },
      { transaction: trans }
    );
    if (showSeat) {
      throw new Error("seat is already exists");
    }
    const newPayload = {
      bookingId: booking.id,
      audiSeatId: payload.audiSeatId,
      seatPrice: payload.seatPrice,
    };
    await models.ShowSeat.create(newPayload, {
      transaction: trans,
    });
    await trans.commit();
    return "seat for booking has successfully created";
  } catch (error) {
    await trans.rollback();
    return { data: null, error: error };
  }
};

const getShowSeat = async (payload, booking) => {
  const trans = await sequelize.transaction();
  try {
    const currentTime = moment().format("hh:mm:ss");
    const getBooking = await models.Booking.findOne(
      { where: { id: booking.id } },
      { transaction: trans }
    );
    if (!getBooking) {
      throw new Error("booking id is incorrect");
    }
    const showSeat = await models.ShowSeat.findAll(
      {
        attributes: {
          exclude: ["deleted_at", "created_at", "updated_at"],
        },
        where: { booking_id: booking.id },
      },
      { transaction: trans }
    );
    if (!showSeat[0]) {
      throw new Error("booking id is incorrect");
    }
    if (currentTime <= getBooking.lockTime) {
      if (getBooking.bookingStatus == "pending") {
        let seatInfo = [];
        for (let i = 0; i < showSeat.length; i++) {
          const audiSeat = await models.AudiSeat.findOne(
            {
              attributes: {
                exclude: ["deleted_at", "created_at", "updated_at"],
              },
              where: { id: showSeat[i].audi_seat_id },
            },
            { transaction: trans }
          );
          const newPayload = {
            seatNumber: audiSeat.seatNo,
            seatType: audiSeat.seatType,
            seatPrice: showSeat[i].seatPrice,
          };
          seatInfo.push(newPayload);
        }
        await trans.commit();
        return seatInfo;
      } else if (getBooking.bookingStatus == "booked") {
        let seatInfo = [];
        for (let i = 0; i < showSeat.length; i++) {
          const audiSeat = await models.AudiSeat.findOne(
            {
              attributes: {
                exclude: ["deleted_at", "created_at", "updated_at"],
              },
              where: { id: showSeat[i].audi_seat_id },
            },
            { transaction: trans }
          );
          const newPayload = {
            seatNumber: audiSeat.seatNo,
            seatType: audiSeat.seatType,
            seatPrice: showSeat[i].seatPrice,
          };
          await models.ShowSeat.update(
            { seatStatus: "filled" },
            { where: { audi_seat_id: showSeat[i].audiSeatId } },
            { transaction: trans }
          );
          seatInfo.push(newPayload);
        }
        await trans.commit();
        return seatInfo;
      } else {
        for (let i = 0; i < showSeat.length; i++) {
          await models.ShowSeat.destroy(
            { where: { audi_seat_id: showSeat[i].audiSeatId } },
            { transaction: trans }
          );
        }
        await models.Booking.update(
          { bookingStatus: "failed" },
          { where: { id: booking.id } },
          { transaction: trans }
        );
        await trans.commit();
        return " booking failed ";
      }
    } else {
      for (let i = 0; i < showSeat.length; i++) {
        if(getBooking.bookingStatus == "pending"){
        await models.ShowSeat.destroy(
          { where: { audi_seat_id: showSeat[i].audiSeatId } },
          { transaction: trans }
        );
      }
      await models.Booking.update(
        { bookingStatus: "failed" },
        { where: { id: booking.id } },
        { transaction: trans }
      );
      }
      await trans.commit();
      return " booking failed ";
    }
  } catch (error) {
    await trans.rollback();
    return { data: null, error: error };
  }
};

module.exports = {
  getShowSeat,
  createShowSeat,
};
