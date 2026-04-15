document.getElementById('loginFormContent').addEventListener('submit', function (e) {
    e.preventDefault();
    console.log('Login Attempt');
    const username = document.getElementById('loginUsername').value.trim();
    const password = document.getElementById('loginPassword').value.trim();

    if (username === '' || password === '') {
        alert('Please enter both username and password.');
        return;
    }

    // Send AJAX request to PHP for login check
    fetch('src\basic.php', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            username: username,
            password: password
        })
    })
    .then(response => response.json())
    .then(data => {
        if (data.success) {
            alert('Login successful!');
            // Redirect or handle successful login
        } else {
            alert(data.message || 'Login failed. Please check your username and password.');
        }
    })
    .catch(error => console.error('Error:', error));
});

document.getElementById('signUpFormContent').addEventListener('submit', function (e) {
    e.preventDefault();
    const username = document.getElementById("signUpUsername").value;
    const email = document.getElementById("signUpEmail").value;
    const password = document.getElementById("signUpPassword").value;
    const password_confirm = document.getElementById("signUpConfirmPassword").value;
    if (password === password_confirm) {
        fetch('src\basic.php', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                username: username,
                email: email,
                password: password
            })
        })
        .then(response => {
            console.log('Response status:', response.status);
            return response.json();
        })
        .then(data => {
            console.log('Response data:', data);
            if (data.success) {
                alert('User registered successfully with ID: ' + data.userId);
                closeForm('signUpForm');
            } else {
                alert('Error: ' + data.message);
            }
        })
        .catch(error => {
            console.error('Fetch error:', error);
        });
    } else {
        alert('Passwords do not match');
    }
});

document.getElementById('forgotPasswordForm').addEventListener('submit', function (e) {
    e.preventDefault();
    const email = document.getElementById('resetEmail').value.trim();

    if (email === '') {
        alert('Please enter your email address.');
        return;
    }

    // Send a password reset request to PHP
    fetch('src\basic.php', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            email: email
        })
    })
    .then(response => response.json())
    .then(data => {
        alert(data.message || 'An error occurred. Please try again later.');
    })
    .catch(error => console.error('Error:', error));
});

document.getElementById('createFormContent').addEventListener('submit', function (e) {
    e.preventDefault();
    console.log('Create Project Form Attempt');
});

document.addEventListener('DOMContentLoaded', function() {
    const settingsOptions = document.querySelectorAll('.settings-option button');
    settingsOptions.forEach(option => {
        option.addEventListener('click', function(e) {
            e.preventDefault();
            const action = this.textContent.toLowerCase();
            console.log(`${action} clicked`);
            // You can add more actions based on the button clicked (e.g., redirect or logout)
        });
    });
});

function showForm(formId) {
    document.getElementById(formId).style.display = 'block';
}

function closeForm(formId) {
    document.getElementById(formId).style.display = 'none';
}

function showLogin() {
    showForm('loginForm');
    closeForm('forgotPasswordForm');
    closeForm('signUpForm');
}

function showForgotPassword() {
    showForm('forgotPasswordForm');
    closeForm('loginForm');
    closeForm('signUpForm');
}

function showSignUp() {
    showForm('signUpForm');
    closeForm('forgotPasswordForm');
    closeForm('loginForm');
}