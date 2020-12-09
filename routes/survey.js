const { URL } = require('url');
const express = require('express');
const mongoose = require('mongoose');
const _ = require('lodash');
const { Path } = require('path-parser');

const route = express();

const requireLogin = require('../middlewares/loginMiddleware');
const requireCredit = require('../middlewares/creditMiddleware');
const Mailer = require('../services/Mailer');
const surveyTemplate = require('../services/emailTemplates/surveyTemplate');

const Survey = mongoose.model('surveys');

route.post('/api/surveys', requireLogin, requireCredit, async (req, res) => {
    try {
        const { title, subject, body, recipients } = req.body;
        const survey = new Survey({
            title,
            body,
            subject,
            recipients: recipients.split(',').map((email) => {
                return { email: email };
            }),
            _user: req.user.id,
            dateSent: Date.now(),
        });

        const mailer = new Mailer(survey, surveyTemplate(survey));
        await mailer.send();
        await survey.save();
        req.user.credits -= 1;
        const user = await req.user.save();
        res.send(user);
    } catch (error) {
        res.status(422).send(error);
    }
});

route.get('/api/surveys/:surevyId/:choice', (req, res) => {
    res.send('Thank you for voting');
});

route.post('/api/surveys/webhooks', (req, res) => {
    const path = new Path('/api/surveys/:surveyId/:choice');

    return _.chain(req.body)
        .map((event) => {
            const match = path.test(new URL(event.url).pathname);
            if (match) {
                return {
                    email: event.email,
                    surveyId: match.surveyId,
                    choice: match.choice,
                };
            }
        })
        .compact()
        .unionBy('email', 'surveyId')
        .each(({ surveyId, email, choice }) => {
            Survey.updateOne(
                {
                    _id: surveyId,
                    recipients: {
                        $elemMatch: { email: email, responded: false },
                    },
                },
                {
                    $inc: { [choice]: 1 },
                    $set: { 'recipients.$.responded': true },
                    lastResponded: new Date(),
                }
            ).exec();
        })
        .value();
    res.send({});
});

route.get('/api/surveys', requireLogin, async (req, res) => {
    try {
        surveys = await Survey.find({ _user: req.user.id }).select({
            recipients: false,
        });

        if (!surveys) res.status(404).send('Not found!');

        res.status(200).send(surveys);
    } catch (error) {
        res.status(500).send({ error: error.message });
    }
});

module.exports = route;
