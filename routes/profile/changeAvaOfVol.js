const express = require("express");
const fetch = (...args) => import("node-fetch").then(({default: fetch}) => fetch(...args));
const axios = require("axios");
const multer = require("multer");
const upload = multer({ dest: 'uploads/' });
const FormData = require('form-data');
const fs = require('fs');

const router = express.Router();


router.put("/changeAvaOfVol/:id", upload.single('avatar'), async (req, res) => {
    const id = req.params.id;
    const {access} = req.cookies;

    const formData = new FormData();
    formData.append('avatar', fs.createReadStream(req.file.path));

    try {
        const apiRes = await axios.put(`http://127.0.0.1:8000/users/${id}/`, formData, {
            headers: {
                ...formData.getHeaders(),
                Authorization: `Bearer ${access}`,
            }
        });

        console.log(apiRes)

        return res.status(apiRes.status).json(apiRes.data);
    } catch(err) {
        console.log(err.message);
        return res.status(500).json({
            error: "Something went wrong when trying to change or add avatar",
        })
    }
})

module.exports = router;