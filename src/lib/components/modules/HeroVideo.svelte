<script>
    import Editable from "$lib/components/editable/Editable.svelte";
    import MediaComponent from "$lib/components/editable/MediaComponent.svelte";
    import {firebaseClientUtils} from "$lib/utils/firebase/firebase-client-utils";
    import {theme} from "$lib/stores/theme";
    import Video from "$lib/components/modules/Video.svelte";

    export let key;
    let heroVideo;
    let currentEdits;

    async function onSave(formData) {
        try {
            await firebaseClientUtils.deleteFile(key + '/heroVideo.mp4');
            console.log('Old file deleted.')
        } catch (error) {
            console.log('Old file not found.');
        }
        let video = await heroVideo.uploadMedia();
        currentEdits.props.video = video[0];
    }

    function changeRemove() {
        currentEdits.props.video = undefined;
    }
</script>

<Editable {key} let:styles let:classes bind:currentEdits {onSave}>
    <div class="w-full h-full relative">
        <Video src={$theme[key]?.props?.video}/>
    </div>

    <!-- PROPS -->
    <div slot="props" class="w-full flex flex-col">
        {#if currentEdits}
            <div class="flex flex-col">
                {#if currentEdits?.props?.video}
                    <button type="button" on:click={changeRemove} class="btn bg-gray-200 p-2">Change and Remove</button>
                {:else}
                    <MediaComponent bind:this={heroVideo} fileName={key + "/heroVideo.mp4"}/>
                {/if}
            </div>
        {/if}
    </div>
</Editable>