const express = require('express');
const cors = require('cors');
const path = require('path');
const { router: mindmapRouter } = require('./routes/mindmap');
const { setupStorage } = require('./utils/storage');

const app = express();
const PORT = 3000;

app.use(cors());
app.use(express.json());
app.use(express.static('public'));
app.use('/api/mindmap', mindmapRouter);

setupStorage().catch(err => {
    console.error('Failed to setup storage:', err);
    process.exit(1);
});

app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});