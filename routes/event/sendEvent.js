// const express = require('express');
// const formidable = require('formidable');
// const axios = require('axios');
// const FormData = require('form-data');

// const router = express.Router();

// router.post("/sendEvent", async (req, res) => {
//   const { access } = req.cookies;

//   const form = new formidable.IncomingForm();
  
//   form.parse(req, async (err, fields, files) => {
//     if (err) {
//       return res.status(500).json({
//         error: "Error parsing form data"
//       });
//     }

//     // Use 'fields' to access text fields and 'files' for uploaded files

//     // const formData = new FormData();
//     // Append fields and files to formData

//     try {
//       const apiRes = await axios.post("http://127.0.0.1:8000/events/", {fields, files}, {
//         headers: {
//           Authorization: `Bearer ${access}`,
//           'Content-Type': `multipart/form-data;`
//         }
//       });

//       console.log(apiRes);
//       return res.status(apiRes.status).json(apiRes.data);
//     } catch (err) {
//       return res.status(500).json({
//         error: "Something went wrong when trying to send the event",
//         details: err.message
//       });
//     }
//   });
// });

// module.exports = router;


const express = require('express');
const formidable = require('formidable');
const axios = require('axios');

const router = express.Router();

router.post('/sendEvent', async (req, res) => {
  const { access } = req.cookies;

  const form = new formidable.IncomingForm();
  
  form.parse(req, async (err, fields, files) => {
    if (err) {
      return res.status(500).json({
        error: 'Error parsing form data'
      });
    }

    try {
      // Create an Axios request configuration
      const axiosConfig = {
        method: 'post',
        url: 'http://127.0.0.1:8000/events/',
        headers: {
          Authorization: `Bearer ${access}`,
          'Content-Type': 'application/json' // Important for file uploads
        },
        data: JSON.stringify(fields) // Send the parsed form fields
      };
      // Make the Axios POST request
      const apiRes = await axios(axiosConfig);

      return res.status(apiRes.status).json(apiRes.data);
    } catch (err) {
      return res.status(500).json({
        error: 'Something went wrong when trying to send the event',
        details: err.message
      });
    }
  });
});

module.exports = router;
