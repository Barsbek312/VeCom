const express = require('express');
const fetch = (...args) => import("node-fetch").then(({default: fetch}) => fetch(...args))

const router = express.Router();

router.post("/%5Eauth/users", async (req, res) => {
    
    const {email, username, password, first_name, second_name, hours, certificated, phoneNumber, birthday, region, city} = req.body;
    const {isVol} = req.body;

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
        let apiRes;
        if(isVol) {
            apiRes = await fetch(`http://127.0.0.1:8000/%5Eauth/users/`, {
                method: "POST",
                headers: {
                    Accept: 'application/json',
                    'Content-Type': "application/json"
                },
                    body,
            })
            // const apiRes = await fetch(`http://127.0.0.1:8000/%5Eauth/users/`, {
            //     method: "POST",
            //     headers: {
            //         Accept: 'application/json',
            //         'Content-Type': "application/json"
            //     },
            //         body,
            // })
        } else {
            apiRes = await fetch(`http://127.0.0.1:8000/%5Eauth/users/`, {
                method: "POST",
                headers: {
                    Accept: 'application/json',
                    'Content-Type': "application/json"
                },
                    body,
            })
            // const apiRes = await fetch(`http://127.0.0.1:8000/%5Eauth/users/`, {
            //     method: "POST",
            //     headers: {
            //         Accept: 'application/json',
            //         'Content-Type': "application/json"
            //     },
            //         body,
            // })
        }

        const dataUser = await apiRes.json();
        // const dataStatus = await ...json();

        const arr = {
            ans1: res.status(apiRes.status).json(dataUser),
            // ans2: res.status(...status).json(dataStatus)
        }

        return arr;

    } catch(err) {
        return res.status(500).json({
            error: "Something went wrong when registering account"
        })
    }
})

module.exports = router;

