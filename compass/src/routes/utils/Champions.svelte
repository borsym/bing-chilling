<script>
    import Champion from "./Champion.svelte";

    export let response = {};
</script>

<div class="response">
    <hr/>
    {#await response}
        <div class="wait">
            Looking for the best match...
        </div>
    {:then value}
        <div class="flex flex-row gap-3 my-5">
            {#each value.summary as keyword}
                <div class="keyword rounded-lg text-black px-2 py-1 ">
                    {keyword}
                </div>
            {/each}
        </div>
        <div class="response-content">
            {#each value.championsData as val, i}
                <Champion champ="{val}"/>
            {/each}
        </div>
    {:catch error}
        <div class="wait">
            Hmm... The request didn't pass the vibe check.
        </div>
    {/await}
</div>

<style>
    .response {
        margin-top: 3em;
        width: 100%;
        height: 50vh;
    }

    .keyword {
        background-color: #42d1f5;
        font-size: 16pt;
        filter: drop-shadow(0.5em 0.5em 0.2em var(--shadow-color));
    }

    .response-content, .wait {
        display: flex;
        flex-direction: row;
        flex-wrap: wrap;
        margin-top: 1em;
        border-radius: 8px;
        width: 100%;

        height: fit-content;
        background-color: var(--prompt);
        font-size: 16pt;
        filter: drop-shadow(0.5em 0.5em 0.2em var(--shadow-color));
    }

    .wait {
        padding: 0.5em 0.8em;
    }
</style>