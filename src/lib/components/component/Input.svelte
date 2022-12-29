<script lang="ts">
    import InputMedia from "$lib/components/component/InputMedia.svelte";
    import InputColor from "$lib/components/component/InputColor.svelte";
    import InputQuill from "$lib/components/component/InputQuill.svelte";
    import {IOption} from "$lib/components/component/ISchema";
    import InputRange from "$lib/components/component/InputRange.svelte";
    import {onMount} from "svelte";

    export let name: string;
    export let type: string = 'text';
    export let placeholder: string;
    export let value;
    export let min, max, step;
    export let options: IOption[];
    export let unit: string;
    export let regex: string;
    export let required: boolean = false;

    let products, collections;

    function typeAction(node) {
        node.type = type === 'url' ? 'text' : type;
    }

    async function fetchCatalogData() {
        try {

        } catch (error) {

        }
    }

    onMount(() => {
       if (type === 'url' || type === 'product' || type === 'collection') {

       }
    });
</script>

<div class="flex" class:flex-row={type === 'color'} class:flex-col={type !== 'color'}>
    <label for={name} class="font-medium" class:mr-2={type === 'color'} class:mb-2={type !== 'color'}>
        <slot/> {#if required}*{/if}
    </label>
    {#if type === 'image'}
        <InputMedia {name} bind:src={value} />
    {:else if type === 'video'}
        <InputMedia {name} video={true} bind:src={value}/>
    {:else if type === 'color'}
        <InputColor {name} bind:value/>
    {:else if type === 'textarea'}
        <InputQuill {name} bind:value/>
    {:else if type === 'select'}
        <select {name} {placeholder} id={name} bind:value>
            {#each options as option}
                <option value={option.value} selected={value === option.value}>{option.label}</option>
            {/each}
        </select>
    {:else if type === 'range'}
        <InputRange {name} bind:value {min} {max} {step} {unit} />
    {:else}
        <input use:typeAction {name} {placeholder} {min} {max} {step} pattern={regex} id={name} bind:value/>
    {/if}
</div>

<style lang="scss">
  input, select {
    @apply px-2 py-3 text-slate-800 bg-gray-200 rounded-lg cursor-text;
  }
</style>