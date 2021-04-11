const express = require('express')
const ejs = require('ejs');
const mongoose = require('mongoose');
const app = express();

app.use(express.urlencoded({extended: true}));
app.set('view engine','ejs');
app.use(express.static('public'));

mongoose.connect('mongodb://localhost:27017/ACA', {useNewUrlParser: true, useUnifiedTopology: true}).then(()=>{
   console.log("database connected successfully");
}).catch(err => {
   console.log(err);
});

const userSchema = new mongoose.Schema({
   username: String,
   email : String,
   password : String
})

const complaintSchema = new mongoose.Schema({
   lodged_by:String,
   lodged_against:String,
   description : String,
   evidence : String
})

const User = mongoose.model('User',userSchema);
const Complaint = mongoose.model('Complaint',complaintSchema);

app.get('/',(req,res)=>{
   res.render('home');
})

app.get('/register',(req,res)=>{
   res.sendFile(__dirname + '/index.html');
})

app.get('/lodge', (req,res)=>{
   res.render('lodge')
})


// POST ROUTES
app.post('/sign-in',(req,res)=>{
   console.log(req.body);
   User.findOne({email:req.body.email},(err,foundItem)=>{
      if(foundItem){
         console.log(foundItem);
         if(foundItem.password===req.body.pwd){
            res.render('home');
         }
         else{
            console.log("password did not match");
         }
      }
      else{
         console.log("no user exist with provided email");
      }
   })
})

app.post('/sign-up',(req,res)=>{
   const user = new User({
      username : req.body.username,
      email : req.body.email,
      password : req.body.pwd
   })

   User.findOne({email: req.body.email}, (err,foundItem)=>{
      if(err){
         console.log(err);
      }
      else{
         if(!foundItem){
            if(req.body.pwd===req.body.re_pwd){
               console.log(user);
               user.save().then(() => console.log('new user added'));
            }
            else{
               console.log("password does not match");
            }
         }
         else{
            console.log("foundItem exist",foundItem);
         }
      }
   })
})

app.post('/lodge',(req,res)=>{
   console.log(req.body);
   const complaint = new Complaint({
      lodged_by : req.body.lodged_by,
      lodged_against : req.body.lodged_against,
      description : req.body.description,
      evidence : req.body.evidence
   })

   complaint.save().then(()=>{
      console.log("complaint registered");
   }).catch(err => {
      console.log(err);
   })

   res.redirect('/')
})

app.listen(3000,()=>{
   console.log("server started on port 3000");
})
