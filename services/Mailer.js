// NOTE: The setup of send grid has to be done in this style
// it may not seem very straight forward BUT it must be like this
// THIS IS HOW WE HAVE TO DO IT !!!
const sendGrid = require("sendgrid");
const helper = sendGrid.mail;
const keys = require("../config/keys");

class Mailer extends helper.Mail {
  constructor({ subject, recipients }, content) {
    super();

    this.sgApi = sendGrid(keys.sendGridKey);

    // Email 4 golden properties
    this.subject = subject;
    this.from_email = new helper.Email("no-reply@Emaily.com");
    this.body = new helper.Content("text/html", content);
    this.recipients = this.formatAddresses(recipients);

    // Mail built-in function , Mail expect you to call
    this.addContent(this.body);

    // Email Click Tracking
    // note: we enable this click tracking system because when we sent an email we want to know
    // what was the response and who did it!
    this.addClickTracking();

    this.addRecipients();
  }

  // recipients is array of object each object has email
  // so we extract every single email from this array
  formatAddresses(recipients) {
    return recipients.map(({ email }) => {
      return new helper.Email(email);
    });
  }

  // Email Click Tracking
  addClickTracking() {
    const trackingSettings = new helper.TrackingSettings();
    const clickTracking = new helper.ClickTracking(true, true);

    trackingSettings.setClickTracking(clickTracking);
    this.addTrackingSettings(trackingSettings);
  }

  // This is how its done!
  addRecipients() {
    const personalize = new helper.Personalization();

    this.recipients.forEach(recipient => {
      personalize.addTo(recipient);
    });

    this.addPersonalization(personalize);
  }

  // send the emails
  async send() {
    const request = this.sgApi.emptyRequest({
      method: "POST",
      path: "/v3/mail/send",
      body: this.toJSON()
    });

    const response = await this.sgApi.API(request);
    return response;
  }
}

module.exports = Mailer;
