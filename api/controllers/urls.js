const Short = require('../models/short');


module.exports.getAll = (req, res, next) => {
    Short.find({code: req.params.codeId})
        .exec()
        .then(result => {
            if (result.length < 1) {
                return res.status(404).json({
                    message: "No short urls found"
                })
            } else {
                res.status(200).json({
                    message: "Short urls found",
                    result: result[0]
                })
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
