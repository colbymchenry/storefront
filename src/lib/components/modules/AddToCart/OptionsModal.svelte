<script lang="ts">
    import ILSProduct from "$lib/interfaces/lightspeed/ILSProduct";
    import {lightspeedClientUtils} from "$lib/utils/lightspeed-utils";
    import Modal from "$lib/components/Modal.svelte";
    import ProductOptions from "$lib/components/ProductOptions.svelte";
    import AddToCart from "$lib/components/modules/AddToCart/AddToCart.svelte";

    export let product: ILSProduct = undefined;

    export let visible = true;

    let variations: Promise<ILSProduct[]> = product.options.length ? new Promise(getVariations) : undefined;
    let isError = false;

    async function getVariations(): Promise<ILSProduct[]> {
        try {
            let resp = await lightspeedClientUtils.getVariations(product.id);
            variations = resp;
            return resp;
        } catch (error) {
            console.error(error);
            isError = true;
        }
    }
</script>

{#if product.options.length && Array.isArray(variations)}
    <Modal bind:visible>
        <form class="w-full flex flex-col">
            <ProductOptions {product} {variations}/>
            <AddToCart {product}/>
        </form>
    </Modal>
{/if}
