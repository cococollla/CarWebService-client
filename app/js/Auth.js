function authenticate() {
    var email = document.getElementById('Email').value;
    var password = document.getElementById('Password').value;

    var credentials = {
        email: email,
        password: password
    };

    fetch('https://localhost:7227/api/Account/Login', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(credentials)
    })
        .then(response => {
            if (!response.ok) {
                throw new Error('Authentication failed');
            }
            return response.json();
        })
        .then(data => {
            var accessToken = data.accessToken;
            var refreshToken = data.refreshToken;
            var role = data.role;
            console.log('Access Token:', accessToken);
            console.log('Refresh Token:', refreshToken);
            console.log('Role:', role);
        })
        .catch(error => {
            console.error('Authentication error:', error);
        });
}