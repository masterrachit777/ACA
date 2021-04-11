const express = require('express');
const bodyParser = require('body-parser');
const nodemailer = require('nodemailer');

const app = express();

var smtpTransport = nodemailer.createTransport({
   service: "gmail",
   host: "smtp.gmail.com",
   auth: {
       user: "priyanshu20202@gmail.com",
       pass: "pypy@2020"
   }
});

app.use(bodyParser.urlencoded({extended:true}));


app.get('/',(req,res)=> {
   res.sendFile(__dirname + '/index.html')
})

app.post('/',(req,res)=>{
      console.log(req.body)
      var otp = Math.floor(100000 + Math.random() * 900000);
      var mailOptions={
         to : req.body.email,
         subject : "OTP to login",
         text : otp
      }
      
      console.log(mailOptions);
      
      smtpTransport.sendMail(mailOptions, function(error, response){
         if(error){
            console.log(error);
            res.end("error");
         }else{
            console.log("Message sent: " + response.message);
            res.end("sent");
         }
      });
})

app.listen(3000,()=>{
   console.log("server started on port 3000");
})