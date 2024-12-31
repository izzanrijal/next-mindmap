// Get map name from URL parameter
function getMapName() {
    const urlParams = new URLSearchParams(window.location.search);
    return urlParams.get('map') || 'default';
}

// API endpoints with map parameter
async function saveToServer(data) {
    const mapName = getMapName();
    const response = await fetch(`/api/mindmap/save?map=${mapName}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data)
    });
    return response.ok;
}

async function loadFromServer() {
    const mapName = getMapName();
    const response = await fetch(`/api/mindmap/load?map=${mapName}`);
    if (!response.ok) throw new Error('Failed to load mindmap');
    return response.json();
}

export { getMapName, saveToServer, loadFromServer };