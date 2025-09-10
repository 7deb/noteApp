const express = require("express")
require('dotenv').config()

const app = express();



port = process.env.PORT || 4000;


app.listen(port,()=>{
    console.log(`app is running on http://locahost${port}`)
})