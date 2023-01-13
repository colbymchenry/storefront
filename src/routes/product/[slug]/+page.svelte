<script lang="ts">
    import type ILSProduct from "$lib/interfaces/lightspeed/ILSProduct";
    import ProductOptions from "./_components/ProductOptions.svelte";

    export let data;

    let product: ILSProduct = data["product"];
    let variations: ILSProduct[] = data["variations"];
</script>

<div class="product-container">
    <ProductOptions {product} {variations} />
</div>

