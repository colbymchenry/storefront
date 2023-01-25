<script lang="ts">
    import InputMedia from "$lib/components/component/InputMedia.svelte";
    import InputColor from "$lib/components/component/InputColor.svelte";
    import InputQuill from "$lib/components/component/InputQuill.svelte";
    import {IOption} from "$lib/components/component/ISchema";
    import InputRange from "$lib/components/component/InputRange.svelte";
    import InputURL from "$lib/components/component/InputURL.svelte";

    export let name: string = undefined;
    export let type: string = 'text';
    export let placeholder: string;
    export let value = undefined;
    export let min = undefined, max = undefined, step = undefined;
    export let options: IOption[] = undefined;
    export let unit: string = undefined;
    export let regex: string = undefined;
    export let required: boolean = false;
    export let values: any[] = undefined;
    export let error: string = undefined;
    export let accept: string = undefined;
    export let disabled: boolean = false;

    export let clazz: string = undefined;

    function typeAction(node) {
        node.type = type;
    }

    let localCheck = value;
</script>

<div class={"flex flex-col " + clazz}>
    <div class="flex relative"
         class:items-center={type === 'checkbox'}
         class:flex-row={type === 'color'}
         class:flex-col={type !== 'color' && type !== 'checkbox'}>
        <label for={name} class="font-medium" class:mr-2={type === 'color'}
               class:mb-2={type !== 'color' && type !== 'checkbox'}>
            <slot/>
            {#if required}*{/if}
        </label>
        {#if type === 'image'}
            <InputMedia {name} bind:src={value}/>
        {:else if type === 'video'}
            <InputMedia {name} video={true} bind:src={value}/>
        {:else if type === 'color'}
            <InputColor {name} bind:value/>
        {:else if type === 'textarea'}
            <InputQuill {name} bind:value/>
        {:else if type === 'htmltextarea'}
            <textarea {name} {disabled} {required} class="border border-solid border-gray-300">
                {value || ""}
            </textarea>
        {:else if type === 'select'}
            <select {disabled} {name} {placeholder} {required} id={name} bind:value on:change>
                {#each options as option}
                    <option value={option.value} selected={value === option.value}>{option.label}</option>
                {/each}
            </select>
        {:else if type === 'range'}
            <InputRange {name} bind:value {min} {max} {step} {unit} {values}/>
        {:else if type === 'url'}
            <InputURL {name} bind:value/>
        {:else if type === 'collection'}
            <InputURL {name} bind:value hideProducts/>
        {:else if type === 'product'}
            <InputURL {name} bind:value hideCollections/>
        {:else if type === 'checkbox'}
            <input type="checkbox" id={name} checked={value} class:checkbox={type === 'checkbox'}
                   on:change={(e) => localCheck = e.target.checked}/>
            <input type="hidden" {name} {disabled} {required} value={localCheck}/>
        {:else}
            <input use:typeAction {disabled} {required} {name} {placeholder} {min} {max} {step} pattern={regex} {accept}
                   id={name} on:change on:input bind:value/>
        {/if}
    </div>
    {#if error}
        <small class="font-medium text-red-500">{error}</small>
    {/if}
</div>

<style lang="scss">
  input, select {
    @apply px-2 py-3 text-slate-800 bg-gray-50 rounded-lg cursor-text border border-solid border-gray-300;

    &:disabled {
      @apply text-gray-400 cursor-not-allowed bg-gray-200;
    }
  }

  select {
    @apply cursor-pointer;
  }

  .checkbox {
    @apply ml-2 cursor-pointer;
    width: 1.25rem;
    height: 1.25rem;
  }
</style>