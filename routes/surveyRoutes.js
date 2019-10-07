const _ = require("lodash");
const Path = require("path-parser").default;
const { URL } = require("url");
const mongoose = require("mongoose");
const requireLogin = require("../middlewares/requireLogin");
const requireCredits = require("../middlewares/requireCredits");
const Mailer = require("../services/Mailer");
const surveyTemplate = require("../services/emailTemplates/surveyTemplate");

const Survey = mongoose.model("surveys");

module.exports = app => {
  // get all surveys for the user
  app.get("/api/surveys", requireLogin, async (req, res) => {
    const surveys = await Survey.find({ _user: req.user.id }).select({
      recipients: false
    });

    res.send(surveys);
  });

  app.get("/api/surveys/:surveyId/:choice", (req, res) => {
    res.send("Thanks for Your FeedBack!");
  });

  app.post("/api/surveys/webhooks", (req, res) => {
    // we get from the send grid webhook alot of events so we filter it!
    // so we get non-repettive event and what can contain the correct url, email, and event

    // => PULL OFF THE DATA FROM THE EXTRACTED ROUTE
    const p = new Path("/api/surveys/:surveyId/:choice");

    // map through all events sent by the webhook to extract the data from the URL,
    // take the undefined objects out!,
    // take out any duplicate events
    // return the value

    _.chain(req.body)
      .map(({ email, url }) => {
        const match = p.test(new URL(url).pathname);

        if (match) {
          return { email, ...match };
        }
      })
      .compact()
      .uniqBy("email", "surveyId")
      .each(({ surveyId, email, choice }) => {
        Survey.updateOne(
          {
            _id: surveyId,
            recipients: {
              $elemMatch: { email: email, responded: false }
            }
          },
          {
            $inc: { [choice]: 1 },
            $set: { "recipients.$.responded": true },
            lastResponded: new Date()
          }
        ).exec();
      })
      .value();

    // just to tell send-grid that every thing is okay and there`s no need to make another request
    res.send({});
  });

  // combine survey and the template forming Mailer object , then send it !
  app.post("/api/surveys", requireLogin, requireCredits, async (req, res) => {
    const { title, body, subject, recipients } = req.body;

    // create new survey instance
    const survey = new Survey({
      title,
      body,
      subject,
      _user: req.user.id,
      recipients: recipients.split(",").map(email => ({ email })),
      dateSent: Date.now()
    });

    // create new mailer instance
    const mailer = new Mailer(survey, surveyTemplate(survey));

    try {
      await mailer.send();
      await survey.save();
      req.user.credits -= 1;
      const user = await req.user.save();

      res.send(user);
    } catch (err) {
      // 422 unproccessable entries
      res.status(422).send(err);
    }
  });
};
