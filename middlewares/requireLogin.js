module.exports = (req, res, next) => {
  // check if there is any registred user
  //  note: passport save the loged used in req.user
  // 401 mean forbiddn or not authorized (not loged in).

  if (!req.user) {
    return res.status(401).send({ error: "you are not logged in" });
  }

  // if there is user logged in continue the the flow or to the next middleware
  next();
};
