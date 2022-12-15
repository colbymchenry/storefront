<script lang="ts">
    import Editable from "$lib/components/editable/Editable.svelte";
    import Slider from "$lib/components/Slider.svelte";

    export let key;
    let display;
</script>

<!--TODO: Finish this and make the editable on the  bottom of the body so it has no overlap FIXED -->
<Editable {key} let:styles let:classes let:currentEdits>
    <div class={'w-full ' + classes} style={'min-height: 1rem;' + styles}>
        <slot/>
    </div>

    <!-- PROPS -->
    <div slot="props" class="w-full flex flex-col">
        <div class="flex flex-col">
            <label class="font-bold mb-2 text-sm">Display:</label>
            <select name="display" value={currentEdits.props.display || 'block'}
                    on:change={(e) => display = e.target.value}>
                <option value="block" default>block</option>
                <option value="flex">flex</option>
                <option value="grid">grid</option>
            </select>

            {#if display === 'flex'}
                <label class="font-bold mb-2 text-sm">Direction:</label>
                <select name="direction" value={currentEdits.props.direction || 'block'}>
                    <option value="flex-row" default>row</option>
                    <option value="flex-column">column</option>
                    <option value="flex-row-reverse">row-reverse</option>
                    <option value="flex-column-reverse">column-reverse</option>
                </select>

                <label class="font-bold mb-2 text-sm">Wrapping:</label>
                <select name="wrapping" value={currentEdits.props.wrapping || 'block'}>
                    <option value="flex-wrap" default>Wrap</option>
                    <option value="flex-wrap-reverse">Wrap Reverse</option>
                    <option value="flex-nowrap">No Wrapping</option>
                </select>

                <label class="font-bold mb-2 text-sm">Gap:</label>
                <Slider />

            {:else if display === 'grid'}
                <p>grid</p>
            {/if}
        </div>
    </div>
</Editable>