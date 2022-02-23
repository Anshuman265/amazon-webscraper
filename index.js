const express = require('express');
const request = require('request-promise');

const app = express();
const PORT = process.env.PORT || 5000;

const generateScraperUrl = (apiKey) =>
  `http://api.scraperapi.com?api_key=${apiKey}&autoparse=true`;

app.use(express.json());

app.get('/', (req, res) => {
  res.send('Welcome to the Amazon Scarper API');
});

// Get product Details
app.get('/products/:productId', async (req, res) => {
  const { productId } = req.params;
  const { api_key } = req.query;

  try {
    const response = await request(
      `${generateScraperUrl(
        api_key
      )}&url=https://www.amazon.in/gp/product/${productId}/`
    );
    res.json(JSON.parse(response));
  } catch (error) {
    res.json(error);
  }
});

// Get product reviews
app.get('/products/:productId/reviews', async (req, res) => {
  const { productId } = req.params;
  const { api_key } = req.query;
  try {
    const response = await request(
      `${generateScraperUrl(
        api_key
      )}&url=https://www.amazon.in/dp/product-reviews/${productId}/`
    );
    res.json(JSON.parse(response));
  } catch (error) {
    res.json(error);
  }
});

// Get product offers
app.get('/products/:productId/offers', async (req, res) => {
  const { productId } = req.params;
  const { api_key } = req.query;
  try {
    const response = await request(
      `${generateScraperUrl(
        api_key
      )}&url=https://www.amazon.in/dp/offers-listing/${productId}/`
    );
    res.json(JSON.parse(response));
  } catch (error) {
    res.json(error);
  }
});

// Get Search Results
app.get('/search/:searchQuery', async (req, res) => {
  const { searchQuery } = req.params;
  const { api_key } = req.query;
  try {
    const response = await request(
      `${generateScraperUrl(
        api_key
      )}&url=https://www.amazon.in/s?k=${searchQuery}/`
    );
    res.json(JSON.parse(response));
  } catch (error) {
    res.json(error);
  }
});
//To start the server
app.listen(PORT, () => {
  console.log(`Server started on port: ${PORT}`);
});
