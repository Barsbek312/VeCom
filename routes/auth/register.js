const express = require('express');
const fetch = (...args) => import("node-fetch").then(({ default: fetch }) => fetch(...args));

const router = express.Router();

router.post("/%5Eauth/users", async (req, res) => {
    
    const user = JSON.stringify(req.body);

    try {

        const apiRes1Promise = await fetch(`http://127.0.0.1:8000/%5Eauth/users/`, {
            method: "POST",
            headers: {
                Accept: 'application/json',
                'Content-Type': "application/json"
            },
            body: user,
        });

        const dataUser = await apiRes1Promise.json();

        if (!dataUser.isOrg) {
            return res.status(apiRes1Promise.status).json(dataUser);
        } else if(user.isOrg && (apiRes1Promise.status && apiRes1Promise.status !== 201)) {
            return res.status(apiRes1Promise.status).json(dataUser);
        }

        const orgData = JSON.stringify({ 
            user: `${dataUser.url}`,    
            first_name: `${dataUser.first_name}`,
        });

        const apiRes2Promise = await fetch(`http://127.0.0.1:8000/organizations/`, {
            method: "POST",
            headers: {
                Accept: 'application/json',
                'Content-Type': "application/json"
            },
            body: orgData,
        });

        const dataStatus = await apiRes2Promise.json();


        return res.status(apiRes2Promise.status).json(dataStatus);
    } catch (err) {
        return res.status(500).json({
            error: "Something went wrong when registering an account"
        });
    }
});

module.exports = router;
