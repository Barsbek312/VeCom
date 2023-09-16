const express = require("express");
const fetch = (...args) => import("node-fetch").then(({default: fetch}) => fetch(...args));

const router = express.Router();

router.get("/getClickedEvent/:id", async (req, res) => {
    const id = req.params.id;
    const { access } = req.cookies;

    try {
        const apiRes = await fetch(`http://127.0.0.1:8000/events/${id}`, {
            method: "GET",
            headers: {
                'Accept': "application/json",
                'Content-Type': "application/json",
                Authorization: `Bearer ${access}`
            }
        })

        const data = await apiRes.json();

        return res.status(apiRes.status).json(data);

    } catch (err) {
        return res.status(500).json({
            error: "something went wrong when trying to get event"
        })
    }
})

module.exports = router;