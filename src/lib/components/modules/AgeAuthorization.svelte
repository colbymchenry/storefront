<script lang="ts">
    import Component from "$lib/components/component/Component.svelte";
    import Input from "$lib/components/component/Input.svelte";
    import ColorPicker from "$lib/components/ColorPicker.svelte";
    import SectionHeader from "$lib/components/component/SectionHeader.svelte";
    import InputMedia from "$lib/components/component/InputMedia.svelte";
    import InputQuill from "$lib/components/component/InputQuill.svelte";
    import { enhance } from '$app/forms';

    let inputLogo;
</script>
<!--use:enhance={() => {-->
<!--    return ({ update }) => {-->
<!--        update({ reset: false });-->
<!--    };-->
<!--}}-->
<div class="container">
    <Component title="Age Authorization" key="age-authorization" let:props submit={async (formData) => {
        await inputLogo.upload();
    }}>

        <div class="flex flex-col parent">
            <div class={`w-full p-3 text-center bg-${props?.titleBgColor}`}>
                <h1 class={`text-${props?.titleTextColor || 'white'}`}>{props?.title || "Age Verification"}</h1>
            </div>

            {#if inputLogo?.src || props?.logo}
                <img src={inputLogo?.src || props.logo} loading="lazy" alt="company logo"/>
            {/if}

            <div class="w-full flex flex-col bg-white">
                <div class="w-full text-black flex-grow py-12 px-6">
                    {@html props?.content || ""}
                </div>
                <form
                    method="POST"
                    action="?/enter"
                >
                    <button type="submit"
                            class={`mb-8 bg-${props?.buttonBgColor || 'red-500'} text-${props?.buttonTextColor || 'white'} py-2 px-5`}
                            style="align-self: center;">{props?.buttonText || "ENTER"}</button>
                </form>
            </div>

        </div>

        <svelte:fragment slot="props" let:form>
            <SectionHeader>Title</SectionHeader>
            <Input type="text" name="title" placeholder="Age Verification">Text</Input>
            <div class="w-full flex items-center justify-between mt-6 mb-8">
                <div class="flex items-center">
                    <strong class="mr-2">Text Color</strong>
                    <ColorPicker name="titleTextColor"/>
                </div>
                <div class="flex items-center">
                    <strong class="mr-2">Background Color</strong>
                    <ColorPicker name="titleBgColor"/>
                </div>
            </div>


            <SectionHeader>Body</SectionHeader>

            <div class="w-full flex flex-col">
                <strong class="mb-2">Logo</strong>
                <InputMedia name="logo" fileName={props.key + '/logo.png'} bind:to={inputLogo}/>

                <strong class="mt-6 mb-2">Content</strong>
                <InputQuill name="content"/>

                <div class="flex items-center mt-6 mb-6">
                    <strong class="mr-2">Button BG Color</strong>
                    <ColorPicker name="buttonBgColor"/>
                </div>

                <div class="flex items-center mb-6">
                    <strong class="mr-2">Button Text Color</strong>
                    <ColorPicker name="buttonTextColor"/>
                </div>

                <Input type="text" name="buttonText" placeholder="ENTER">Button Text</Input>
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

  .parent {
    max-width: 400px;
  }
</style>