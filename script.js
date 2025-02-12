function goToLogin() {
    window.location.href = 'login.html';
}

function login() {
    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;
    const mobile = document.getElementById('mobile').value;

    // Check if username, password, and mobile are provided
    if (username && password && mobile) {
        // Assuming the data is stored in localStorage in the format: username, password, mobile
        const storedUser = JSON.parse(localStorage.getItem(username));  // Getting stored user data

        // Validate the username, password, and mobile number against stored data
        if (storedUser && storedUser.password === password && storedUser.mobile === mobile) {
            alert('Login successful!');
            window.location.href = 'tracking.html';  // Redirect to tracking page
        } else {
            alert('Invalid username, password, or mobile number. Please try again.');
        }
    } else {
        alert('Please enter all fields (Username, Password, Mobile Number).');
    }
}

