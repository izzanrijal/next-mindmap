let jm = null;

// Initialize jsMind
function initMindmap(data) {
    const options = {
        container: 'jsmind_container',
        theme: 'primary',
        editable: true,
        support_html: true,
        view: {
            hmargin: 100,
            vmargin: 50,
            line_width: 2,
            line_color: '#555'
        }
    };
    
    jm = new jsMind(options);
    if (data) {
        jm.show(data);
    }
}

// Save mindmap to server
async function saveMindmap() {
    if (!jm) {
        alert('No mindmap data to save');
        return;
    }

    try {
        const mindmapData = jm.get_data();
        const response = await fetch('/api/mindmap/save', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(mindmapData)
        });
        
        if (response.ok) {
            alert('Mindmap saved successfully');
        } else {
            alert('Error saving mindmap');
        }
    } catch (error) {
        console.error('Error:', error);
        alert('Error saving mindmap');
    }
}

// Load mindmap from server
async function loadMindmap() {
    try {
        const response = await fetch('/api/mindmap/load');
        if (response.ok) {
            const data = await response.json();
            initMindmap(data);
        } else {
            alert('Error loading mindmap');
        }
    } catch (error) {
        console.error('Error:', error);
        alert('Error loading mindmap');
    }
}

// Load initial mindmap when page loads
document.addEventListener('DOMContentLoaded', () => {
    loadMindmap();
});