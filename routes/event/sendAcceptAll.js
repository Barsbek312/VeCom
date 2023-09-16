const express = require("express");
const axios = require("axios");

const router = express.Router();

router.post("/sendAccepAll", async (req, res) => {

    const {access} = req.cookies;
    const {event_pk, date} = req.body;

    const body = JSON.stringify({event_pk, date});

    console.log(body);

    try {
        const apiRes = await axios.post("http://127.0.0.1:8000/accept_all_waiting/", body, {
            headers: {
                Accept: "application/json",
                'Content-Type': "application/json",
                Authorization: `Bearer ${access}`,
            }
        })

        console.log(apiRes.data)

        return res.status(apiRes.status).json(apiRes.data);
    } catch(err) {
        return res.status(500).json({
            error: "Something went wrong when trying to accept all participatns"
        })
    }
})

module.exports = router;