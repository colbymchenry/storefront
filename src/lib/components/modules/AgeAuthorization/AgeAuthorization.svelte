<script lang="ts">
    import Component from "$lib/components/component/Component.svelte";
    import {schema} from "./schema";

    let inputLogo;
</script>
<!--use:enhance={() => {-->
<!--    return ({ update }) => {-->
<!--        update({ reset: false });-->
<!--    };-->
<!--}}-->
<div class="container">
    <Component {schema} let:props>
        <div class="flex flex-col parent">
            <div class={`w-full p-3 text-center bg-${props?.titleBgColor}`}>
                <h1 class={`text-${props?.titleTextColor}`}>{props.title}</h1>
            </div>

            {#if inputLogo?.src || props?.logo}
                <img src={inputLogo?.src || props.logo} loading="lazy" alt="company logo"/>
            {/if}

            <div class="w-full flex flex-col bg-white">
                <div class="w-full text-black flex-grow py-12 px-6">
                    {@html props?.content || ""}
                </div>
                <form method="POST" action="?/enter" class="w-full flex justify-center">
                    <button type="submit"
                            class={`mb-8 bg-${props?.buttonBgColor} text-${props?.buttonTextColor} py-2 px-5`}
                            style="align-self: center;">{props?.buttonText || "ENTER"}</button>
                </form>
            </div>

        </div>
    </Component>
</div>

<style lang="scss">
  .container {
    @apply fixed top-0 left-0 w-screen h-screen flex items-center justify-center bg-black;
    max-width: none !important;

    > div:first-of-type {
      @apply flex flex-col;
      max-width: 400px;
      min-width: 400px;
      height: 500px;
    }
  }

  .parent {
    max-width: 400px;
  }
</style>