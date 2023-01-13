<script lang="ts">
    export let value: number = 0;
    export let name: string = undefined;

    export let min: number = 0;
    export let max: number = undefined;
</script>

<div class="flex relative rounded-md border border-solid border-gray-400 pl-3 overflow-hidden">
    <input type="number" bind:value {name} on:input={(e) => {
        if (e.target.value < min) {
            value = min;
            e.preventDefault();
        } else if (e.target.value > max) {
            value = max;
            e.preventDefault();
        }
    }}/>
    <div class="flex flex-col flex-center border-l border-solid border-gray-400">
        <button type="button" on:click={() => {
            if (!max || value + 1 <= max) value++;
        }} class="border-b border-solid border-gray-400">
            <span class="material-symbols-outlined">expand_less</span>
        </button>
        <button type="button" on:click={() => {
            if (value - 1 >= min) value--;
        }}>
            <span class="material-symbols-outlined">expand_more</span>
        </button>
    </div>
</div>

<style lang="scss">
  button {
    @apply flex justify-center items-center flex-grow;

    &:hover {
      @apply bg-gray-200;
    }
  }

  input {
    @apply min-h-full flex-grow;

    &:focus {
      outline: none;
    }
  }

  input::-webkit-outer-spin-button,
  input::-webkit-inner-spin-button {
    -webkit-appearance: none;
    margin: 0;
  }

  /* Firefox */
  input[type=number] {
    -moz-appearance: textfield;
  }
</style>