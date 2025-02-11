const BASE_URL = "https://your-app-name.onrender.com";  // Replace with your actual Render app URL

function goToLogin() {
    window.location.href = "login.html";
}

function login() {
    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;

    if (username && password) {
        fetch(`${BASE_URL}/login`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ username: username, password: password })
        })
        .then(response => response.json())
        .then(data => {
            if (data.token) {
                localStorage.setItem("authToken", data.token); // Store token in localStorage
                window.location.href = "tracking.html";  // Redirect to tracking page
            } else {
                alert("Invalid credentials.");
            }
        })
        .catch(error => {
            alert("Login failed. Please check your internet connection and try again.");
            console.error('Error during login:', error);
        });
    } else {
        alert("Please enter both username and password.");
    }
}

function fetchLiveTrackCondition() {
    const token = localStorage.getItem("authToken");
    if (!token) return alert("Please log in.");

    fetch(`${BASE_URL}/live_track_condition`, {
        headers: {
            'Authorization': `Bearer ${token}`
        }
    })
    .then(response => response.json())
    .then(data => {
        if (!data || !data.severity) {
            alert("No track data available.");
            return;
        }

        alert(`Severity: ${data.severity || "N/A"}\nLatitude: ${data.latitude || "N/A"}\nLongitude: ${data.longitude || "N/A"}\nTimestamp: ${data.timestamp || "N/A"}`);
    })
    .catch(error => {
        alert("Failed to retrieve track condition. Please try again.");
        console.error('Error fetching live track condition:', error);
    });
}
