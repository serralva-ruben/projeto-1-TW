const User = require('../models/user.model');
const bcrypt =  require("bcrypt");
const jwt =  require("jsonwebtoken");
const dotenv = require("dotenv");

dotenv.config();


const register = async (req, res, next) => {
  bcrypt.hash(req.body.password, 10, function(err, hashedPass){
    if(err){
      res.json({
        error: err
      })
    }
    let user = new User({
      email: req.body.email,
      password: hashedPass,
    })
    user.save().then(user=>{
      res.json({
        message: 'User added successfully!'
      })
    })
    .catch(error => {
      res.json({
        message: 'An error occured!',
      })
    })
  })
};

const login = async (req, res, next) => {
  let email = req.body.email;
  let password = req.body.password;

  User.findOne({$or: [{email:email},{name:email}]}).then(user => {
    console.log(user)
    if(user){
      bcrypt.compare(password, user.password, function(err, result){
        if(err) {res.json({error: err})}
        if(result){
          let token = jwt.sign({name: user.name}, 'private key :) I hope no one knows me')
          res.json({
            message: 'Login Successful!',
            token: token,
          })
        }
        else{res.json({message: 'Password not matched!'})}
      })
    }else{res.json({message: 'No user found!'})}
  })
};

module.exports = {
  register,
  login,
}