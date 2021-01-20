// Require axios
const axios = require('axios');

const api = {
  async getUser(userResponses) {
    try { let response = await axios
        
        // Example: https://api.github.com/ShowlandProductions
        .get(`https://api.github.com/users/${userResponses.username}`);
        return response.data;

    } catch (error) {
        console.log(error);
    }
  }
};

// Has to export the module to call index.js
module.exports = api;