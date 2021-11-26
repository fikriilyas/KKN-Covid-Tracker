$(document).ready(function(){
    var query = 'https://api.covid19api.com/dayone/country/indonesia'
    
    //Get JSON data from URL
    $.getJSON(query, function(data){
        var dailyConfirmed = {
            cases : [],
            date: [],
        }

        var counter

        $.each(data, function (id, obj) {
            dailyConfirmed.cases.push(obj.Confirmed - counter)
            counter = obj.Confirmed
            dailyConfirmed.date.push(obj.Date.substring(2,10))
            console.log(counter)
        })

    var total_active = data[data.length - 1].Active;
    var total_confirmed = data[data.length - 1].Confirmed;
    var total_recovered = data[data.length - 1].Recovered;
    var total_deaths = data[data.length - 1].Deaths;

    $("#confirmed").append(total_confirmed);
    $("#active").append(total_active);
    $("#recovered").append(total_recovered);
    $("#deaths").append(total_deaths);


    //chart inilization
    var myChart = document.getElementById("myChart").getContext("2d")

    var chart = new Chart(myChart,{
        type:"bar",
        data:{
            labels: dailyConfirmed.date,
            datasets: [
                {
                    label: 'Jumlah Kasus Baru',
                    data: dailyConfirmed.cases,
                    backgroundColor: '#FFC116'
                }
            ]
        },
        options: {
        }
    })
    })
})