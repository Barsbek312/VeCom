const express = require("express");
const fetch = (...args) => import("node-fetch").then(({default: fetch}) => fetch(...args));

const router = express.Router();

router.get("/getEventsOfOrg/:id", async (req, res) => {
    const id = req.params.id;

    try {
        const apiRes = await fetch(`http://127.0.0.1:8000/organizations/${id}`, {
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
            error: "Something went wrong when trying to get events of organization"
        })
    }
})

module.exports = router;