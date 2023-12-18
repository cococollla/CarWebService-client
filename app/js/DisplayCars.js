$(document).ready(function () {
    displayCarsApiRequest()
});

function displayCarsApiRequest() {
    let accessToken = localStorage.getItem('accessToken');
    let role = localStorage.getItem('role');
    $.ajax({
        url: 'https://localhost:7227/api/Car/GetCars',
        type: 'GET',
        dataType: 'json',
        xhrFields: {
            withCredentials: true
        },
        headers: {
            'Authorization': `Bearer ${accessToken}`,
            'Role': role
        },
        success: function (data) {
            displayCarList(data);
        },
        error: function (xhr, status, error) {
            const isTokenExpired = xhr.getResponseHeader("IS-TOKEN-EXPIRED") === "true";
            const isRefreshTokenExpired = xhr.getResponseHeader("IS-REFRESHTOKEN-EXPIRED") === "true";

            if (isRefreshTokenExpired) {
                window.location.href = window.location.origin + "/app/Views/Auth.html";
                return;
            } else if (isTokenExpired) {
                performSilentTokenRefresh(role, displayCarsApiRequest);
            } else {
                console.error('Error fetching machine data:', error);
            }
        }
    });
}

function performSilentTokenRefresh(role, callback) {
    $.ajax({
        url: 'https://localhost:7227/api/Account/RefreshToken',
        type: 'GET',
        dataType: 'json',
        headers: {
            'Role': role
        },
        success: function (data) {
            accessToken = data.value;
            localStorage.setItem("accessToken", accessToken);

            if (callback) {
                callback();
            }
        },
        error: function (xhr, status, error) {
            console.error('Token refresh failed:', error);

            window.location.href = window.location.origin + "/app/Views/Auth.html";
        }
    });
}

function displayCarList(machineList) {
    $('#machineTable tbody').empty();

    machineList.forEach(function (machine) {
        var row = '<tr>' +
            '<td>' + machine.brandName + '</td>' +
            '<td>' + machine.colorName + '</td>' +
            '<td>' + machine.yearRelese + '</td>' +
            '<td>' + machine.price + '</td>' +
            '<td>' + machine.shortDescription + '</td>' +
            '</tr>';
        $('#machineTable tbody').append(row);
    });
}