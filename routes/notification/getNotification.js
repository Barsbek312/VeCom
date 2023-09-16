const express = require('express');
const fetch = (...args) => import("node-fetch").then(({default: fetch}) => fetch(...args));

const router = express.Router();

router.get("/:id", async (req, res) => {
    const id = req.params.id;
    const {access} = req.cookies;

    try {
        const apiRes = await fetch(`/${id}`, {
            method: "GET",
            headers: {
                Accept: "application/json",
                'Content-Type': "application/json",
            }
        })

        const data = await apiRes.json();

        return res.status(apiRes.status).json(data);
    } catch(err) {
        return res.status(500).json({
            error: "Something went wrong when trying to get the notification"
        })
    }
})

// Позже, подключи в index.js

module.exports = router