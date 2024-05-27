const express = require('express');
const axios = require('axios');
const path = require('path');

const app = express();
const API_KEY = '83335725b5d44c239ab6d836d452c9df';

app.use(express.static('public'));

app.get('/news/:city', async (req, res) => {
    const city = req.params.city;
    try {
        const response = await axios.get(`https://newsapi.org/v2/everything?q=${city}&apiKey=${API_KEY}`);
        res.json(response.data);
    } catch (error) {
        console.error(error);
        res.status(500).send('Error fetching news');
    }
});

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
