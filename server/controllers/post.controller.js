exports.detail_get = async (req, res, next) => {
  try {
    res.status(200).send("hello world");
  } catch (e) {
    throw Error(e);
  }
};

exports.register_post = async (req, res, next) => {
  try {
    res.status(200).send("hello world");
  } catch (e) {
    throw Error(e);
  }
};
