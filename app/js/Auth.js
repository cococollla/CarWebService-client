function authenticate() {
    var email = document.getElementById('Email').value;
    var password = document.getElementById('Password').value;

    var credentials = {
        Email: email,
        Password: password
    };

    fetch('https://localhost:7227/api/Account/Login', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(credentials)
    })
    .then(response => {
        if (response.status === 400) {
            throw new Error('Authentication failed');
        }
        return response.json();
    })
    .then(data => {
        document.cookie = `role=${data.value.role}` + '; path=/';
        document.cookie = `accessToken=${data.value.accessToken}` + '; path=/';

        return window.location.href = window.location.origin + '/app/Views/Cars.html';
    })
    .catch(error => {
        console.error('Authentication error:', error);
    });
}