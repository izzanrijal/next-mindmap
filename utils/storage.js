const fs = require('fs').promises;
const path = require('path');

const STORAGE_DIR = path.join(__dirname, '../storage');

async function setupStorage() {
    try {
        await fs.mkdir(STORAGE_DIR, { recursive: true });
        
        // Create default mindmap file if it doesn't exist
        const defaultPath = path.join(STORAGE_DIR, 'cardiac_imaging.jm');
        try {
            await fs.access(defaultPath);
        } catch {
            // File doesn't exist, create it with empty mindmap structure
            const emptyMindmap = {
                meta: {
                    name: "New Mindmap",
                    author: "User",
                    version: "0.1"
                },
                format: "node_tree",
                data: {
                    id: "root",
                    topic: "New Mindmap",
                    expanded: true,
                    children: []
                }
            };
            await fs.writeFile(defaultPath, JSON.stringify(emptyMindmap, null, 2));
        }
    } catch (error) {
        console.error('Error in storage setup:', error);
        throw error;
    }
}

async function saveFile(filename, data) {
    const filepath = path.join(STORAGE_DIR, filename);
    try {
        await fs.writeFile(filepath, data);
    } catch (error) {
        console.error('Error saving file:', error);
        throw error;
    }
}

async function loadFile(filename) {
    const filepath = path.join(STORAGE_DIR, filename);
    try {
        return await fs.readFile(filepath, 'utf8');
    } catch (error) {
        console.error('Error loading file:', error);
        throw error;
    }
}

module.exports = {
    setupStorage,
    saveFile,
    loadFile
};