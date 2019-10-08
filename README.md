----
# How to install

Clone the [repo] (https://github.com/rayhu/slingemail) and exec: 

    npm install

Pass api keys as ENV, put the following content into **apienv.sh**, you can change the default email provider here.

    export SENDGRID_API_KEY=xxxxxxxxxx
    export POSTMARK_API_KEY=xxxxxxxxxx
    export DEFAULT_EMAIL_PROVIDER=sendgrid
    # export DEFAULT_EMAIL_PROVIDER=postmark
and then run below command to set the environment variables.

    source apienv.sh

then execute below command to start serve the content on [localhost:3000] (http://localhost:3000).

    nodemon

Download [postman] (https://www.getpostman.com) and import the file email-sling.postman_collection.json in root folder, it contains the post requests to test the app.


# Components
* **express.js** as app skeleton, it is clean and restful.
* The client is abstracted with prototype. The **sender.js** select an instance of children classes
* **express-validator** for input validation
* **postman** to host the testing scripts


## Left out
* Check RFCs and deal with subject encodings
* Pull the Non-Delivery Report
* Run in docker. Maybe consider deploy it as serverless cloud functions
* The current version used environment variables to save api keys. In production, shall implement a configuration management system that pull different environments settings for prod/staging/dev, etc.
* Maybe a dashboard to watch the service load, health, etc
