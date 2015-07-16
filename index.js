var winston = module.parent.require('winston'),
    nodemailer = require('nodemailer'),
    Emailer = {};

var constants = module.parent.require('../plugin_configs/emailer_qingcloud_constants');

Emailer.send = function(data) {
    var username = constants.username;
    var pass = constants.password;
    var transportOptions = {
        host: constants.host,
        port: constants.port,
        secureConnection: constants.secure
    };
    if (username || pass) {
        transportOptions.auth = {
            user: username,
            pass: pass
        };
    }
    var transport = nodemailer.createTransport('SMTP', transportOptions);
    transport.sendMail({
        from: data.from,
        to: data.to,
        html: data.html,
        text: data.plaintext,
        subject: data.subject
    }, function(err, response) {
        if (!err) {
            winston.info('[emailer.smtp] Sent `' + data.template + '` email to uid ' + data.uid);
        } else {
            winston.error(err);
            winston.warn('[emailer.smtp] Unable to send `' + data.template + '` email to uid ' + data.uid + '!!');
        }
    });
}

module.exports = Emailer;