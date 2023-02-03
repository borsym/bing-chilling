<script></script>

<header>
    <nav>
        <img class="logo" src="src/images/logo_2.svg" alt="An image of a red ball."/>
        <!--        <ul>-->
        <!--            <li aria-current={""}>-->
        <!--                <a href="/">Home</a>-->
        <!--            </li>-->
        <!--            <li aria-current={""}>-->
        <!--                <a href="/">Request Game</a>-->
        <!--            </li>-->
        <!--            <li aria-current={""}>-->
        <!--                <a href="/">Create Background Story</a>-->
        <!--            </li>-->
        <!--            <li aria-current={""}>-->
        <!--                <a href="/">About Us</a>-->
        <!--            </li>-->
        <!--        </ul>-->
    </nav>
</header>

<style>
    header {
        display: flex;
        justify-content: space-between;
    }

    nav {
        margin: auto;
        display: flex;
        justify-content: center;
        background: none;
    }

    .logo {
        width: 14vw;
        margin: 2em;
        filter: drop-shadow(0.5em 0.5em 0.2em var(--shadow-color));
    }

    ul {
        position: relative;
        padding: 0;
        margin: auto;
        height: 2em;
        display: flex;
        justify-content: center;
        align-items: center;
        list-style: none;
        background-size: contain;
    }

    li {
        position: relative;
        height: 100%;
        margin-left: 1em;
        margin-right: 1em;
    }

    nav a {
        display: flex;
        height: 100%;
        align-items: center;
        padding: 0 0.5rem;
        color: var(--color-text);
        font-weight: 600;
        font-size: 17pt;
        letter-spacing: 0.1em;
        text-decoration: none;
        transition: color 0.2s linear;
    }

    a:hover {
        background-color: var(--background);
    }
</style>
