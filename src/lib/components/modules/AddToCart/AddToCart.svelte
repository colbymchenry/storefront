<script lang="ts">
    import Component from "$lib/components/component/Component.svelte";
    import {schema} from "./schema";
    import ILSProduct from "$lib/interfaces/lightspeed/ILSProduct";

    export let product: ILSProduct = undefined;
</script>

<Component {schema} let:props>
    <button type="submit"
            class={`w-full px-3 py-3 bg-${props.bgColor} text-${props.textColor} ${props.borderRadius} ${props.dropShadow} ${props.fontSize}`}>
        {props.title}
    </button>
</Component>
