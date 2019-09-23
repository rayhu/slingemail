'use strict';

const request = require('request');

function initialize(provider) {
    if (typeof provider === 'undefined') {
        provider=process.env.DEFAULT_EMAIL_PROVIDER;
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
    /**
     * https://sendgrid.com/docs/api-reference/
     */
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
        return new Promise(function(resolve, reject) {
               request.post(sdoptions, function(err, resp, body) {
                   if (err) {
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
    /**
     * https://postmarkapp.com/developer/user-guide/sending-email/sending-with-api
     */
    this.send = function(email){
        var pmoptions = {
            url: '/email',
            baseUrl: 'https://api.postmarkapp.com/',
            json: true,
            method: 'POST',
            headers: {},
            body:{},
        };
        const postmarkApikey = process.env.POSTMARK_API_KEY; 
        pmoptions.headers = "X-Postmark-Server-Token:" + postmarkApikey; 

        pmoptions.body.From={"email":email.from};
        pmoptions.body.To={"email":email.to};
        pmoptions.body.Subject=email.subject;
        pmoptions.body.HtmlBody=email.body;
        pmoptions.body.TextBody=email.text;

        //console.log(pmoptions);
        return new Promise(function(resolve, reject) {
               request.post(pmoptions, function(err, resp, body) {
                   if (err) {
                       reject(err);
                   } else {
                       console.log(resp.headers);
                       resolve(resp);
                   }
               })
           });
        }
    } 

Postmark.prototype = new EmailProvider();

module.exports = {initialize, Sendgrid, Postmark}