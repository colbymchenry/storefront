<script lang="ts">
    import Component from "$lib/components/component/Component.svelte";
    import {schema} from "./schema";
    import ILSProduct from "$lib/interfaces/lightspeed/ILSProduct";
    import {onDestroy, tick} from "svelte";
    import {formHelper} from "$lib/utils/form-helper";
    import {cart} from "$lib/stores/cart";
    import Swal from "sweetalert2";
    import {Pulse} from 'svelte-loading-spinners';
    import OptionsModal from "$lib/components/modules/AddToCart/OptionsModal.svelte";
    import {activeModal} from "$lib/stores/modals";
    import AuthModal from "$lib/components/AuthModal/AuthModal.svelte";
    import {cookies} from "$lib/stores/cookies.js";
    import {goto} from "$app/navigation";

    export let clazz: string = undefined;

    export let product: ILSProduct = undefined;

    export let showOptions: boolean = false;

    export let style: string = undefined;

    let loading: boolean = false;

    let isDisabled: boolean = false;

    let button: HTMLFormElement;

    let interval;

    let cartUpdated: boolean = false

    function useFormCheck(node) {
        let form = node.closest("form");
        if (!form) return;

        interval = setInterval(() => {
            node.classList.remove("hidden");
            let formData = formHelper.getFormData(form);
            if (formData["variant"]) {
                if (Object.values(formData["variant"]).find((amount) => parseInt(amount) > 0)) {
                    isDisabled = false;
                } else {
                    // TODO: Need to check variant stock
                    isDisabled = true;
                }
            } else if (formData["amount"] && !product.unlimited) {
                isDisabled = parseInt(formData["amount"]) > product.quantity;
            } else {
                clearInterval(interval);
            }
        }, 100);
    }

    onDestroy(() => {
        if (interval) {
            clearInterval(interval);
        }
    })


    async function onSubmit(e) {
        if (loading) return;
        let form = e.target.closest("form");
        if (!form) return;
        loading = true;

        let formData = formHelper.getFormData(form);

        if (formData.variant) {
            Object.entries(formData.variant).map(async ([id, amount]) => {
                if (parseInt(amount) > 0) {
                    let combo = product.combinations.find((c) => c.id === parseInt(id));

                    await cart.addProduct(null, {
                        id: product.id,
                        quantity: parseInt(amount),
                        options: {
                            optionName: combo.options[0].value
                        },
                        callback: function (success, product, cart, error, error1, error2) {
                            // todo take into account what's in cart with what's in quantity
                            loading = false;
                            if (!success) {
                                Swal.fire({
                                    title: 'Uh-oh',
                                    text: 'Product is not available.',
                                    icon: 'warning',
                                    confirmButtonText: 'Ok',
                                    confirmButtonColor: '#000'
                                })
                            } else {
                                cartUpdated = true;
                                setTimeout(() => {
                                    cartUpdated = false;
                                }, 2500);
                            }
                        },
                    });
                }
            })
        } else {
            await cart.addProduct(product.id);
            cartUpdated = true;
            setTimeout(() => {
                cartUpdated = false;
            }, 2500);
            loading = false;
        }
    }

    async function showOptionsModal() {
        $activeModal = undefined;
        await tick();
        $activeModal = {
            component: OptionsModal,
            props: {
                product
            }
        }
    }

    async function showAuthModal() {
        $activeModal = undefined;
        await tick();
        $activeModal = {
            component: AuthModal,
            props: {}
        }
    }
</script>

<Component {schema} let:props>
    <button use:useFormCheck type="button"
            on:click|preventDefault|stopPropagation={!$cookies.authenticated ? showAuthModal() : !$cookies.pactActApproved ? goto("/account/pact-act-form") : showOptions && product.options.length ? showOptionsModal : onSubmit}
            disabled={$cookies.authenticated && $cookies.pactActApproved && $cookies.email_verified && (!product.inStock || !product.enabled || isDisabled)}
            class:cartUpdated
            {style}
            class={`${clazz} hidden relative transition flex justify-center items-center w-full px-3 py-3 bg-${props.bgColor} text-${props.textColor} ${props.borderRadius} ${props.dropShadow} ${props.fontSize}`}>
        {#if !$cookies.authenticated}
            Login Required
        {:else if !$cookies.email_verified}
            Verify Email
        {:else if !$cookies.pactActApproved}
            Pact Act Form
        {:else if loading}
            <Pulse color="#FFFFFF" unit="px" duration="1s"/>
        {:else if cartUpdated}
            Cart Updated! <span class="material-symbols-outlined ml-2">check_circle</span>
        {:else if product.options.length && showOptions}
            View Options
        {:else if !product.enabled}
            Not Available
        {:else if !product.inStock}
            Out of Stock
        {:else}
            {props.title}
        {/if}
    </button>
</Component>

<style lang="scss">

  button:disabled {
    @apply cursor-not-allowed;
    &:before {
      @apply absolute top-0 left-0 w-full h-full bg-white opacity-50;
      content: '';
    }
  }

  .cartUpdated {
    @apply bg-green-600 text-white;
  }
</style>
