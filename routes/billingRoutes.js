const keys = require("../config/keys");
const stripe = require("stripe")(keys.stripeSecretKey);
const requireLogin = require("../middlewares/requireLogin");

module.exports = app => {
  // Note: we can put as many middleware as we want
  app.post("/api/stripe", requireLogin, async (req, res) => {
    const charge = await stripe.charges.create({
      amount: 723,
      currency: "usd",
      source: req.body.id,
      description: "5 emails credit for 7.23$"
    });

    req.user.credits += 5;
    const user = await req.user.save();
    res.send(user);
  });
};
