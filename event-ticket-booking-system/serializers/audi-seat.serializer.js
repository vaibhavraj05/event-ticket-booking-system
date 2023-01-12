const getAudiSeat = async (req, res, next) => {
  const data = res.data;
  let responses = [];
  for (let i = 0; i < data.length; i++) {
    const response = {
      id: data[i].id,
      audiId: data[i].audiId,
      seatNo: data[i].seatNo,
      seatType: data[i].seatType,
    };
    responses.push(response);
  }
  res.data = responses;
  next();
};

module.exports = {
  getAudiSeat,
};
