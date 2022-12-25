<script lang="ts">
    import Component from "$lib/components/component/Component.svelte";
    import Input from "$lib/components/component/Input.svelte";
    import ColorPicker from "$lib/components/ColorPicker.svelte";
    import SectionHeader from "$lib/components/component/SectionHeader.svelte";
</script>

<div class="container">
    <Component title="Age Authorization" key="age-authorization" let:props>

        <div clazz={`w-full p-3 text-center ${props?.titleBgColor}`}>
            <h1 class={`text-white ${props?.titleTextColor}`}>{props?.title || "Age Verification"}</h1>
        </div>

        <div clazz="w-full p-3 text-black bg-white flex-grow">

        </div>

        <svelte:fragment slot="props">
            <SectionHeader>Title</SectionHeader>
            <Input type="text" name="title" placeholder="Age Verification">Text</Input>
            <div class="w-full flex items-center justify-between mt-6">
                <div class="flex items-center">
                    <strong class="mr-2">Text Color</strong>
                    <ColorPicker name="titleTextColor" />
                </div>
                <div class="flex items-center">
                    <strong class="mr-2">Background Color</strong>
                    <ColorPicker name="titleBgColor" />
                </div>
            </div>
        </svelte:fragment>

    </Component>
</div>

<style lang="scss">
  .container {
    @apply fixed top-0 left-0 w-screen h-screen flex items-center justify-center bg-black;
    max-width: none !important;

    > div:first-of-type {
      @apply flex flex-col;
      width: 400px;
      height: 500px;
    }
  }
</style>