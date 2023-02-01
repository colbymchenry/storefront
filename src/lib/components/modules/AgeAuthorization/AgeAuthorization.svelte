<script lang="ts">
    import Component from "$lib/components/component/Component.svelte";
    import {schema} from "./schema";
    import {store} from "$lib/stores/store.js";
</script>
<!--use:enhance={() => {-->
<!--    return ({ update }) => {-->
<!--        update({ reset: false });-->
<!--    };-->
<!--}}-->
<div class="topContainer">
    <div class="video">
        <video autoplay muted loop playsinline style="opacity: 1;">
            <source type="video/mp4" src="https://storage.googleapis.com/mifland2/mp4_V1.mp4">
        </video>
        <span class="video-text__image" aria-hidden="true">
            <figure>
                <img src="//cdn.shopify.com/s/files/1/0273/8107/1925/files/M_Pattern_hat_860x.jpg?v=1638200841" alt=""
                     srcset="data:image/gif;base64,R0lGODlhAQABAAAAACH5BAEKAAEALAAAAAABAAEAAAICTAEAOw=="
                     data-srcset="//cdn.shopify.com/s/files/1/0273/8107/1925/files/M_Pattern_hat_320x.jpg?v=1638200841 260w, //cdn.shopify.com/s/files/1/0273/8107/1925/files/M_Pattern_hat_600x.jpg?v=1638200841 480w, //cdn.shopify.com/s/files/1/0273/8107/1925/files/M_Pattern_hat_860x.jpg?v=1638200841 720w, //cdn.shopify.com/s/files/1/0273/8107/1925/files/M_Pattern_hat_1100x.jpg?v=1638200841 960w, //cdn.shopify.com/s/files/1/0273/8107/1925/files/M_Pattern_hat_1600x.jpg?v=1638200841 1440w, //cdn.shopify.com/s/files/1/0273/8107/1925/files/M_Pattern_hat_2100x.jpg?v=1638200841 1920w"
                     data-sizes="auto" class="img lazyload" itemprop="image">
                    <span class="lazy-preloader"></span>
                <noscript><span class="ll-fallback"
                                style="background-image:url('//cdn.shopify.com/s/files/1/0273/8107/1925/files/M_Pattern_hat_860x.jpg?v=1638200841')"></span></noscript>
            </figure>
        </span>
    </div>

    <Component {schema} let:props>
        <div class="flex flex-col parent bg-white">
            <div class={`w-full p-3 text-center bg-${props?.titleBgColor}`}>
                <h1 class={`text-${props?.titleTextColor}`}>{props.title}</h1>
            </div>

            {#if props?.logo || $store?.logo}
                <img src={props?.logo || $store?.logo} loading="lazy" alt="company logo"
                     style={`height: ${props?.logoHeight}px;object-fit: contain;`}/>
            {/if}

            <div class="w-full flex flex-col">
                <div class="w-full text-black flex-grow py-12 px-6">
                    {@html props?.content || ""}
                </div>
                <form method="POST" action="/?/enter" class="w-full flex justify-center">
                    <button type="submit"
                            class={`mb-8 bg-${props?.buttonBgColor} text-${props?.buttonTextColor} py-2 px-5`}
                            style="align-self: center;">{props?.buttonText || "ENTER"}</button>
                </form>
            </div>

        </div>
    </Component>
</div>

<style lang="scss">
  .topContainer {
    @apply fixed top-0 left-0 w-screen h-screen flex items-center justify-center bg-black;
    z-index: 1000000;
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

  .video {
    @apply absolute top-0 left-0 w-screen h-screen;
    
    min-width: 100vw !important;
    min-height: 100vh !important;

    video {
      @apply w-full h-full object-cover min-w-full min-h-full;
    }
  }

  figure {
    img {
      position: absolute;
      top: 0;
      left: 0;
      height: 100%;
      width: 100%;
      object-fit: cover;
    }
  }
</style>