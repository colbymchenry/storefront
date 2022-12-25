<script lang="ts">
    import Editable from "$lib/components/editable/Editable.svelte";
    import Box from "$lib/components/modules/Box.svelte";
    import HeroVideo from "$lib/components/modules/HeroVideo.svelte";
</script>

<Editable key="nav" let:styles let:classes let:currentEdits>
    <nav class={classes} style={styles}>
        <span>{currentEdits?.props?.text}</span>
    </nav>

    <div slot="props" class="w-full flex flex-col">
        <div class="flex flex-col mt-3">
            <label class="font-bold mb-2 text-sm">Text:</label>
            <input type="text" name="text" value={currentEdits?.props?.text} />
        </div>
    </div>
</Editable>

<Box key="box-1">
    <div class="w-5 h-5 bg-red-500"></div>
    <div class="w-5 h-5 bg-green-500"></div>
</Box>

<HeroVideo key="hero"/>

<style lang="scss">
    nav {
      @apply w-full h-20;
    }
</style>