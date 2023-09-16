const express = require('express');
const axios = require('axios');

const router = express.Router();

router.put("/sendComplete/:id", async (req, res) => {

    const id = req.params.id;
    const {access} = req.cookies;

    try {
        const apiRes = await axios.put(`http://127.0.0.1:8000/events/${id}/`, { "recruitmentСompleted": true },
        {
            headers: {
                Authorization: `Bearer ${access}`,
                Accept: "application/json",
                'Content-Type': "application/json"
            }
        });

        console.log(apiRes);

        return res.status(apiRes.status).json(apiRes.data);

    } catch (err) {
        return res.status(500).json({
            error: "Something went wrong when trying to complete recruitment",
            details: err.message
        });
    }
});

module.exports = router;
