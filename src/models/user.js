const mongoose = require('mongoose');
const Schema = mongoose.Schema;

var validateEmail = function (email) {
  var re = /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/;
  return re.test(email)
};

const userSchema = new Schema({
  name: {
    type: 'string',
    required: true,
  },
  email: {
    type: 'string',
    required: true,
    unique: true,
    lowercase: true,
    validate: [validateEmail, 'Invalid email format!'],
  },
  encrypted_password: {
    type: 'string',
    required: true,
  },
  admin: {
    type: 'number'
  },
},
  {
    versionKey: false,
    //timestamps: true,
  }
)

const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

class User extends mongoose.model('User', userSchema) {
  static register({ name, email, password }) {
    return new Promise((resolve, reject) => {
      let encrypted_password = bcrypt.hashSync(password, 10)
      let admin = 0;
      this.create({
        name, email, encrypted_password, admin,
      })
        .then(data => {
          let token = jwt.sign({
            _id: data._id, admin: data.admin
          }, process.env.SECRET_KEY)
          resolve({
            _id: data._id,
            name: data.name,
            email: data.email,
            admn: data.admin,
            token
          })
        })
        .catch(err => {
          reject(err)
        })
    })
  }

  static admin({ name, email, password }) {
    return new Promise((resolve, reject) => {
      let encrypted_password = bcrypt.hashSync(password, 10)
      let admin = 1;
      this.create({
        name, email, encrypted_password, admin,
      })
        .then(data => {
          let token = jwt.sign({
            _id: data._id, admin: data.admin
          }, process.env.SECRET_KEY)
          resolve({
            _id: data._id,
            name: data.name,
            email: data.email,
            admin: data.admin,
            token
          })
        })
        .catch(err => {
          reject(err)
        })
    })
  }

  static login({ email, password }) {
    return new Promise((resolve, reject) => {
      this.findOne({ email })
        .then(data => {
          if (!data) return reject("User does not exist!")

          let comparedPass = bcrypt.compareSync(password, data.encrypted_password)
          if (!comparedPass) return reject("Incorrect password!")

          let token = jwt.sign({ _id: data._id, admin: data.admin }, process.env.SECRET_KEY)
          resolve({
            _id: data._id,
            name: data.name,
            email: data.email,
            admin: data.admin,
            token
          })
        })

        .catch(err => {
          reject(err)
        })
    })
  }
}

module.exports = User;