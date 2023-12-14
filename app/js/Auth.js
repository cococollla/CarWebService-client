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
                throw new Error("Authentication failed");
            }
            return response.json();
        })
        .then((data) => {
            localStorage.setItem("accessToken", data.value.accessToken);
            document.cookie = `role=${data.value.role}` + "; path=/";
            document.cookie = `accessToken=${data.value.accessToken}` + "; path=/";

            return (window.location.href =
                window.location.origin + "/app/Views/Cars.html");
        })
        .catch((error) => {
            console.error("Authentication error:", error);
        });
}