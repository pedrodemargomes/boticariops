var express = require('express');
var router = express.Router();
const axios = require('axios')
const config = require('../config');

const auth = require('../middleware/auth');
const Purchase = require('../models/purchase');
const log = require('../log');

// Create purchase
router.post('/', function(req, res, next) {
  const {code, value, date, cpf} = req.body;
  
  let purchase = new Purchase({
    'code': code,
    'value': value,
    'date': date,
    'cpf': cpf
  });

  purchase.save()
    .then(doc => {
      let purchase = doc.toObject();
      
      log.debug("CREATE PURCHASE SUCCESS "+JSON.stringify(purchase));

      delete purchase['_id'];
      delete purchase['__v'];
      delete purchase['createdAt'];
      delete purchase['updatedAt'];
      return res.json(purchase);
    })
    .catch(err => {
      log.debug("CREATE PURCHASE ERROR "+JSON.stringify(err));
      return res.status(400).json(err);
    });
});

// Get purchases
router.get('/', auth, async (req, res, next) => {
  purchases = await Purchase.find({cpf: req.user.cpf});
  purchases = purchases.map(purchase => {
    newpurchase = purchase.toObject();
    if(newpurchase.value > 1500)
      newpurchase.cashbackpercentage = 20;
    else if(newpurchase.value >= 1000)
      newpurchase.cashbackpercentage = 15;
    else
      newpurchase.cashbackpercentage = 10;
    newpurchase.cashbackvalue = newpurchase.value*(newpurchase.cashbackpercentage/100);
    delete newpurchase['_id'];
    delete newpurchase['__v'];
    delete newpurchase['createdAt'];
    delete newpurchase['updatedAt'];
    return newpurchase;
  });
  log.debug("GET PURCHASE SUCCESS "+JSON.stringify(purchases));
  res.json({purchases});
});

// Get cashback value
router.get('/cashback', auth, async (req, res, next) => {
  let data = await axios.get(config.cashbackcurl, {
    params: {
      cpf: req.user.cpf
    }
  });
  log.debug("GET CASHBACK VALUE SUCCESS "+JSON.stringify(data.data.body));
  res.json(data.data.body);
});


module.exports = router;
