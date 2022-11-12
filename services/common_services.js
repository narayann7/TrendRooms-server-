const commonServices = {
  sendRespond: (res, data) => {
    if (res.accessToken) {
      res.status(200).json({
        responseDate: data,
        accessToken: res.accessToken,
      });
    } else {
      res.status(200).json({
        responseDate: data,
      });
    }
  },
};

module.exports = commonServices;
