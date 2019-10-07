const currentHost = require("../../config/keys");

module.exports = survey => {
  return `
        <html>
            <body>
                <div style="text-align: center;">
                    <h3>FeedBack!</h3>
                    <p>Please Answer the Following qustion <3</p>
                    <p>${survey.body}</p>
                    <div>
                        <a href="${currentHost.currentHost}/api/surveys/${survey.id}/yes" style="margin: 20px;">Yes</a>
                        <a href="${currentHost.currentHost}/api/surveys/${survey.id}/no" style="margin: 20px;">No</a>
                    </div> 
                </div>
            </body>
        </html>
    `;
};
