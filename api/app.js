const express = require('express');
const JSON_DATA_URL = 'https://automation.bigdaddyunlimited.com/tracking_data.json';
const fetch = require('node-fetch');
const app = express();
const { mongoose } = require('./db/mongoose');

const PORT = process.env.PORT || 5000;

// Load in tracking model
const { Tracking } = require('./db/models/trackings');

app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader(
    'Access-Control-Allow-Headers',
    'Origin, X-Requested-With, Content-Type, Accept, Authorization'
    );
  res.setHeader(
    'Access-Control-Allow-Methods',
    'GET, POST, PUT, PATCH, DELETE, OPTIONS'
    );
    next();
  });

app.get('/', (req, res) => {
  // retrieve saved data
  Tracking.find({}).then((trackings) => {
    res.send(trackings);
  });
});

app.post('/', (req, res) => {
  // retrieve JSON data and add to database
  let settings = { method: "Get" };

  fetch(JSON_DATA_URL, settings)
    .then(response => response.json())
    .then((json) => {
      json = JSON.stringify(json);
      json = JSON.parse(json);
      json.forEach(tracking => {
        const newTracking = new Tracking({
          ship_date: tracking.ship_date,
          tracking_number: tracking.tracking_number,
          shipping_carrier: tracking.shipping_carrier,
          shipping_method: tracking.shipping_method,
          tracking_url: tracking.tracking_url,
          timeStamp: Date.now()
        });
        newTracking.save().then(() => {
          console.log('Tracking added');
        })
        .catch(error => {
          console.log('Error', error);
        });
      });
      return res.end();
  });
});

app.listen(PORT, () => {
  console.log(`Server is listening on port ${PORT}`);
});
