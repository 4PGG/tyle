<script lang="ts">
</script>

<main>
    <nav>
        <div class="name">tyle</div>
        <div class="links">
            <button>
                <i class="fas fa-plus"></i>
            </button>
            <button>
                <i class="fas fa-save"></i>
            </button>
            <button>
                <i class="fas fa-gears"></i>
            </button>
        </div>
    </nav>
</main>

<style>
    nav {
        position: sticky;
        top: 0;
        display: flex;
        flex-wrap: wrap;
        justify-content: space-between;
        padding: 1.5rem 2rem;
        background-color: var(--gray-900);
    }

    .links {
        display: flex;
        margin: 0 -1em;
    }

    .links button {
        display: inline-block;
        background: none;
        border: none;
        margin: 0 1em;
        font-size: 16px;
        color: var(--gray-500);
    }

    .name {
        font-weight: bold;
        text-transform: uppercase;
        letter-spacing: 0.2em;
        color: var(--gray-500);
    }

</style>