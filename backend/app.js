const express = require("express")
const mongoose= require("mongoose")
const MONGO_CONNECTION ="mongodb://127.0.0.1:27017/alumni-council";  //mongodb+srv://ashik:ashik%40123@alumni.b3huuxo.mongodb.net/alumni-council?retryWrites=true&w=majority
const port = process.env.PORT || 5000;
const route = require ("./router/router")
const cors = require("cors")
const app = express()
app.use(express.json())

app.use(cors({ origin:'http://localhost:3000'}));

mongoose.connect(MONGO_CONNECTION)
.then(()=>{
    console.log("Connected MongoDB Successfully !!")
}).catch(err=>{
    console.log(err.message);
})

app.use("/",route)



app.listen(port, () => {
    console.log(`App is listening on port ${port}`);
  });

