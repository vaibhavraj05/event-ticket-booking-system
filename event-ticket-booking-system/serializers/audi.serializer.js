const getAudi = async (req, res, next) => {
  const data = res.data;
  let responses = [];
  for (let i = 0; i < data.length; i++) {
    const response = {
      id: data[i].id,
      theatreId: data[i].theatreId,
      noOfSeats: data[i].noOfSeats,
    };
    responses.push(response);
  }
  res.data = responses;
  next();
};

module.exports = {
  getAudi,
};
