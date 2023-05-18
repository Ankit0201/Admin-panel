
const ProductsModel = require('../models/Product');
const TransactionModel = require('../models/Transactions');
const UserModel = require('../models/User');
const getCountryIso3 = require('country-iso-2-to-3')

const getProducts = async (req, res) => {
  try {
    const products = await ProductsModel.aggregate([
      {
        $lookup: {
          from: "productstats",
          localField: '_id',
          foreignField: 'productId',
          as: "stat"
        }
      }
    ]);
    res.status(200).json({ products })

  } catch (error) {
    res.status(404).json({ message: error.message })
  }
}

const getCustomers = async (req, res) => {
  try {
    const customers = await UserModel.find({ role: "user" }).select("-password")
    res.status(200).json({ customers })

  } catch (error) {
    res.status(404).json({ message: error.message })
  }
}

const getTransactions = async (req, res) => {
  try {
    const { page = 1, pageSize = 20, sort = null, search = "" } = req.query;

    const generateSort = () => {
      const sortParsed = JSON.parse(sort);
      const sortFormatted = {
        [sortParsed.field]: sortParsed.field = "asc" ? 1 : -1
      }
      return sortFormatted
    };

    const sortFormatted = Boolean(sort) ? generateSort() : {};

    let limit = pageSize;
    let skip = page * pageSize
    const transactions = await TransactionModel.find({
      $or: [
        { cost: { $regex: new RegExp(search, "i") } },
        { userId: { $regex: new RegExp(search, "i") } },
      ]
    }).sort(sortFormatted).skip(skip).limit(limit)

    const total = await TransactionModel.countDocuments({
      $or: [
        { cost: { $regex: new RegExp(search, "i") } },
        { userId: { $regex: new RegExp(search, "i") } },
      ]
    })

    res.status(200).json({ transactions, total })

  } catch (error) {
    res.status(404).json({ message: error.message })
  }
}

const getGeography = async (req, res) => {
  try {
    const users = await UserModel.aggregate([{
      $group:{
        "_id":"$country",
        "count":{
          "$sum":1
        }
      }
    }]);

    const mappedLocations = users.map(({_id,count})=>{
      return {id:getCountryIso3(_id),value:count}
    })
    res.status(200).json({ mappedLocations })

  } catch (error) {
    res.status(404).json({ message: error.message })
  }
}


module.exports = {
  getProducts,
  getCustomers,
  getTransactions,
  getGeography
}