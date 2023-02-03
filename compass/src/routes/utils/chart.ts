import Chart from "chart.js/auto";

const options = {
    plugins: {
        legend: {
            display: false
        }
    },
    scales: {
        r: {
            angleLines: {
                color: '#194cba',
                lineWidth: 2
            },
            grid: {
                color: 'rgb(104,106,132)',
                drawTicks: true
            },
            ticks: {
                color: '#69c9e0',
                backdropColor: 'rgba(255, 255, 255, 0.0)',
                font: {
                    size: 16
                }
            },
            pointLabels: {
                color: '#69c9e0',
                font: {
                    size: 16
                }
            }
        }
    },
    elements: {
        line: {
            borderWidth: 3,
            borderColor: '#FF10F0'
        }
    }
}

export function createChart(context: HTMLCanvasElement, data: any) {
    new Chart(context, {
        type: 'radar',
        data,
        options
    });
}