----
# How to install

Clone the [repo] (https://github.com/rayhu/slingemail) and exec: 

    npm install

Pass api keys as ENV, put the following content into **apienv.sh**

    export SENDGRID_API_KEY=xxxxxxxxxx
    export POSTMARK_API_KEY=xxxxxxxxxx
and then exec:

    source apienv.sh

then execute:

    nodemon

Point your browser to [localhost:3000] (http://localhost:3000)


# How it was made
* Made out of **javascript**. It is functional, fast and asynchonous.
* Runtime is **node.js**, it is ismorphic.
* **express.js** as app skeleton, it is clean and restful.
* **express-validator** for input validation.
* **postman** to host the testing scripts.

## Trade​offs
We can break it down into more classes and modules.
Size, performance and maintenance


## Left out
* Pull the Non-Delivery Report
* Maybe github action can be used.
* Run it in docker

## What you might do differently
* The current version used environment variables to save api keys. Given more time, shall implement a configuration management system that pull different environments settings for prod/staging/dev, etc.
* Maybe consider deploy it as serverless cloud functions

# Anything else you wish to include.
Maybe a dashboard to watch the service load, health, etc
