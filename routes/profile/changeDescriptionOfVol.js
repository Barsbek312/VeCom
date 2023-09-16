const express = require("express");
const fetch = (...args) => import("node-fetch").then(({default: fetch}) => fetch(...args));
const axios = require("axios")

const router = express.Router();

router.put("/changeDescriptionOfVol/:id", async (req, res) => {
    const id = req.params.id;
    const { access } = req.cookies;
    const { description } = req.body;

    try {
        const apiRes = await fetch(`http://127.0.0.1:8000/users/${id}/`, {
            method: 'PUT',
            headers: {
                'Authorization': `Bearer ${access}`,
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({description}), 
        });

        const data = await apiRes.json();

        return res.status(apiRes.status).json(data);
    } catch (err) {
        return res.status(500).json({
            error: "Something went wrong when trying to change description",
            details: err.message
        });
    }
});

module.exports = router;
