const express = require("express");
const axios = require('axios');

const router = express.Router();

router.post("/sendLike", async (req, res) => {
    const {user, event} = req.body;
    const {access} = req.cookies;

    const body = JSON.stringify({
        user,
        event
    })

    try {
        const apiRes = await axios.post("http://127.0.0.1:8000/liked_event/", body, {
            headers: {
                Accept: "application/json",
                'Content-Type': "application/json",
                Authorization: `Bearer ${access}`
            }
        })
    
        return res.status(apiRes.status).json(apiRes.data);
        
    } catch(err) {
        return res.status(500).json({
            error: "Something went wrong when trying to send like"
        })
    }
})

module.exports = router