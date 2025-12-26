let mongoose = require("mongoose"),
    express = require("express"),
    router = express.Router();
// ClientsAll Model
let smsSchema = require('../Models/Sms.js');
let leaveMail = require('../Utils/leaveMail.js')
// CREATE SMS
router.route("/create-sms").post(async (req, res, next) => {
    await smsSchema
        .create(req.body)
        .then((result) => {
            res.json({
                data: result,
                message: "Sms Created successfully!",
                status: 200,
            });
        })
        .catch((err) => {
            return next(err);
        });
});
router.route("/").get(async (req, res, next) => {
    await smsSchema
        .find()
        .sort({ _id: -1 })
        .then((result) => {
            res.json({
                data: result,
                message: "All sms successfully fetched.",
                status: 200,
            });
        })
        .catch((err) => {
            return next(err);
        });
});
// Get Single sms
router.route("/get-sms/:id").get(async (req, res, next) => {
    await smsSchema
        .findById(req.params.id)
        .then((result) => {
            res.json({
                data: result,
                message: "Data successfully fetched.",
                status: 200,
            });
        })
        .catch((err) => {
            return next(err);
        });
});

router.route("/delete-sms/:id").delete(async (req, res, next) => {
    await smsSchema
        .findByIdAndDelete(req.params.id)
        .then((result) => {
            res.json({
                data: result,
                msg: "Sms Successfully Deleted.",
                status: 200,
            });
        })
        .catch((err) => {
            return next(err);
        });
});
// Update sms
router.route("/update-sms/:id").put(async (req, res, next) => {
    await smsSchema
        .findByIdAndUpdate(req.params.id, {
            $set: req.body,
        })
        .then((result) => {
            console.log(result);
            res.json({
                data: result,
                msg: "Data successfully updated.",
            });
        })
        .catch((err) => {
            console.log(err);
        });
});
module.exports = router;