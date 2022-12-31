<script lang="ts">
    export let fontSize: 'lg' | 'md' | 'sm' | 'xs' = 'lg';
</script>

<div class="flex w-full items-center my-3">
    <div class="bg-gray-300" style="width: 5%;height:2px;"></div>
    <span class={`text-gray-400 px-2 font-medium text-${fontSize}`}><slot /></span>
    <div class="bg-gray-300 flex-grow" style="height:2px;"></div>
</div>