<script>
    export let likelihood;
    export let token;

    console.log(likelihood)
    console.log(token)
</script>

<div class="token" style="background-color: rgba(43, 35, 65, {likelihood})">
    {token}
</div>

<style>
    .token {
        font-size: 16pt;
        width: fit-content;
        margin: 0;
        padding: 0.1em;
    }

    .token:hover {
        background-color: #4075a6;
    }
</style>