<script>
    import { page } from '$app/stores'
    const slugArr = $page.params.slug.split('/')
</script>

<body>
    <h1>Docs home page</h1>
    {#if slugArr.length === 1}
        <h1>Length is 1</h1>
    {:else if slugArr.length === 2}
        <h1>Length is 2</h1>
    {/if}
</body>
