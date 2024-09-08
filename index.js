const colorRed = getComputedStyle(document.documentElement).getPropertyValue("--Softred");
const colorRed1 = getComputedStyle(document.documentElement).getPropertyValue("--Softred1");
const colorCyan = getComputedStyle(document.documentElement).getPropertyValue("--Cyan");
const colorCyan1 = getComputedStyle(document.documentElement).getPropertyValue("--Cyan1");

const bodyStyle = window.getComputedStyle(document.body);

// Extract font family and size
const fontFamily = bodyStyle.getPropertyValue('font-family');
const fontSize = parseFloat(bodyStyle.getPropertyValue('font-size'));

fetch('data.json')
    .then(response => response.json())
    .then(data => {
        const labels = data.map(item => item.day);
        const values = data.map(item => item.amount);

        const currentDayIndex = new Date().getDay();

        const defaultColor = colorRed;
        const highlightColor = colorCyan;

        const backgroundColors = labels.map((day, index) => {
            const adjustedCurrentDayIndex = (currentDayIndex + 6) % 7;
            return index === adjustedCurrentDayIndex ? highlightColor : defaultColor;
        })
        const defaultHover = colorRed1;
        const highlightHover = colorCyan1;
        const hoverColors = labels.map((day, index) => {
            const adjustedCurrentDayIndex = (currentDayIndex + 6) % 7;
            return index === adjustedCurrentDayIndex ? highlightHover : defaultHover;
        })
        // Data for the chart
        const chartData = {
            labels: labels,
            datasets: [{
                data: values,
                backgroundColor: backgroundColors,
                hoverBackgroundColor: hoverColors, // Change on hover
                borderRadius: 5,
                borderSkipped: false
            }]
        };

        // Config for the chart
        const config = {
            type: 'bar',
            data: chartData,
            options: {
                onHover: (event, chartElement) => {
                    const canvas = event.native.target; // Get the canvas element
              
                    if (chartElement.length) {
                      // If hovering over a bar, set cursor to pointer
                      canvas.style.cursor = 'pointer';
                    } else {
                      // Otherwise, revert the cursor
                      canvas.style.cursor = 'default';
                    }
                },
                plugins: {
                    tooltip: {
                        bodyFont:{
                            family: fontFamily,
                            size: fontSize,
                        },
                        position: 'nearest',
                        cornerRadius: 4,
                        caretSize: 0,
                        displayColors: false,
                        callbacks: {
                            label: function(tooltipItem) {
                                return `$${tooltipItem.raw.toFixed(2)}`;
                            },
                            title: function(){
                                return '';
                            }
                        },
                        yAlign:'bottom'
                    },
                    legend:{
                        display: false
                    }
                },
                scales: {
                    /*
                    x: {
                        grid:{
                            display: false
                        }
                    },
                    y: {
                        grid:{
                            display: false
                        },
                        beginAtZero: true,
                        ticks: {
                            callback: function(value) {
                                return '';
                            }
                        }
                    }*/
                    
                    x:{
                        bodyFont:{
                            family: fontFamily,
                            size: fontSize,
                        },
                        border:{
                            display:false
                        },
                        grid:{
                            display: false
                        },
                        ticks:{
                            display:true,
                        }
                    },
                    y:{
                        display:false,
                    }
                }
            }
        };
        // Render the chart
        const spendingChart = new Chart(
            document.getElementById('spendingChart'),
            config
        );
})