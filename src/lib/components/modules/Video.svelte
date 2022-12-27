<script lang="ts">
    export let autoplay: boolean = true;
    export let muted: boolean = true;
    export let loop: boolean = true;
    export let playsinline: boolean = true;
    export let src;

</script>

<video {autoplay} {muted} {loop} {playsinline} style="opacity: 1;">
    <source type="video/mp4" {src}>
</video>