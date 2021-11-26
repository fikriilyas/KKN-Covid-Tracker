$(document).ready(function(){
    var query = 'https://api.covid19api.com/dayone/country/indonesia'
    
    //Get JSON data from URL
    $.getJSON(query, function(data){
        var trend = {
            daily : [],
            total : [],
        }

        var counter = 0

        $.each(data, function (id, obj) {
           trend.daily.push(obj.Confirmed - counter)
           counter = obj.Confirmed
           trend.total.push(obj.Confirmed)
        })

        console.log(trend)

        var plot = []
        var i;
        for (i = 0; i < data.length; i++) {
            plot.push({
                x: trend.total[i],
                y: trend.daily[i]
            })
        } 

        console.log(plot)


    var total_active = data[data.length - 1].Active;
    var total_confirmed = data[data.length - 1].Confirmed;
    var total_recovered = data[data.length - 1].Recovered;
    var total_deaths = data[data.length - 1].Deaths;
    var kasusbaru = data[data.length - 1].Confirmed - data[data.length - 2].Confirmed;

    $("#confirmed").append(total_confirmed);
    $("#active").append(total_active);
    $("#recovered").append(total_recovered);
    $("#deaths").append(total_deaths);
    $("#kasusbaru").append(kasusbaru);


    //chart inilization
    var myChart = document.getElementById("myChart").getContext("2d")

    var scatterChart = new Chart(myChart, {
        type: 'scatter',
        data: {
            datasets: [{
                label: 'Trend Kasus Covid 19',
                data: plot,
                backgroundColor: '#ff6384'
            }]
        },
        options: {
            scales: {
                yAxes: [{
                    type: 'logarithmic',
                    scaleLabel: {
                        display: true,
                        labelString: 'Kasus Baru (Logaritmik)'
                    }
                }],
                xAxes: [{
                    type: 'logarithmic',
                    position: 'bottom',
                    scaleLabel: {
                        display: true,
                        labelString: 'Total Kasus (Logaritmik)'
                    }
                }]
            }
        }
    });
    })
})