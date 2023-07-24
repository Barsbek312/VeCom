const express = require("express");
const fetch = (...args) => import("node-fetch").then(({ default: fetch }) => fetch(...args))

const router = express.Router();

router.post('/%5Eauth/users/activation', async (req, res) => {
    const { uid, token } = req.body;

    const body = JSON.stringify({
        uid,
        token
    })

    try {
        const apiRes = await fetch("http://127.0.0.1:8000/%5Eauth/users/activation/", {
            method: "POST",
            headers: {
                Accept: 'application/json',
                'Content-Type': "application/json"
            },
            body,
        });

        if (apiRes.status === 204) {
            return res.status(200).json({ success: "Account activated successfully" });
        } else {
            const data = await apiRes.json();
            return res.status(apiRes.status).json(data);
        }
    } catch (err) {
        return res.status(500).json({
            error: "Something went wrong when verifying account"
        });
    }

})

module.exports = router