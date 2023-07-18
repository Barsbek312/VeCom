const express = require('express');
const fetch = (...args) => import("node-fetch").then(({default: fetch}) => fetch(...args))

const router = express.Router();

router.post("/%5Eauth/users", async (req, res) => {
    
    const {email, username, password, first_name, second_name, hours, certificated, phoneNumber, birthday, region, city} = req.body;

    const body = JSON.stringify({
            username,
            first_name,
            second_name,
            hours, 
            certificated,  
            phoneNumber, 
            email,
            birthday,
            region, 
            city, 
            password, 
            })

    try{
        const apiRes = await fetch(`http://127.0.0.1:8000/%5Eauth/users/`, {
            method: "POST",
            headers: {
                Accept: 'application/json',
                'Content-Type': "application/json"
            },
            body,
        })

        const data = await apiRes.json();

        return res.status(apiRes.status).json(data);
    } catch(err) {
        return res.status(500).json({
            error: "Something went wrong when registering account"
        })
    }
})

module.exports = router;

