<script lang="ts">
    export let name: string;
    export let type: string = 'text';
    export let placeholder: string;
    export let value;
    export let min, max, step;

    function typeAction(node) {
        node.type = type;
    }
</script>

<div class="flex flex-col">
    <label for={name} class="mb-2 font-medium">
        <slot/>
    </label>
    <input use:typeAction {name} {placeholder} {min} {max} {step} id={name} bind:value/>
</div>

<style lang="scss">
  input {
    @apply px-2 py-3 text-slate-800 bg-gray-200 rounded-lg cursor-text;
  }
</style>