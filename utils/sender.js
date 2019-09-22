'use strict';

const request = require('request');

process.env.CURRENTEMAILPROVIDER = 'sendgrid';

function initialize(provider) {
    if (typeof provider === 'undefined') {
        provider=process.env.CURRENTEMAILPROVIDER;
    }
    switch(provider){
        case 'sendgrid':
            return new Sendgrid();
        case 'postmark':
            return new Postmark();
        default:
            throw new Error("Invalid provider, check configuration!");
    }
}

function EmailProvider (provider) {
    this.initialize = function(){};
    this.send = function(){};
}
    
function Sendgrid(){
    this.send = function(email){
        var sdoptions = {
            url: '/v3/mail/send',
            baseUrl: 'https://api.sendgrid.com/',
            json: true,
            method: 'POST',
            headers: {},
            body:{},
        };
        sdoptions.headers.Authorization = 'Bearer ' + process.env.SENDGRID_API_KEY;

        var to=[];
        to.push({"email":email.to,"name":email.to_name});

        sdoptions.body.personalizations=[];
        sdoptions.body.personalizations.push({"to":to});

        sdoptions.body.from={"email":email.from, "name":email.from_name};
        sdoptions.body.subject=email.subject;

        sdoptions.body.content=[];
        sdoptions.body.content.push({"type":"text/plain","value": email.text})
        sdoptions.body.content.push({"type":"text/html","value": email.body})
        console.log(JSON.stringify(sdoptions))
        return new Promise(function(resolve, reject) {
            // Do async job
               request.post(sdoptions, function(err, resp, body) {
                   console.log(resp.statusCode);
                   if (err) {
                       console.log("error = " + error);
                       reject(err);
                   } else {
                       console.log(resp.headers);
                       resolve(resp);
                   }
               })
           });
    } 
}
Sendgrid.prototype = new EmailProvider();
  
function Postmark(){
    this.initialize = function(){};
    this.send = function(){
        const postmarkApikey = process.env.POSTMARK_API_KEY; 
        console.log("postmark -> send called");
    } 
}
Postmark.prototype = new EmailProvider();

module.exports = {initialize, Sendgrid, Postmark}