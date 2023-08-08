const mongoose = require("mongoose");

const Short = require('../models/short');
const User = require('../models/user');

// https://tecadmin.net/generate-random-string-in-javascript/
function genRandonString(length) {
   var chars = 'abcdefghijklmnopqrstuvwxyz';
   var charLength = chars.length;
   var result = '';
   for ( var i = 0; i < length; i++ ) {
      result += chars.charAt(Math.floor(Math.random() * charLength));
   }
   return result;
}

module.exports.shorten = (req, res, next) => {
    code = req.body.code || genRandonString(6);
    Short.find({ code: code })
        .then(result => {
            if (result.length >= 1) {
                return res.status(409).json({
                    message: "Code already exists"
                })
            } else {
                const short = new Short({
                    _id: new mongoose.Types.ObjectId(),
                    url: req.body.url,
                    code: code,
                    owner: req.userData.userId
                });
                short.save()
                    .then(result => {
                        res.status(201).json({
                            message: "Shortened URL created",
                            short: short
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
            console.log(err);
            res.status(500).json({
                error: err
            })
        })
}
