<script lang="ts">
    import Component from "$lib/components/component/Component.svelte";
    import {schema} from "./schema";
</script>
<!--TODO: Figure out blocks-->
<div class="w-full">
    <Component {schema} let:props>
        <div class={`flex flex-col bg-black`} style={`height: ${props.height}vh;`}>
        </div>
    </Component>
</div>

<style lang="scss">

</style>