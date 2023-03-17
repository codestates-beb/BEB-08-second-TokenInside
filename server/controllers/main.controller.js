exports.main_get = async (req, res, next) => {
  try {
    console.log(req.session);
    res.status(200).send("hello world");
  } catch (e) {
    throw Error(e);
  }
};

exports.test_get = async (req, res, next) => {
  try {
    res.status(200).send("hello world");
  } catch (e) {
    throw Error(e);
  }
};
