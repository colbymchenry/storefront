<script lang="ts">
    import {schema} from "$lib/components/modules/FeaturedCollection/schema";
    import Component from "$lib/components/component/Component.svelte";
    import {lightspeedClientUtils} from "$lib/utils/lightspeed-utils";

    export let key: string = undefined;

    let props: any;
    let products = undefined;
    let fetching: boolean = false;

    // TODO: Get products
    async function fetchProducts() {
        if (fetching) return;
        fetching = true;

        try {
            let params = new URLSearchParams();
            params.append('categories', props.collection);
            let res = await lightspeedClientUtils.getProducts(params);
            products = res.data.items;
        } catch (error) {
            console.error(error);
        }
    }

    $: if (props?.collection && !products && !fetching) {
        fetchProducts();
    }
</script>

<Component {schema} {key} bind:props>
    <section class={`flex`} style={`min-height: ${props.height}vh;max-height: ${props.height}vh;`}>
        <h1>{props.title}</h1>
        {#if !props.collection}
            <h1>Pick a collection</h1>
        {:else if fetching}

        {/if}
    </section>
</Component>

<style lang="scss">
  section {
    @apply w-full;
  }

  h1 {
    @apply text-2xl;
  }
</style>


