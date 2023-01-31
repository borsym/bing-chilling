<script>
    import Token from "./Token.svelte";
    import Champion from "./Champion.svelte";

    export let response = "";

</script>

<div class="response">
    <hr/>
    {#await response}
        <div class="response-content">
            Looking for the best match...
        </div>
    {:then value}
        <div class="response-content">
            {#each value as val}
                <Champion champ="{val}"/>
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