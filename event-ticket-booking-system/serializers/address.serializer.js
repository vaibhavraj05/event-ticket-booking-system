const getAddress = async (req, res, next) => {
  const data = res.data;
  let responses = [];
  for (let i = 0; i < data.length; i++) {
    const response = {
      id: data[i].id,
      addressName: data[i].addressName,
      cityPart: data[i].cityPart,
      city: data[i].city,
      state: data[i].state,
      country: data[i].country,
      pinCode: data[i].pinCode,
    };
    responses.push(response);
  }
  res.data = responses;
  next();
};

module.exports = {
  getAddress,
};
