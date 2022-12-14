<script lang="ts">
    import {editor} from "$lib/stores/editor.js";
    import type IThemeObject from "$lib/interfaces/IThemeObject";
    import {theme} from "$lib/stores/theme";
    import {firebaseClientUtils} from "$lib/utils/firebase/firebase-client-utils";
    import Styles from "$lib/components/editable/Styles.svelte";
    import {formHelper} from "$lib/utils/form-helper";
    import {onDestroy, tick} from "svelte";

    export let key: string;

    let themeObj: IThemeObject = $theme[key] || {
        styles: "",
        classes: "",
        padding: {},
        margin: {}
    };

    let currentEdits: IThemeObject = JSON.parse(JSON.stringify(themeObj));

    let containerElem, editorElem;
    let visible: boolean = false;
    let loading: boolean = false;
    let dragging: boolean = false;
    let tab: string = 'styles';
    let propsForm;

    function handleWindowClick(e) {
        if (!containerElem || !editorElem || loading || dragging) return;

        if (!editorElem.contains(e.target) && !containerElem.contains(e.target)) {
            visible = false;
        }
    }

    async function save() {
        if (loading) return;
        loading = true;
        try {
            currentEdits.props = formHelper.getFormData(propsForm);
            $theme[key] = currentEdits;
            await firebaseClientUtils.set("settings", "theme", $theme);
            loading = false;
            visible = false;
        } catch (error) {
            console.error(error);
            alert('An error occurred.. Check console.');
        }
        loading = false;
    }

    async function showEditor(e) {
        visible = true;
        // let editor render
        await tick();
        let body = document.querySelector('BODY');
        body.insertAdjacentElement('beforeend', editorElem);
        editorElem.style.top = e.y + "px";
        editorElem.style.left = e.x + "px";
        editorElem.classList.remove("invisible");
    }

    function handleDrag(e) {
        if (editorElem && dragging) {
            editorElem.style.top = (e.y - 10) + "px";
            editorElem.style.left = (e.x + 10) + "px";
        }
    }

    onDestroy(() => {
        if (editorElem) editorElem.remove();
    });

</script>

<svelte:window on:mousedown={handleWindowClick} on:mousemove={handleDrag} on:mouseup={(e) => {
    if (dragging) {
        dragging = false;
        e.preventDefault();
        e.stopPropagation();
    }
}}/>

{#if $editor}
    <div bind:this={containerElem} class="editable-content" class:visible on:click={showEditor}>
        <slot {currentEdits} styles={`
            padding-left: ${currentEdits.padding.left || 0}rem;
            padding-top: ${currentEdits.padding.top || 0}rem;
            padding-right: ${currentEdits.padding.right || 0}rem;
            padding-bottom: ${currentEdits.padding.bottom || 0}rem;
            margin-left: ${currentEdits.margin.left || 0}rem;
            margin-top: ${currentEdits.margin.top || 0}rem;
            margin-right: ${currentEdits.margin.right || 0}rem;
            margin-bottom: ${currentEdits.margin.bottom || 0}rem;
        `} classes={`
             ${currentEdits.bgColor || ""}
             ${currentEdits.textColor || ""}
             ${currentEdits.rounded || ""}
             ${currentEdits.dropShadow || ""}
             ${currentEdits.boxShadow || ""}
             ${currentEdits.fontSize || ""}
             ${currentEdits.isBold ? "font-bold" : ""}
             ${currentEdits.isItalic ? "italic" : ""}
             ${currentEdits.isStrikethrough ? "line-through" : ""}
             ${currentEdits.isUnderline ? "underline" : ""}
             ${currentEdits.isOverline ? "overline" : ""}
         `}/>

        {#if visible}
            <div bind:this={editorElem} class="editor invisible">
                <div class="tabs">
                    <div class:active={tab === 'styles'} on:click={() => tab = 'styles'}>
                        <span class="material-symbols-outlined mr-2">format_paint</span>
                        Styles
                    </div>
                    <div class:active={tab === 'properties'} on:click={() => tab = 'properties'}>
                        <span class="material-symbols-outlined mr-2">settings</span>
                        Properties
                    </div>

                    <button class="absolute top-0 left-0 bg-gray-300 rounded" class:cursor-grab={!dragging}
                            class:cursor-grabbing={dragging}
                            style="margin-left: -1.75rem;" on:mousedown={() => dragging = true}>
                        <span class="material-symbols-outlined mt-1 text-gray-700">drag_indicator</span>
                    </button>
                </div>

                <div class="w-full flex flex-col overflow-hidden flex-grow">

                    <div class="w-full flex flex-col flex-grow overflow-y-auto overflow-x-hidden p-4">
                        <div class:hidden={tab !== 'styles'}>
                            <Styles bind:currentEdits/>
                        </div>

                        <div class:hidden={tab !== 'properties'}>
                            <form bind:this={propsForm}>
                                <slot name="props"/>
                            </form>
                        </div>
                    </div>

                    <div class="footer">
                        <span class="font-bold">#{key}</span>
                        <button class="save-btn" class:loading disabled={loading}
                                on:click={save}>
                            {#if loading}
                                Please wait...
                            {:else}
                                Save
                            {/if}
                        </button>
                    </div>
                </div>
            </div>
        {/if}
    </div>
{:else}
    <slot {currentEdits} styles={`
            padding-left: ${currentEdits.padding.left || 0}rem;
            padding-top: ${currentEdits.padding.top || 0}rem;
            padding-right: ${currentEdits.padding.right || 0}rem;
            padding-bottom: ${currentEdits.padding.bottom || 0}rem;
            margin-left: ${currentEdits.margin.left || 0}rem;
            margin-top: ${currentEdits.margin.top || 0}rem;
            margin-right: ${currentEdits.margin.right || 0}rem;
            margin-bottom: ${currentEdits.margin.bottom || 0}rem;
        `} classes={`
             ${currentEdits.bgColor || ""}
             ${currentEdits.textColor || ""}
             ${currentEdits.rounded || ""}
             ${currentEdits.dropShadow || ""}
             ${currentEdits.boxShadow || ""}
             ${currentEdits.fontSize || ""}
             ${currentEdits.isBold ? "font-bold" : ""}
             ${currentEdits.isItalic ? "italic" : ""}
             ${currentEdits.isStrikethrough ? "line-through" : ""}
             ${currentEdits.isUnderline ? "underline" : ""}
             ${currentEdits.isOverline ? "overline" : ""}
         `}/>
{/if}

<style lang="scss">
  .editable-content {
    @apply w-full flex flex-col cursor-pointer hover:border-4 border-solid border-blue-700 relative;

    &.visible {
      @apply border-4;
    }
  }

  .editor {
    @apply cursor-auto fixed flex flex-col bg-white shadow-md rounded-lg transition;
    margin-bottom: -480px;
    width: 400px;
    height: 480px;
  }

  .tabs {
    @apply flex w-full items-center bg-gray-200 rounded-t-lg overflow-hidden;
    min-height: 2rem;
    max-height: 2rem;

    div {
      @apply flex justify-center items-center flex-grow cursor-pointer text-sm h-full;

      &.active {
        @apply bg-slate-700 text-slate-400;
      }
    }
  }

  .footer {
    @apply flex w-full justify-between items-center p-2;
    height: 3rem;

    .save-btn {
      @apply text-white px-3 py-1 rounded-lg bg-blue-500 hover:bg-blue-600 transition;

      &:disabled, &.loading {
        @apply bg-blue-300;
      }
    }

  }
</style>