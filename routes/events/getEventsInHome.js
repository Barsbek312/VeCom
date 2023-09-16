const express = require("express");
const fetch = (...args) => import("node-fetch").then(({default: fetch}) => fetch(...args));

const router = express.Router();

router.get("/getEventsInHome", async (req, res) => {
    // const { pageSize, currentEvent } = req.body;

    const {access} = req.cookies;
    
    if(access) {
        headers = {
            Accept: "application/json",
            'Content-Type': "application/json",
            Authorization: `Bearer ${access}`,
        }
    } else {
        headers = {
            Accept: "application/json",
            'Content-Type': "application/json",
        }
    }

    try{
        const apiRes = await fetch("http://127.0.0.1:8000/events/?page=1", {
            method: "GET",
            headers: headers
        })

        const data = await apiRes.json();

        return res.status(apiRes.status).json(data);

    } catch(err) {
        console.log(err);
        return res.status(500).json({
            error: "Something went wrong when trying to get events"
        })
    }
})


module.exports = router;
