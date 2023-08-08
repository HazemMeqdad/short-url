const Short = require('../models/short');

module.exports.redirectRoute = (req, res, next) => {
    Short.find({code: req.params.codeId})
        .exec()
        .then(result => {
            if (result.length < 1) {
                return res.status(404).json({
                    message: "No short urls found"
                })
            } else {
                res.status(301).redirect(result[0].url);
                Short.updateOne({code: req.params.codeId}, {$inc: {clicks: 1}, lastClicked: Date.now()})
                    .exec();
            }
        })
        .catch(err => {
            res.status(500).json({
                error: err
            })
        })
}
