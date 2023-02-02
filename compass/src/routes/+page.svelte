<script>
    import './styles.css';
    import Summary from "./utils/Summary.svelte";
    import Champions from "./utils/Champions.svelte";

    let response = ""

    async function send() {
        response = (await fetch("http://localhost:8800/lol/recommend")).json()
        console.log(response)
    }
</script>

<div class="prompt">
    <textarea placeholder="Write down your desired character..."></textarea>
    <div class="button-holder">
        <button class="prompt-button" on:click={send}>Let's go</button>
    </div>
    {#if response}
        <Champions response="{response}"/>
    {/if}
</div>

<style>

    .prompt {
        margin: auto;
        width: 70vw;
        max-width: 70em;
        position: relative;
    }

    textarea {
        resize: none;
        height: 20vh;
        width: 100%;
        border-radius: 16px;
        padding: 0.5em 0.8em;
        margin-bottom: 1em;
        font-size: 16pt;
        filter: drop-shadow(0.5em 0.5em 0.2em var(--shadow-color));
    }

    textarea::placeholder {
        font-size: 16pt;
        color: #9a96ce;
    }

    .button-holder {
        text-align: right;
        width: 100%;
    }

    button {
    }

    hr {
        width: 80%;
        margin: auto;
        border-color: var(--prompt);
        border-width: 1pt;
    }

</style>