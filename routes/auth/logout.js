const express = require("express");
const cookie = require("cookie");

const router = express.Router();

router.get("/api/users/logout", (req, res) => {
    res.setHeader("Set-Cookie", [
        cookie.serialize('access', '', {
            httpOnly: true,
            expires: new Date(0),
            path: "/",
            sameSite: "strict",
            secure: true,
        }),
        cookie.serialize('refresh', '', {
            httpOnly: true,
            expires: new Date(0),
            path: "/",
            sameSite: "strict",
            secure: true,
        })
    ])

    return res.status(200).json({success: "Logged out succesfully"});
})

module.exports = router