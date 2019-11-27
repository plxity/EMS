# Innovaccer Assignment

## Problem Statement

Given the visitors that we have in office and outside, there is a need to for an entry management software.

## How to start this application?

```bash
#Clone the repository
git clone https://github.com/plxity/EMS

# Install server dependencies
npm install

# Install client dependencies
cd client
npm install
```

Change default.json file in config folder this file is located in config/default.json

- Create free account at Nexmo (https://www.nexmo.com/)  for generating API KEY and API SECRET KEY.

```
 Add uri of your mongodb connection for example

 "mongoURI": "mongodb://127.0.0.1/anydbname"


 Add Email account for sending E-mail via node-mailer for example

 "EMAIL_HOST": "smtp.gmail.com"

 "EMAIL_PORT": "465"

 "EMAIL_USER": "Enter Email Address"

 "EMAIL_PASSWORD": "Enter Email Password"


 Add details for sending message's via 'Nexmo' API for example

 "API_KEY": "NEXMO API KEY"

 "API_SECRET": "NEXMO SECRET KEY"

 "PHONE_NUMBER": "+919876543210" (Mention Country Code)

```

```bash

# Run both Express & React from root
npm run dev

The App will start at http://localhost:3000/

```
## Tech Stack

1. Javascript: Primary programing language
2. CSS: Styling web pages, HTML files
3. ReactJS: Javascript library for building User Interfaces
4. Redux: Managing global state
5. NodeJS: Backend Framework
6. ExpressJS: Backend library
7. MongoDB: Database for storing entry
8. External API: Nexmo (for sending messages)

## Approach

Event Management Service is based on an idea which stores data of a visitor and host in the database and as the data is saved timestamp is also stored as well & SMS and E-mail is sent to the host. When a session is ended, the timestamp is also stored and then mail to the visitor is send node-mailer. Once a session has ended user is not allowed to change the timestamp.

## Database Fields
```
 |__entrySchema
            |___ visitorName
            |___ visitorEmail
            |___ visitorPhone
            |___ visitorCheckin
            |___ visitorCheckout
            |___ hostName
            |___ hostEmail
            |___ hostPhone

```
## Folder Structure

<img src="./fs.png" style="width: 50%; height:100%;" />

## NPM packages used

- Frontend

- axios
    - react-notifications
    - redux-thunk
    - react-redux
    - redux

- Backend 

    - concurrently
    - config
    - cors
    - express-validator
    - nexmo
    - nodemailer
    - nodemon

## Application Images

<img src="./capture.png" style="width: 100%; height:100%;" />

<img src="./current.png" style="width: 100%; height:100%;" />

## Application Information

This is an entry management system used for tracking the entry and exit details of a person.
As the app loads up, a form is displayed in which you can enter the details and email & msg will be sent to host consisting of your details. When you have to end your meeting/session, Go to 'Current Session' tab and end your session. This will send an email to a visitor regarding his/her visit.

## How to use?

1. As the first page loads up a form is displayed (as shown in figure above).

2. Enter the details of the visitor and host. The visitor details will be sent to host via     E-mail and Message.

3. When a user has to checkout, click on the 'Current Session' tab and end the session.

4. An E-mail will be sent to user consisting information about the visit.

5. To view the ended sessions- Click on 'Ended Session' tab and you will be redirected to      the route consisting details of ended sessions.


## Author

Name: Apoorv Taneja

Email: apoorvtaneja@outlook.com and 17uec026@lnmiit.ac.in

Phone No.: +91 9834412453

Website: https://plxity.github.io/



