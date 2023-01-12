const getBooking = async (req, res, next) => {
  const data = res.data;
  let responses = [];
  for (let i = 0; i < data.length; i++) {
    const response = {
      id: data[i].id,
      userId: data[i].userId,
      movieId: data[i].movieId,
      concertId: data[i].concertId,
      bookingStatus: data[i].bookingStatus,
    };
    responses.push(response);
  }
  res.data = responses;
  next();
};

module.exports = {
  getBooking,
};
