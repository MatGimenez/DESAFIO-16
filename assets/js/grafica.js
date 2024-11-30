let myChart = null
function prepararGraficos(fechas,valores,divisa){
    const chartDOM = document.getElementById("myChart");
    if(myChart != null){
        myChart.destroy()
    }
    myChart = new Chart(chartDOM, {
            type: 'line',
            data:{
                labels: fechas,
                datasets: [{
                    label: divisa,
                    data: valores,
                    backgroundColor: '#FD0054',
                }]
            }

    });
}

export {prepararGraficos}