<script lang="ts">
    import Component from "$lib/components/component/Component.svelte";
    import {schema} from "./schema";
    import ILSProduct from "$lib/interfaces/lightspeed/ILSProduct";
    import {onDestroy} from "svelte";
    import {formHelper} from "$lib/utils/form-helper";

    export let product: ILSProduct = undefined;

    let isDisabled = false;

    let button: HTMLFormElement;

    let interval;

    function useFormCheck(node) {
        let form = node.closest("form");
        if (form) {
            interval = setInterval(() => {
                node.classList.remove("hidden");
                let formData = formHelper.getFormData(form);
                if (formData["variant"]) {
                    if (Object.values(formData["variant"]).find((amount) => parseInt(amount) > 0)) {
                        isDisabled = false;
                    } else {
                        // TODO: Need to check variant stock
                        isDisabled = true;
                    }
                } else if (formData["amount"] && !product.unlimited) {
                    isDisabled = parseInt(formData["amount"]) > product.quantity;
                } else {
                    clearInterval(interval);
                }
            }, 100);
        }
    }

    onDestroy(() => {
        if (interval) {
            clearInterval(interval);
        }
    })
</script>

<Component {schema} let:props>
    <button use:useFormCheck type="submit"
            disabled={!product.inStock || !product.enabled || isDisabled}
            class={`hidden relative w-full px-3 py-3 bg-${props.bgColor} text-${props.textColor} ${props.borderRadius} ${props.dropShadow} ${props.fontSize}`}>
        {#if !product.enabled}
            Not Available
        {:else if !product.inStock}
            Out of Stock
        {:else}
            {props.title}
        {/if}
    </button>
</Component>

<style lang="scss">
  button:disabled {
    @apply cursor-not-allowed;
    &:before {
      @apply absolute top-0 left-0 w-full h-full bg-white opacity-50;
      content: '';
    }
  }
</style>
