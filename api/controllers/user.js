const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');
const md5 = require('md5');
const User = require('../models/user');

module.exports.signup = (req, res, next) => {
    User.find({ email: req.body.email })
        .exec()
        .then(u => {
            if (u.length >= 1) {
                return res.status(409).json({
                    message: "Email already exists"
                })
            } else {
                const user = new User({
                    _id: new mongoose.Types.ObjectId(),
                    name: req.body.name,
                    email: req.body.email,
                    passwordHash: md5(req.body.password)
                });
                user.save()
                    .then(result => {
                        console.log(result);
                        res.status(201).json({
                            message: "User created"
                        })
                    })
                    .catch(err => {
                        console.log(err);
                        res.status(500).json({
                            error: err
                        })
                    })
            }
        })
        .catch(err => {
            res.status(500).json({
                error: err
            })
        })
}

module.exports.login = (req, res, next) => {
    User.find({email: req.body.email, passwordHash: md5(req.body.password)})
        .exec()
        .then(result => {
            if (!result) {
                return res.status(401).json({
                    message: "Auth failed"
                })
            } else {
                const token = jwt.sign(
                    {
                        name: result[0].name,
                        email: result[0].email,
                        userId: result[0]._id
                    },
                    process.env.JWT_KEY,
                    {
                        expiresIn: "1day"
                    }
                )
                res.status(200).json({
                    message: "Auth successful",
                    token: token
                })
                User.updateOne({_id: result[0]._id}, {lastLogin: Date.now()})
                    .exec()
                    .then(result => {

                    })
                    .catch(err => {
                        console.log(err);
                        res.status(500).json({
                            error: err
                        })
                    })
            }
        })
        .catch(err => {
            res.status(500).json({
                error: err
            })
        });
}
