const getTheatre = async (req, res, next) => {
  const data = res.data;
  let responses = [];
  for (let i = 0; i < data.length; i++) {
    const response = {
      id: data[i].id,
      theatreName: data[i].theatreName,
      addressId: data[i].addressId,
      noOfScreens: data[i].noOfScreens,
    };
    responses.push(response);
  }
  res.data = responses;
  next();
};

module.exports = {
  getTheatre,
};
