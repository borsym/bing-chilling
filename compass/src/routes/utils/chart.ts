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
                color: '#0d1059',
                lineWidth: 2
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