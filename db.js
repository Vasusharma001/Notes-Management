const mongoose=require('mongoose')
const mongoURI=process.env.mongoURI;
mongoose.set('strictQuery', true);
const connectToMongo=async ()=>{
    mongoose.connect(mongoURI,()=>{
        console.log("connected to mongo! successfully!");
    });
}
module.exports = connectToMongo;