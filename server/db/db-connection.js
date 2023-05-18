const mongoose = require('mongoose');

const url = 'mongodb://localhost:27017/admin';
// const {dataAffiliateStat}  = require('../data/index');
// const AffiliateStat = require('../models/AffiliateStat');
// const OverallStat = require('../models/OverallStat');

const db=mongoose.connect(url,{useNewUrlParser:true,useUnifiedTopology:true})
.then(async ()=>{
    console.log('db connected')
    // await AffiliateStat.insertMany(dataAffiliateStat)
    // await ProductStat.insertMany(dataProductStat)
})
.catch((err)=>{
    console.log(err)
})

module.exports = db