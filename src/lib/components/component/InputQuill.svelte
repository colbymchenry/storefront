<script lang="ts">
    import {browser} from "$app/environment";
    import {onDestroy, onMount} from "svelte";

    export let value;
    export let name: string;
    let input;
    let container: HTMLElement;
    let loadedQuill: boolean = false;

    $: if (container && !loadedQuill && browser) {
        if (window?.Quill) {
            new window.Quill(container, {
                theme: 'snow'
            }).on('text-change', function (eventName, ...args) {
               value = container.querySelector('.ql-editor').innerHTML;
            });
            loadedQuill = true;
        }
    }

    onDestroy(() => {
        if (browser) {
            Array.from(document.getElementsByClassName('ql-toolbar')).forEach((elem) => elem.remove());
        }
    });

    onMount(() => {
        setTimeout(() => {
            if (input && input.value) {
                value = input.value;
                container.querySelector('.ql-editor').innerHTML = input.value;
            }
        }, 300);
    })
</script>

<div bind:this={container}>
</div>

{#if name}
    <input bind:this={input} type="hidden" bind:value {name}/>
{/if}