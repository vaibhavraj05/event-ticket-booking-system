const getEvent = async (req, res, next) => {
  const data = res.data;
  let responses = [];
  for (let i = 0; i < data.length; i++) {
    const response = {
      id: data[i].id,
      eventType: data[i].eventType,
    };
    responses.push(response);
  }
  res.data = responses;
  next();
};

module.exports = {
  getEvent,
};
