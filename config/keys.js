// figure out wheter we are in the development mode or in the prodcution mode

if (process.env.NODE_ENV === "production") {
  // production mode return prod keys
  module.exports = require("./prod");
} else {
  // development mode return dev keys
  module.exports = require("./dev");
}
