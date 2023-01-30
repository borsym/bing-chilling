<script>
    import './styles.css';

    let response = ""

    async function send() {
        response = (await fetch("http://localhost:8800/lol/recommend")).text()
        console.log(response)
    }
</script>

<div class="prompt">
    <textarea placeholder="Write down your desired character..."></textarea>
    <div class="button-holder">
        <button class="prompt-button" on:click={send}>Let's go</button>
    </div>
    <div class="response">
        <hr/>
        {#await response}
            <div class="response-content">
                Looking for the best match...
            </div>
        {:then value}
            <div class="response-content">
                {value}
            </div>
        {:catch error}
            <div class="response-content">
                {error}
            </div>
        {/await}
    </div>
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

    .response {
        margin-top: 3em;
        width: 100%;
        height: 50vh;
    }

    .response-content {
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