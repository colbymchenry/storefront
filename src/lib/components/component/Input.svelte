<script lang="ts">
    import InputMedia from "$lib/components/component/InputMedia.svelte";
    import InputColor from "$lib/components/component/InputColor.svelte";
    import InputQuill from "$lib/components/component/InputQuill.svelte";
    import {IOption} from "$lib/components/component/ISchema";
    import InputRange from "$lib/components/component/InputRange.svelte";

    export let name: string;
    export let type: string = 'text';
    export let placeholder: string;
    export let value;
    export let min, max, step;
    export let options: IOption[];

    function typeAction(node) {
        node.type = type;
    }
</script>

<div class="flex flex-col">
    <label for={name} class="mb-2 font-medium">
        <slot/>
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
        <InputRange {name} bind:value />
    {:else}
        <input use:typeAction {name} {placeholder} {min} {max} {step} id={name} bind:value/>
    {/if}

</div>

<style lang="scss">
  input {
    @apply px-2 py-3 text-slate-800 bg-gray-200 rounded-lg cursor-text;
  }
</style>