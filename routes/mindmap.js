const express = require('express');
const { saveFile, loadFile } = require('../utils/storage');

const router = express.Router();

// Add map parameter handling
router.post('/save', async (req, res) => {
    try {
        const mapName = req.query.map || 'default';
        const mindmapData = req.body;
        await saveFile(`${mapName}.jm`, JSON.stringify(mindmapData, null, 2));
        res.json({ success: true });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

router.get('/load', async (req, res) => {
    try {
        const mapName = req.query.map || 'default';
        const data = await loadFile(`${mapName}.jm`);
        res.json(JSON.parse(data));
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

module.exports = { router };