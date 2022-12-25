<script lang="ts">
    import {createEventDispatcher} from "svelte";
    import {firebaseClientUtils} from "$lib/utils/firebase/firebase-client-utils";

    export let src;
    export let fileName: string;
    export let multiple: boolean = false;
    let input;
    let uploading: boolean = false;
    const dispatcher = createEventDispatcher();

    // TODO: Need to allow single or multiple media upload
    // TODO: Need to only upload when clicking submit
    // TODO: Need to delete last tied uploaded file to this component and delete it
    export async function uploadMedia(): Promise<string[]> {
        let files: FileList = input.files;
        if (!files.length) return;

        dispatcher('change', files)

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

        return result.filter((obj) => obj !== undefined);
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
        })
    }
</script>

<div class="w-full flex flex-col justify-center items-center">
    <h1>Video File <strong>(.mp4 only)</strong></h1>
    <input bind:this={input} on:change={onChange} type="file" accept="video/mp4" alt="" {multiple}/>
</div>