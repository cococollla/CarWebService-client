$(document).ready(function () {
    let accessToken = localStorage.getItem('accessToken')
    $.ajax({
        url: 'https://localhost:7227/api/Car/GetCars',
        type: 'GET',
        dataType: 'json',
        xhrFields: {
            withCredentials: true
        },
        headers: {
            Authorization: `Bearer ${accessToken}`
        },
        success: function (data) {
            displayMachineList(data);
        },
        error: function (xhr, status, error) {
            const isRefreshTokenExpired = xhr.getResponseHeader("IS-REFRESHTOKEN-EXPIRED") === "true";
    
            if (isRefreshTokenExpired) {
                window.location.href = window.location.origin + "/app/Views/Auth.html";
                return;
            }
    
            console.error('Error fetching machine data:', error);
        }
    });
    function displayMachineList(machineList) {
        $('#machineTable tbody').empty();

        machineList.forEach(function (machine) {
            var row = '<tr>' +
                '<td>' + machine.brandName + '</td>' +
                '<td>' + machine.colorName + '</td>' +
                '<td>' + machine.yearRelese + '</td>' +
                '<td>' + machine.price + '</td>' +
                '<td>' + machine.shorDescription + '</td>' +
                '</tr>';
            $('#machineTable tbody').append(row);
        });
    }
});