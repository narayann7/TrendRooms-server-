const commonServices = {
  sendRespond: (res, data) => {
    var responseDate = { data };
    if (res.accessToken) {
      responseDate.accessToken = res.accessToken;
    }
    res.status(200).json({
      responseDate,
    });
  },
};

module.exports = commonServices;
