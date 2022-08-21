const express = require('express');
const router = express.Router();
const fetch = require('node-fetch');
const axios = require('axios');

router.get('/', async(req, res) => {
  // Declare the url 
  const url = 'https://pokeapi.co/api/v2/pokemon?limit=10&offset=0';
  // Getting data with Axios
  if (req._parsedUrl.query === 'axios') {
    try {
      const response = await axios.get(url);
      const pokemons = await response.data.results;
      res.render('home/home', {pokemons})
    }
    catch (error) {
      console.log(error);
    }
  }
  // Getting data with Fetch (using node-fetch)
  else {
    fetch(url)
    .then(response => response.json())
    .then(data => {
      const pokemons = data.results;
      res.render('home/home', {pokemons})
    })
  }
});

module.exports = router;