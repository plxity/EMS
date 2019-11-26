const express = require("express");
const router = express.Router();
const { check, validationResult } = require("express-validator");
const UserEntry = require("../../Models/Entry");
const Nexmo = require("nexmo");
const nodemailer = require("nodemailer");
const config = require("config");

// Get details from Config
const emailHost = config.get('EMAIL_HOST');
const emailPass = config.get('EMAIL_PASSWORD');
const emailPort = config.get('EMAIL_PORT');
const emailUser= config.get('EMAIL_USER');
const msgApi = config.get('API_KEY');
const msgApisecret = config.get('API_SECRET');
const phoneNumber = config.get('PHONE_NUMBER')

const nexmo = new Nexmo({
  apiKey: msgApi,
  apiSecret: msgApisecret
});

let transporter = new nodemailer.createTransport({
  host: emailHost,
  port: emailPort,
  secure: true, // use SSL
  auth: {
    user: emailUser, // generated ethereal user
    pass: emailPass // generated ethereal password
  }
});
router.get("/", async (req, res) => {
  try {
    const entry = await UserEntry.find();
    res.json(entry);
  } catch (err) {
    res.status(500).send("Server Error");
  }
});
router.post(
  "/",
  [
    check("visitorName", "Name is required")
      .not()
      .isEmpty(),
    check("visitorEmail", "Please include a valid email").isEmail(),
    check("hostName", "Name is required")
      .not()
      .isEmpty(),
    check("hostEmail", "Please include a valid email").isEmail(),
    check("hostPhone", "Please include a valid phone number").isLength({
      min: 12,
      max: 12
    }),
    check("visitorPhone", "Please include a valid phone number").isLength({
      min: 12,
      max: 12
    })
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    try {
      const {
        visitorName,
        visitorEmail,
        hostName,
        hostEmail,
        hostPhone,
        visitorPhone
      } = req.body;
      let entry = new UserEntry({
        visitorName,
        visitorEmail,
        hostName,
        hostEmail,
        hostPhone,
        visitorPhone
      });
      const post = await entry.save();
      var today = new Date();
      var date =
        today.getFullYear() +
        "-" +
        (today.getMonth() + 1) +
        "-" +
        today.getDate();
      var time =
        today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
      var dateTime = date + " " + time;
      const output = `
    <h1>You have a new visitor</h1>
    <h2>Contact Details</h2></p>
    <ul>  
      <li><h3>Name: ${req.body.visitorName}</h3></li>
      <li><h3>Email: ${req.body.visitorEmail}</h3></li>
      <li><h3>Contact Number: ${req.body.visitorPhone}</h3></li>
      <li><h3>Date and Time: ${dateTime} IST</h3></li>
    </ul>`;

      // setup email data with unic</h4>ode symbols
      let mailOptions = {
        from: '"Visitor Request" purutaneja.com@gmail.com', // sender address
        to: `${hostEmail}`, // list of receivers
        subject: "New Visitor Notification", // Subject line
        text: "Hello world?", // plain text body
        html: output // html body
      };

      ////////////////////////////// Send EMAIL to Host/////////////////////////////////
      transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
          return res.status(500).send("Server Error");
        }
        console.log("Message sent: %s", info.messageId);
        console.log("Preview URL: %s", nodemailer.getTestMessageUrl(info));
      });

      /////////////////////////// Send SMS to Host /////////////////////////////

      const msgText = ` Name - ${visitorName}, Email - ${visitorEmail}, No. - ${visitorPhone} `;
      nexmo.message.sendSms(
        phoneNumber,
        req.body.hostPhone,
        msgText,
        { type: "unicode" },
        (err, responseData) => {
          if (responseData) {
            console.log(responseData);
          }
        }
      );
      res.json(post);
    } catch (err) {
      res.status(500).send("Server Error");
    }
  }
);

router.put("/", async (req, res) => {
  try {
    const findEntry = await UserEntry.findById(req.body.entryId);
    if (findEntry.visitorCheckout != null) {
      return res.status(403).send("Already Session Ended");
    }
    const entry = await UserEntry.findByIdAndUpdate(
      req.body.entryId,
      {
        visitorCheckout: new Date().getTime()
      },
      { new: true }
    );

    const {
      visitorCheckin,
      visitorCheckout,
      hostName,
      visitorName,
      visitorPhone,
      visitorEmail
    } = entry;
    console.log(entry);
    const output = `
    <h2>Your Visit Details</h2>
    <h3>Contact Details</h3>
    <ul>
      <li><h3>Name: ${visitorName}</h3></li>
      <li><h3>Email: ${visitorEmail}</h3></li>
      <li><h3>Contact Number: ${visitorPhone}</h3></li>
      <li><h3>Host Name: ${hostName}</h3></li>
      <li><h3>CheckedIn: ${visitorCheckin}</h3></li>
      <li><h3>CheckedOut: ${visitorCheckout}</h3></li>
    </ul>`;
    // setup email data with unicode symbols
    let mailOptions = {
      from: '"Visit Information" purutaneja.com@gmail.com', // sender address
      to: `${visitorEmail}`, // list of receivers
      subject: "Your Visit Information", // Subject line
      text: "Hello world?", // plain text body
      html: output // html body
    };

    ////////////////////////////// Send EMAIL to Host/////////////////////////////////

    await transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
       console.log(err);
      }
      console.log("Message sent: %s", info.messageId);
      console.log("Preview URL: %s", nodemailer.getTestMessageUrl(info));
    });
    const all = await UserEntry.find();
    res.json(all);
  } catch (err) {
    res.status(500).send("Server Error");
  }
});
module.exports = router;
