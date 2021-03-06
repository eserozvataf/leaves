'use strict';

const feedbackController = require('../../controllers/feedback.js');

class feedback {

    static index(req, res, next) {
        feedbackController.post(req.userId, req.sessionId, {
            subject: req.body.subject,
            message: req.body.message
        })
            .then((result) => {
                // res.json(result);
                res.json({});
            })
            .catch(next);
    }

}

module.exports = feedback;
