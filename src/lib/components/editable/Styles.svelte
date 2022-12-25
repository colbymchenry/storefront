<script lang="ts">
    import ColorPicker from "$lib/components/ColorPicker.svelte";
    import type IThemeObject from "$lib/interfaces/IThemeObject";

    export let currentEdits: IThemeObject;
</script>

<div class="flex flex-col w-full">
    <div class="w-full grid grid-cols-2 gap-7">
        <div class="flex flex-col">
            <span class="font-bold text-sm">Padding:</span>
            <div class="padding mt-2">
                <div class="flex items-center">
                    L:
                    <input type="number" bind:value={currentEdits.padding.left} placeholder="0" step="0.25"/>
                </div>
                <div class="flex items-center">
                    T:
                    <input type="number" bind:value={currentEdits.padding.top} placeholder="0" step="0.25"/>
                </div>
                <div class="flex items-center">
                    R:
                    <input type="number" bind:value={currentEdits.padding.right} placeholder="0" step="0.25"/>
                </div>
                <div class="flex items-center">
                    B:
                    <input type="number" bind:value={currentEdits.padding.bottom} placeholder="0" step="0.25"/>
                </div>
            </div>
        </div>
        <div class="flex flex-col">
            <span class="font-bold text-sm">Margin:</span>
            <div class="padding mt-2">
                <div class="flex items-center">
                    L:
                    <input type="number" bind:value={currentEdits.margin.left} placeholder="0" step="0.25"/>
                </div>
                <div class="flex items-center">
                    T:
                    <input type="number" bind:value={currentEdits.margin.top} placeholder="0" step="0.25"/>
                </div>
                <div class="flex items-center">
                    R:
                    <input type="number" bind:value={currentEdits.margin.right} placeholder="0" step="0.25"/>
                </div>
                <div class="flex items-center">
                    B:
                    <input type="number" bind:value={currentEdits.margin.bottom} placeholder="0" step="0.25"/>
                </div>
            </div>
        </div>
    </div>


    <div class="grid grid-cols-2 justify-between mt-4 pt-4 border-t border-solid border-gray-200 gap-y-2 gap-x-6">
        <div class="flex items-center">
            <label class="font-bold mr-2 text-sm">Text Color: </label>
            <ColorPicker color={currentEdits?.textColor?.replace('text', 'bg')} on:change={({detail}) => {
                    currentEdits.textColor = detail.replace('bg', 'text');
                }}/>
        </div>
        <div class="flex items-center" style="justify-self: flex-end;">
            <label class="font-bold mr-2 text-sm">Background Color: </label>
            <ColorPicker bind:color={currentEdits.bgColor}/>
        </div>

        <div class="w-full flex flex-wrap justify-between items-center my-2 col-span-2 gap-y-2">
            <div class="flex items-center font-bold text-sm">Bold: <input type="checkbox" name="isBold" class="ml-2 scale-125" bind:checked={currentEdits.isBold} /></div>
            <div class="flex items-center font-bold text-sm">Italic: <input type="checkbox" name="isItalic" class="ml-2 scale-125" bind:checked={currentEdits.isItalic} /></div>
            <div class="flex items-center font-bold text-sm">Strike:  <input type="checkbox" name="isStrikethrough" class="ml-2 scale-125" bind:checked={currentEdits.isStrikethrough} /></div>
            <div class="flex items-center font-bold text-sm">Underline:  <input type="checkbox" name="isUnderline" class="ml-2 scale-125" bind:checked={currentEdits.isUnderline} /></div>
            <div class="flex items-center font-bold text-sm">Overline:  <input type="checkbox" name="isOverline" class="ml-2 scale-125" bind:checked={currentEdits.isOverline} /></div>
        </div>

        <div class="flex flex-col">
            <label class="font-bold mb-2 text-sm">Font Size:</label>
            <select bind:value={currentEdits.fontSize}>
                <option value="text-base" default>base</option>
                <option value="text-xs">xs</option>
                <option value="text-sm">sm</option>
                <option value="text-lg">lg</option>
                <option value="text-xl">xl</option>
                <option value="text-2xl">2xl</option>
                <option value="text-3xl">3xl</option>
                <option value="text-4xl">4xl</option>
                <option value="text-5xl">5xl</option>
                <option value="text-6xl">6xl</option>
                <option value="text-7xl">7xl</option>
                <option value="text-8xl">8xl</option>
                <option value="text-9xl">9xl</option>
            </select>
        </div>
        <div class="flex flex-col">
            <label class="font-bold mb-2 text-sm">Rounded Edges:</label>
            <select bind:value={currentEdits.rounded}>
                <option value="rounded-none" default>none</option>
                <option value="rounded-sm">small</option>
                <option value="rounded">normal</option>
                <option value="rounded-md">medium</option>
                <option value="rounded-lg">large</option>
                <option value="rounded-xl">xlarge</option>
                <option value="rounded-2xl">xxlarge</option>
                <option value="rounded-3xl">xxxlarge</option>
                <option value="rounded-full">full</option>
            </select>
        </div>
        <div class="flex flex-col">
            <label class="font-bold mb-2 text-sm">Box Shadow:</label>
            <select bind:value={currentEdits.boxShadow}>
                <option value="shadow-none" default>none</option>
                <option value="shadow-sm">small</option>
                <option value="shadow">normal</option>
                <option value="shadow-md">medium</option>
                <option value="shadow-lg">large</option>
                <option value="shadow-xl">xlarge</option>
                <option value="shadow-2xl">xxlarge</option>
                <option value="shadow-inner">inner</option>
            </select>
        </div>
        <div class="flex flex-col">
            <label class="font-bold mb-2 text-sm">Drop Shadow:</label>
            <select bind:value={currentEdits.dropShadow}>
                <option value="drop-shadow-none" default>none</option>
                <option value="drop-shadow-sm">small</option>
                <option value="drop-shadow">normal</option>
                <option value="drop-shadow-md">medium</option>
                <option value="drop-shadow-lg">large</option>
                <option value="drop-shadow-xl">xlarge</option>
                <option value="drop-shadow-2xl">xxlarge</option>
            </select>
        </div>
    </div>

</div>

<style lang="scss">
  .padding {
    @apply grid grid-cols-2 gap-4 overflow-hidden;
  }
</style>