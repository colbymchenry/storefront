<script lang="ts">
    import {activeModal} from "$lib/stores/modals";

    export let visible: boolean = true;

    let container: HTMLElement;

    function handleClick(e) {
        visible = container.contains(e.target);
        if (!visible) {
            setTimeout(() => {
                $activeModal = {};
            }, 200)
        }
    }
</script>

<modal-container class:visible on:click={handleClick}>
    <div bind:this={container}>
        <div class="flex w-full justify-end">
            <button type="button" on:click|preventDefault|stopPropagation={() => visible = false}>
                <span class="material-symbols-outlined">close</span>
            </button>
        </div>
        <slot></slot>
    </div>
</modal-container>


<style lang="scss">
    modal-container {
      @apply flex justify-center items-center top-0 left-0 fixed w-screen h-screen z-50 pointer-events-none;

      &::before {
        @apply absolute top-0 left-0 w-full h-full bg-black opacity-0 transition z-10;
        content: '';
      }

      > div:first-of-type {
        @apply grid grid-cols-1 opacity-0 bg-white p-3 pt-0 rounded-lg mt-20 z-20 relative overflow-y-auto;
        grid-template-rows: 50px 1fr;
        max-height: 80vh;
        transition: all 0.4s ease;
        animation: fadeIn 0.4s ease;
      }

      &.visible {
        @apply pointer-events-auto;

        &::before {
          @apply opacity-50;
        }

        > div:first-of-type {
          @apply opacity-100 mt-0;
        }
      }
    }

    @keyframes fadeIn {
      from {
        opacity: 0;
        margin-top: 10rem;
      }
      to {
        opacity: 1;
        margin-top: 0;
      }
    }
</style>



