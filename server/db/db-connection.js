const mongoose = require('mongoose');

// const url = 'mongodb://localhost:27017/admin';
const url = 'mongodb+srv://ankitpatel:Ankit123@cluster0.vivyftg.mongodb.net/admin-dashboard';

const db=mongoose.connect(url,{useNewUrlParser:true,useUnifiedTopology:true})
.then(async ()=>{
    console.log('db connected')
})
.catch((err)=>{
    console.log(err)
})

module.exports = db