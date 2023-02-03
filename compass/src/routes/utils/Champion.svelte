<script>
    import {onMount} from "svelte";
    import {createChart} from "./chart.ts";

    export let champ = {};

    onMount(() => {
        drawChart(champ.name, champ.info)
    })

    function drawChart(name, info) {
        const ctx = document.getElementById(name);
        const data = {labels: Object.keys(info), datasets: [{data: Object.values(info)}]};
        createChart(ctx, data);
    }
</script>

<div class="profile">
    <div class="percent">Confidence: {Math.round(champ.similarity * 100)}%</div>
    <div class="desc">
        <div class="title">
            <img src="{champ.img}" alt="Champ">
            <div class="title-content">
                <h1>{champ.name}</h1>
                <h2>{champ.title}</h2>
                <h3>{champ.tags.join(', ')}</h3>
            </div>
        </div>
        <p>{champ.lore}</p>
    </div>
    <div class="chart">
        <canvas id="{champ.name}" width="10em"></canvas>
    </div>
</div>

<style>
    .profile {
        display: grid;
        grid-template-columns: 1fr 7fr 4fr;
        padding: 1em;
    }

    .profile:nth-of-type(even) {
        display: grid;
        grid-template-columns: 1fr 7fr 4fr;
        padding: 1em;
        background-color: var(--background2);
    }

    .desc {
        display: flex;
        flex-direction: column;
        margin-left: 2em;
    }

    img {
        object-fit: cover;
    }

    .percent {
        position: relative;
        font-size: 20pt;
        text-align: center;
        vertical-align: central;
        display: block;
        top: 40%;
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
        position: relative;
        top: 10%;
        height: fit-content;
        margin-left: 2em;
        background: radial-gradient(var(--background2), var(--prompt) 60%);
    }

    .profile:nth-of-type(even) .chart {
        background: radial-gradient(var(--prompt), var(--background2) 60%);
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