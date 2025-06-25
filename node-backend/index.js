const express = require('express');
const axios = require('axios');
const cors = require('cors');

const app = express();
const port = 3000;

app.use(cors());

const JIKAN_API_URL = 'https://api.jikan.moe/v4';

app.get('/api/top-anime', async (req, res) => {
  try {
    const response = await axios.get(`${JIKAN_API_URL}/top/anime`);
    res.json(response.data);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching top anime from Jikan API' });
  }
});

app.get('/api/anime-list', async (req, res) => {
  try {
    const response = await axios.get(`${JIKAN_API_URL}/anime`);
    res.json(response.data);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching anime list from Jikan API' });
  }
});

app.get('/api/anime/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const response = await axios.get(`${JIKAN_API_URL}/anime/${id}`);
    res.json(response.data);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching anime details from Jikan API' });
  }
});

app.get('/api/search', async (req, res) => {
  const query = req.query.q;
  if (!query) {
    return res.status(400).json({ message: 'Search query is required' });
  }

  try {
    const response = await axios.get(`${JIKAN_API_URL}/anime`, {
      params: { q: query }
    });
    res.json(response.data);
  } catch (error) {
    res.status(500).json({ message: 'Error searching for anime on Jikan API' });
  }
});

app.listen(port, () => {
  console.log(`Backend server listening at http://localhost:${port}`);
}); 