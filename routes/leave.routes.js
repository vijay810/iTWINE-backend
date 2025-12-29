let mongoose = require("mongoose"),
    express = require("express"),
    router = express.Router();
// Leave Model
let leaveSchema = require('../Models/Leave');
let leaveMail = require('../Utils/leaveMail')

const formatDate = (date) => {
    if (!date) return "";
    return new Date(date)
        .toLocaleDateString("en-GB")
        .replace(/\//g, "-"); // dd-mm-yyyy
};


// CREATE Leave
// router.route("/create-leave").post(async (req, res, next) => {
//     await leaveSchema
//         .create(req.body)
//         .then((result) => {
//             res.json({
//                 data: result,
//                 message: "Leave successfully submited!",
//                 status: 200,
//             });
//         })
//         .catch((err) => {
//             return next(err);
//         });
// });

router.route("/create-leave").post(async (req, res, next) => {
    try {
        const result = await leaveSchema.create(req.body);

        // 📧 SEND EMAIL
        if (result.email) {
            await leaveMail({
                to: result.email,
                subject: "Leave Request Submitted",
                html: `
                    <h3>iTWINE - Vijay</h3>
                    <p><b>Dear</b> ${result.fname} ${result.lname},</p>

                    <p>Your leave request has been submitted successfully.</p>

                    <p><b>From Date:</b>  ${formatDate(result.formdate)}</p>
                    <p><b>To Date:</b>  ${formatDate(result.todate)}</p>
                    <p><b>Department:</b> ${result.dep}</p>
                    <p><b>Reason:</b> ${result.reason}</p>

                    <p><b>Status:</b> ${result.status === 1
                        ? "Rejected"
                        : result.status === 2
                            ? "Approved"
                            : "Pending"
                    }</p>
                `
            });
        }

        res.json({
            data: result,
            message: "Leave created successfully & email sent!",
            status: 200,
        });

    } catch (err) {
        return next(err);
    }
});


router.route("/").get(async (req, res, next) => {
    await leaveSchema
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
// Update Leave Status
// router.route("/update-status/:id").put(async (req, res, next) => {
//     const leaveId = req.params.id;
//     const { status } = req.body;

//     try {
//         const updatedLeave = await leaveSchema.findByIdAndUpdate(
//             leaveId,
//             { status: status },
//             { new: true }
//         );

//         if (!updatedLeave) {
//             return res.status(404).json({
//                 message: "Leave not found",
//                 status: 404,
//             });
//         }

//         res.json({
//             data: updatedLeave,
//             message: "Leave status successfully updated",
//             status: 200,
//         });
//     } catch (err) {
//         return next(err);
//     }
// });

router.route("/update-status/:id").put(async (req, res, next) => {
    const leaveId = req.params.id;
    const { status } = req.body;

    try {
        const updatedLeave = await leaveSchema.findByIdAndUpdate(
            leaveId,
            { status },
            { new: true }
        );

        if (!updatedLeave) {
            return res.status(404).json({
                message: "Leave not found",
                status: 404,
            });
        }

        // ✅ MAIL SHOULD NOT BREAK UPDATE
        if (updatedLeave.email) {
            try {
                console.log("📧 Sending mail to:", updatedLeave.email);

                await leaveMail({
                    to: updatedLeave.email,
                    subject: "Leave Status Updated",
                    html: `
                        <h3>iTWINE - Vijay</h3>
                        <p>Dear ${updatedLeave.fname} ${updatedLeave.lname},</p>
                        <p>Your leave status has been updated.</p>
                        <p><b>From Date:</b> ${formatDate(updatedLeave.formdate)}</p>
                    <p><b>To Date:</b> ${formatDate(updatedLeave.todate)}</p>
                    <p><b>Department:</b> ${updatedLeave.dep}</p>
                    <p><b>Reason:</b> ${updatedLeave.reason}</p>
                        <p><b>Status:</b> ${status == 1
                            ? "Rejected"
                            : status == 2
                                ? "Approved"
                                : "Pending"
                        }</p>
                    `
                });

                console.log("✅ Mail sent successfully");
            } catch (mailErr) {
                console.error("❌ Mail error:", mailErr.message);
            }
        } else {
            console.log("⚠️ Email not found in DB");
        }

        res.json({
            data: updatedLeave,
            message: "Leave status updated successfully",
            status: 200,
        });

    } catch (err) {
        return next(err);
    }
});






// I want matching userid data only
// I want matching userid data only
router.route("/user-leaves/:userId").get(async (req, res, next) => {
    const userId = req.params.userId; // Extract userId from the URL
    console.log('User ID received in the request:', userId);

    await leaveSchema
        .find({ userId: userId })  // Use the userId to filter leaves
        .sort({ _id: -1 })
        .then((result) => {
            console.log('Database result:', result);  // Check the result
            res.json({
                data: result,
                message: "User leaves successfully fetched.",
                status: 200,
            });
        })
        .catch((err) => {
            return next(err);
        });
});

module.exports = router;