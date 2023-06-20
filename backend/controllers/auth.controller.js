const User = require('../models/user.model');
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");

dotenv.config();


const register = async (req, res, next) => {
  try {
    bcrypt.hash(req.body.password, 10, function (err, hashedPass) {
      if (err) {
        res.json({
          error: err
        });
      }
      let user = new User({
        username: req.body.username,
        password: hashedPass,
        email: req.body.email,
      });
      user.save()
        .then(user => {
          res.json({
            message: 'User added successfully!'
          });
        })
        .catch(error => {
          res.json({
            message: 'An error occurred during user creation!'
          });
        });
    });
  } catch (error) {
    res.json({
      message: 'An error occurred!'
    });
  }
};


const login = async (req, res, next) => {
  let username = req.body.input;
  let password = req.body.password;

  User.findOne({ $or: [{ username: username }, { email: username }] }).then(user => {
    if (user) {
      bcrypt.compare(password, user.password, function (err, result) {
        if (err) { 
          return res.status(500).json({ error: err }) 
        }
        if (result) {
          let token = jwt.sign({ name: user.name }, 'private key :) I hope no one knows me')
          return res.json({
            message: 'Login Successful!',
            token: token,
          })
        }
        else { 
          return res.status(401).json({ message: 'Password not matched!' }) 
        }
      })
    } else { 
      return res.status(404).json({ message: 'No user found!' }) 
    }
  })
};

module.exports = {
  register,
  login,
}