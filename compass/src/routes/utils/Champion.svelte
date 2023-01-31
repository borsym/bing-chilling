<script>
    import Chart from 'chart.js/auto';
    import {onMount} from "svelte";

    export let champ = {};
    console.log(champ)

    onMount(() => {
        drawChart(champ.name, champ.info)
    })

    function drawChart(name, info) {
        const ctx = document.getElementById(name);
        const data = {labels: Object.keys(info), datasets: [{data: Object.values(info)}]}
        new Chart(ctx, {
            type: 'radar',
            data,
            options: {
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
        });
    }
</script>

<div class="profile">
    <div class="percent">Accuracy: 100%</div>
    <div class="desc">
        <div class="title">
            <img src="src/images/{champ.image.full}" alt="Champ">
            <div class="title-content">
                <h1>{champ.name}</h1>
                <h2>{champ.title}</h2>
            </div>
        </div>
        <p>{champ.blurb}</p>
    </div>
    <div class="chart">
        <canvas id="{champ.name}" width="10em"></canvas>
    </div>
</div>

<style>
    .profile {
        display: grid;
        grid-template-columns: 1fr 7fr 4fr;
    }

    .desc {
        display: flex;
        flex-direction: column;
        margin-left: 1em;
    }

    img {
        object-fit: cover;
    }

    .percent {
        position: relative;
        font-size: 26pt;
        text-align: center;
        vertical-align: central;
        display: block;
        top: 30%;
    }

    h1 {
        color: gold;
        font-weight: bold;
    }

    h2 {
        color: goldenrod;
    }

    h1, h2 {
        filter: drop-shadow(0.2em 0.2em 0.1em var(--shadow-color));
    }

    .chart {
        background: radial-gradient(var(--background2), #4e406d 60%);
    }

    .title {
        display: grid;
        grid-template-columns: 1fr 3fr 1fr;
        margin-bottom: 0.5em;
    }

    .title-content {
        padding-left: 1em;
    }
</style>