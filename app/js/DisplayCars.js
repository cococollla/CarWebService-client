$(document).ready(function () {
    $.ajax({
        url: 'https://localhost:7227/api/Car/GetCars',
        type: 'GET',
        dataType: 'json',
        success: function (data) {
            displayMachineList(data);
        },
        error: function (error) {
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