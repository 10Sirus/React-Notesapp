const mongoose= require("mongoose");
const { options } = require('./routes/auth');

const mongoURI= "mongodb://127.0.0.1/bruv"

const connectToMongo = ()=>{
  
const mongoose = require("mongoose");
mongoose.set("strictQuery", true);
mongoose
  .connect(mongoURI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    
    console.log("Connected!");
  })
  .catch((err) => {
    console.log("oh no error");
    console.log(err);
  });
}

module.exports= connectToMongo;