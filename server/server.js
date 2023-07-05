// server
// --------------------------------------------------------
const express = require('express');
const app = express();


app.get('/api', (req, res) => {
    res.json({"users": ["kousha", "am"]})
});


app.listen(4000, () => {
    console.log('Server is running on port 4000')
});

