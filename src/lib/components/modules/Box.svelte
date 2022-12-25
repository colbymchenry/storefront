<script lang="ts">
    import Editable from "$lib/components/editable/Editable.svelte";
    import Slider from "$lib/components/Slider.svelte";
    import {gapValues} from "$lib/stores/theme";

    export let key: string;
    export let clazz: string;
    export let editClazz: string;
    export let onSave;
    let display;

</script>

<!--TODO: Finish this and make the editable on the  bottom of the body so it has no overlap FIXED -->
<Editable {key} let:styles let:classes let:currentEdits clazz={editClazz} on:close {onSave}>
    <div style={`min-height: 1rem;${styles};
        ${currentEdits?.props?.display === 'grid' && currentEdits?.props?.gapX ? `column-gap: ${currentEdits.props.gapX}rem;` : ''}
        ${currentEdits?.props?.display === 'grid' && currentEdits?.props?.gapY ? `row-gap: ${currentEdits.props.gapY}rem;` : ''}
        ${currentEdits?.props?.display === 'flex' && currentEdits?.props?.gap ? `gap: ${currentEdits.props.gap}rem;` : ''}
    `} class={`w-full ${classes} ${clazz}
    `}
         class:flex={currentEdits?.props?.display === 'flex'}
         class:grid={currentEdits?.props?.display === 'grid'}
         class:flex-col={currentEdits?.props?.direction === 'flex-col'}
         class:flex-row={currentEdits?.props?.direction === 'flex-row'}
         class:flex-row-reverse={currentEdits?.props?.direction === 'flex-row-reverse'}
         class:flex-col-reverse={currentEdits?.props?.direction === 'flex-col-reverse'}
         class:flex-wrap={currentEdits?.props?.wrapping === 'flex-wrap'}
         class:flex-wrap-reverse={currentEdits?.props?.wrapping === 'flex-wrap-reverse'}
         class:flex-nowrap={currentEdits?.props?.wrapping === 'flex-nowrap'}
    >
        <slot {currentEdits} />
    </div>

    <!-- PROPS -->
    <div slot="props" class="w-full flex flex-col">
        {#if currentEdits?.props}
            <div class="flex flex-col">
                <label class="font-bold mt-2 text-sm">Display:</label>
                <select name="display" value={display}
                        on:change={(e) => display = e.target.value}>
                    <option value="block" default>block</option>
                    <option value="flex">flex</option>
                    <option value="grid">grid</option>
                </select>

                {#if display === 'flex'}
                    <label class="font-bold mt-2 text-sm">Direction:</label>
                    <select name="direction" value={currentEdits.props.direction} on:change={(e) => currentEdits.props.direction = e.target.value}>
                        <option value="flex-row" default>row</option>
                        <option value="flex-col">column</option>
                        <option value="flex-row-reverse">row-reverse</option>
                        <option value="flex-col-reverse">column-reverse</option>
                    </select>

                    <label class="font-bold mt-2 text-sm">Wrapping:</label>
                    <select name="wrapping" value={currentEdits.props.wrapping} on:change={(e) => currentEdits.props.wrapping = e.target.value}>
                        <option value="flex-wrap" default>Wrap</option>
                        <option value="flex-wrap-reverse">Wrap Reverse</option>
                        <option value="flex-nowrap">No Wrapping</option>
                    </select>

                    <label class="font-bold mt-2 text-sm">Gap:</label>
                    <Slider values={gapValues} value={currentEdits.props.gap} name="gap" on:change={(e) => currentEdits.props.gap = e.target.value}/>
                {:else if display === 'grid'}
                    <label class="font-bold mt-2 text-sm">Gap X:</label>
                    <Slider values={gapValues} value={currentEdits.props.gapX} name="gapX" on:change={(e) => currentEdits.props.gapX = e.target.value}/>

                    <label class="font-bold mt-2 text-sm">Gap Y:</label>
                    <Slider values={gapValues} value={currentEdits.props.gapY} name="gapY" on:change={(e) => currentEdits.props.gapY = e.target.value}/>
                {/if}
            </div>
        {/if}

        <slot name="props" {currentEdits} />
    </div>
</Editable>