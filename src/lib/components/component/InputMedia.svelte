<script lang="ts">
    import {createEventDispatcher, onMount} from "svelte";
    import {firebaseClientUtils} from "$lib/utils/firebase/firebase-client-utils";

    export let src;
    export let fileName: string;
    export let multiple: boolean = false;
    export let video: boolean = false;
    export let name: string;
    export let to;
    const dispatch = createEventDispatcher();
    let input;
    let inputForForm;
    let uploading: boolean = false;

    $: to = {
        src, upload
    }

    // TODO: Need to allow single or multiple media upload
    async function upload(): Promise<string[]> {
        if (!input) return;
        let files: FileList = input.files;
        if (!files.length) return;

        dispatch('change', files)

        // set uploading to true so z-index of avatar is above SweetAlert
        uploading = true;

        let result = await Promise.all(Array.from(files).map(async (file) => {
            try {
                // Upload image to Cloud Storage
                let res = await firebaseClientUtils.uploadFile(file, fileName);

                await firebaseClientUtils.add('media', {
                    url: res
                });

                return res;
            } catch (error) {
                alert('An error occurred.');
                console.error(error);
            }
        }));

        if (multiple) {
            src = result.filter((obj) => obj !== undefined).join(",");
        } else {
            src = result.filter((obj) => obj !== undefined)[0];
        }
        return src;
    }

    function onChange(e) {
        let notified = false;
        Array.from(e.target.files).forEach((file) => {
            let megabytes = (file.size / 1024) / 1024;
            if (megabytes > 20 && !notified) {
                alert(`${file.name} is ${megabytes.toFixed(2)}Mb. The max file size is 20Mb.`);
                input.value = '';
                notified = true;
            }
        });

        dispatch('change', {files: e.target.files, upload})
    }

    onMount(() => {
        setTimeout(() => {
            if (inputForForm && inputForForm.value) {
                src = inputForForm.value;
            }
        }, 300);
    })

</script>

<div class="flex flex-col gap-2">
    {#if src}
        {#if !video}
            <img {src} loading="lazy" style="object-fit: contain;max-width:100%;"/>
        {/if}
        <button type="button" on:click={() => src = undefined} class="btn bg-gray-200 p-2">Change and Remove</button>
    {:else}
        <input bind:this={input} on:change={onChange} type="file" accept={video ? "video/mp4" : "image/*"} alt=""
               {multiple} {name}/>
    {/if}

    {#if video}
        <small>Video File <strong>(.mp4 only)</strong></small>
    {:else}
        <small>Image File <strong>(.png,.jpg only)</strong></small>
    {/if}

    {#if name && src}
        <input bind:this={inputForForm} type="hidden" bind:value={src} {name}/>
    {/if}
</div>