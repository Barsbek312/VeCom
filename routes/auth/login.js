const express = require("express");
const cookie = require("cookie");
const fetch = (...args) => import("node-fetch").then(({default: fetch}) => fetch(...args))

const router = express.Router();
router.post('/api/users/login', async (req, res) => {
    const {username, password } = req.body;

    const body = JSON.stringify({username, password});

    try{
        const apiRes = await fetch("http://127.0.0.1:8000/api/token/", {
            method: "POST",
            headers: {
                Accept: "application/json",
                "Content-Type": "application/json",
            },
            body
        })

        const data = await apiRes.json();

        if(apiRes.status === 200) {
            const cookies = [
                cookie.serialize('access', data.access, {
                  httpOnly: true,
                  maxAge: 60 * 30,
                  sameSite: "strict",
                  secure: true,
                  path: "/"
                }),
                cookie.serialize('refresh', data.refresh, {
                  httpOnly: true,
                  maxAge: 60 * 60 * 24,
                  sameSite: "strict",
                  secure: true,
                  path: "/"
                })
              ];
          
              res.setHeader("Set-Cookie", cookies);
            return res.status(200).json({success: "Logged in successfully"})
        } else{ 
            return res.status(apiRes.status).json(data)
        }
    } catch(err) {
        return res.status(500).json({
            error: "Something went wrong when logging in"
        })
    }
})

module.exports = router;
