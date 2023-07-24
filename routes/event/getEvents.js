// const express = require("express");
// const fetch = (...args) => import("node-fetch").then(({default: fetch}) => {fetch(...args)});

// const router = express.Router();

// router.get("", async (req, res) => {
//     try{
//         const apiRes = await fetch("", {
//             method: "GET",
//             headers: {
//                 Accept: "application/json",
//             }
//         })

//         const data = await apiRes.json();

//         if(apiRes.status === 200) {

//         } else {
//             return res.status(apiRes.status).json(data);
//         }

//     } catch(err) {
//         return res.status(500).json({
//             error: "Something went wrong when trying to get events"
//         })
//     }
// })


// module.exports = router
