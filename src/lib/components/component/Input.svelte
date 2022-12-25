<script lang="ts">
    export let name: string;
    export let type: string = 'text';
    export let placeholder: string;
</script>

<div class="flex flex-col">
    <label for={name} class="mb-2 font-medium">
        <slot />
    </label>
    <input {type} {name} {placeholder} id={name} />
</div>

<style lang="scss">
    input {
      @apply px-2 py-3 text-slate-800 bg-gray-200 rounded-lg cursor-pointer;
    }
</style>