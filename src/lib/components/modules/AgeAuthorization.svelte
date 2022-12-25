<script lang="ts">
    import Component from "$lib/components/component/Component.svelte";
    import Input from "$lib/components/component/Input.svelte";
</script>

<div class="container">
    <Component title="Age Authorization" key="age-authorization" let:props>

        <div clazz="w-full p-3 text-center">
            <h1 class={`text-white`}>{props?.title || "Age Verification"}</h1>
        </div>

        <div clazz="w-full p-3 text-black bg-white flex-grow">

        </div>

        <svelte:fragment slot="props">
            <Input type="text" name="title" placeholder="Age Verification">Title</Input>
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