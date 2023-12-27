function Logout() {
    let userId = localStorage.getItem("userId");

    fetch("https://localhost:7227/api/Account/Logout", {
        headers: {
            'userId': userId
        },
        method: "GET",
    })
        .then((response) => {
            if (response.status !== 204) {
                throw new Error();
            }

            localStorage.removeItem("role");
            localStorage.removeItem("accessToken");

            return (window.location.href =
                window.location.origin + "/app/Views/Auth.html");
        })
        .catch((error) => {
            console.error("Logout error:", error);
            
            localStorage.removeItem("role");
            localStorage.removeItem("accessToken");

            return (window.location.href =
                window.location.origin + "/app/Views/Auth.html");
        });
}
