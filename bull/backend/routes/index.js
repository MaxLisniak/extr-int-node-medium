var express = require('express');
var router = express.Router();

const Queue = require("bull");
const axios = require("axios");
const dbFact = require("../db/models/Fact");


const mailQueue = new Queue('mailQueue');

mailQueue.process('email', (job) => {
  sendEmail(job)
})

const addEmailToQueue = (data) => {
  mailQueue.add('email', data, { delay: 1000 * 60 })
}

const sendEmail = async (job) => {
  const sender = "sender@mail.com";
  const { recepient } = job.data;
  try {
    axios.get("https://meowfacts.herokuapp.com/").then(async (res) => {
      console.log(`Mail from ${sender} was sent to ${recepient}: ${JSON.stringify(res.data.data[0], null, 2)}`);
      await dbFact.query().insert({
        recepient: recepient,
        fact: res.data.data[0]
      });
    }
    );
    job.moveToCompleted('done', true)
    console.log("job completed")

  } catch (error) {
    if (error.response) {
      job.moveToFailed({ message: 'job failed' })
      console.log("job failed")

    }
  }
}

/* GET home page. */
router.get('/', function (req, res, next) {
  res.render('index', { title: 'To add a fact to the database send POST request to \'/\' providing an object containing the \'recepient\' value ' });
});

router.post('/', function (req, res, next) {
  if (req.body.recepient) {
    addEmailToQueue(req.body);
    console.log(req.body)
  } else return res.status(400).send("Add the 'recepient' value to the request");
  return res.sendStatus(200);
})

module.exports = router;