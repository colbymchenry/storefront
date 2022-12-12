<script lang="ts">
    import Editable from "$lib/components/editable/Editable.svelte";

    export let key;
    let display;
</script>

<!--TODO: Finish this and make the editable on the  bottom of the body so it has no overlap FIXED -->
<Editable {key} let:styles let:classes let:currentEdits>
    <div class={'w-full ' + classes} style={'min-height: 1rem;' + styles}>
        <slot/>
    </div>

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
                <p>flex</p>
            {:else if display === 'grid'}
                <p>grid</p>
            {/if}
        </div>
    </div>
</Editable>