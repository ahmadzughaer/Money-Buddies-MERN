const express = require('express');
const cors = require('cors');
const app = express();
require("dotenv").config();
require('./config/mongoose.config');


const path = require('path');
const NODE_ENV = process.env.NODE_ENV;
const PORT = process.env.PORT 



app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
require('./routes/user.route')(app);

// deployment 

_dirname=path.resolve()
if(NODE_ENV === 'production') {
app.use(express.static(path.join(_dirname, 'client/build')))
app.get('*', (req,res) => {
    res.sendFile(path.resolve(_dirname, 'client', 'build', 'index.html'))
})
} 

app.listen(PORT, () => console.log(`Listening on port: ${PORT}`));


