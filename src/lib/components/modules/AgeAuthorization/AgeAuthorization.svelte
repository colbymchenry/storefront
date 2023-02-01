<script lang="ts">
    import Component from "$lib/components/component/Component.svelte";
    import {schema} from "./schema";
    import {store} from "$lib/stores/store.js";
</script>
<div class="topContainer">
    <div class="video">
        <video autoplay muted loop playsinline style="opacity: 1;">
            <source type="video/mp4" src="/smoke.mp4">
        </video>
        <span class="image" aria-hidden="true">
            <figure>
                <img src="/smoke.gif" alt="" itemprop="image">
                    <span class="lazy-preloader"></span>
                <noscript><span class="ll-fallback"
                                style="background-image:url('/smoke.gif')"></span></noscript>
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
    position: absolute;
    min-width: calc(100vw + 2px) !important;
    min-height: calc(100vh + 2px);
    width: auto;
    height: auto;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    transition: opacity .1s linear, background .2s linear;
    object-fit: contain;
    overflow-clip-margin: content-box;
    overflow: clip;
    z-index: -1;

    &::before {
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      content: "";
      opacity: .36;
      z-index: 9;
    }

    video {
      @apply w-full h-full object-cover min-w-full min-h-full;
    }
  }

  .image {
    @apply opacity-0;
  }

  figure {
    -webkit-backface-visibility: hidden;
    will-change: transform;
    transform: scale(1) translateZ(0);
    overflow: hidden;
    transition: background .2s linear,transform .3s linear;
    background-position: center;
    background-size: cover;
    background-repeat: no-repeat;
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%!important;
    z-index: 0;
    padding-top: 0!important;

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