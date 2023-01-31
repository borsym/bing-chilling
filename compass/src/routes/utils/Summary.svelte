<script>
    import Token from "./Token.svelte";

    export let response = "";
    let value = {token_likelihoods: []};

    function normaliseLikelihood(value) {
        const likelihoods = value.token_likelihoods.map(value => value.likelihood);
        const min = Math.min(...likelihoods)
        const max = Math.max(...likelihoods)
        console.log({min, max})

        value.token_likelihoods.forEach(value => value.likelihood = (value.likelihood -min)/(max - min));
        return value.token_likelihoods;
    }
</script>

<div class="response">
    <hr/>
    {#await response}
        <div class="response-content">
            Looking for the best match...
        </div>
    {:then value}
        <div class="response-content">
            {#each normaliseLikelihood(value) as val}
                <Token likelihood="{val.likelihood}" token="{val.token}"/>
            {/each}
        </div>
    {:catch error}
        <div class="response-content">
            {error}
        </div>
    {/await}
</div>

<style>
    .response {
        margin-top: 3em;
        width: 100%;
        height: 50vh;
    }

    .response-content {
        display: flex;
        flex-direction: row;
        flex-wrap: wrap;
        margin-top: 1em;
        border-radius: 16pt;
        width: 100%;
        padding: 0.5em 0.8em;
        height: fit-content;
        background-color: #4e406d;
        font-size: 16pt;
        filter: drop-shadow(0.5em 0.5em 0.2em var(--shadow-color));
    }
</style>
