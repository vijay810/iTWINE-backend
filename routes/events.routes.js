const mongoose = require("mongoose"),
    express = require("express"),
    router = express.Router();

// Events Model
const eventsSchema = require('../Models/Events');

router.route("/create-events").post(async (req, res, next) => {
    await eventsSchema
        .create(req.body)
        .then((result) => {
            res.json({
                data: result,
                message: "Data successfully added!",
                status: 200,
            });
        })
        .catch((err) => {
            return next(err);
        });
});
router.route("/").get(async (req, res, next) => {
    await eventsSchema
        .find()
        .sort({ _id: -1 })
        .then((result) => {
            res.json({
                data: result,
                message: "All items successfully fetched.",
                status: 200,
            });
        })
        .catch((err) => {
            return next(err);
        });
});
router.route("/update-event/:id").put(async (req, res, next) => {
    await eventsSchema
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