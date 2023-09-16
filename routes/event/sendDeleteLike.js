const express = require('express');
const fetch = (...args) => import("node-fetch").then(({default: fetch}) => fetch(...args));
const router = express.Router();

router.delete("/sendDeleteLike/:id", async (req, res) => {
    const id = req.params.id;
    const { access } = req.cookies;
    try {
       const apiRes = await fetch(`http://127.0.0.1:8000/liked_event/${id}/`, {
            method: "DELETE",
            headers: {
                Accept: "application/json",
                'Content-Type': "application/json",
                Authorization: `Bearer ${access}`
            }
       })
        if(apiRes.status === 204) return res.status(apiRes.status).json();
        const data = await apiRes.json();
        return res.status(apiRes.status).json(data);

    } catch (err) {
        return res.status(500).json({
            error: "Something went wrong when trying to delete like",
        })
    }
})

module.exports = router;