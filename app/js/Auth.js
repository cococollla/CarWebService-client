function authenticate() {
    var email = document.getElementById('Email').value;
    var password = document.getElementById('Password').value;

    var credentials = {
        Email: email,
        Password: password
    };

    fetch("https://localhost:7227/api/Account/Login", {
        method: "POST",
        credentials: "include",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(credentials),
    })
        .then((response) => {
            if (response.status === 404) {
                alert("Authentication failed");
            }
            return response.json();
        })
        .then((data) => {
            localStorage.setItem("userId", data.value.userId);
            localStorage.setItem("role", data.value.role);
            localStorage.setItem("accessToken", data.value.accessToken);

            return (window.location.href =
                window.location.origin + "/app/Views/Cars.html");
        })
        .catch((error) => {
            console.error("Authentication error:", error);
        });
}