<script lang="ts">
    import ILSProduct from "$lib/interfaces/lightspeed/ILSProduct";
    import QuantityButton from "$lib/components/QuantityButton.svelte";

    export let product: ILSProduct = undefined;
    export let variations: ILSProduct[] = undefined;
    function getVariation(option, choice) {
        return variations.find((variation: any) => variation.options.find((v) => v.name === option.name && v.value === choice.text));
    }
</script>

{#each product.options as option}
    <div class="options">
        <h1>{option.name}</h1>
        <div class="choices">
            <table>
                <thead>
                <tr>
                    <th></th>
                    <th>{option.name}</th>
                    <th>Price</th>
                    <th>Quantity</th>
                </tr>
                </thead>
                <tbody>
                {#each option.choices as choice}
                    <tr class="option">
                        <td>
                            <!-- Option Image -->
                            {#if getVariation(option, choice)?.imageUrl}
                                <img src={getVariation(option, choice).imageUrl} loading="lazy"
                                     alt={choice.text + ' product image.'}/>
                            {:else}
                                <div class="flex items-center justify-center flex-grow">
                                    <span class="material-symbols-outlined text-gray-300" style="font-size: 3rem;">category</span>
                                </div>
                            {/if}
                        </td>
                        <!-- Option text -->
                        <td class="px-3">
                            <div class="flex flex-col">
                                {choice.text}
                                {#if getVariation(option, choice)?.attributes?.length && getVariation(option, choice).attributes.find((attr) => attr.name === 'UPC')}
                                    <small class="text-gray-500">UPC: {getVariation(option, choice).attributes.find((attr) => attr.name === 'UPC').value}</small>
                                {/if}
                            </div>
                        </td>
                        <!-- Price -->
                        <td>{getVariation(option, choice).defaultDisplayedPriceFormatted}</td>
                        <!-- Quantity-->
                        <td>
                            {#if getVariation(option, choice).inStock}
                                <QuantityButton name={`variant.${getVariation(option, choice).id}`} />
                            {:else}
                                <span class="py-1 px-3 bg-gray-300 text-red-600">Out of stock</span>
                            {/if}
                        </td>
                    </tr>
                {/each}
                </tbody>
            </table>


        </div>
    </div>
{/each}

<style lang="scss">
  .options {
    @apply flex flex-col p-3 bg-white border border-solid border-gray-300 shadow-md float-left;
    h1 {
      @apply font-medium;
    }

    .choices {
      @apply flex flex-col;

      table {
        table-layout: fixed;

        th, td {
          @apply px-3;
          vertical-align: middle;
          text-align: left;
        }

        th {
          @apply font-medium;
        }
      }

      .option {
        @apply overflow-hidden;

        td {
          @apply py-1;
        }

        img {
          @apply border-2 border-solid border-gray-200;
          height: 3rem;
          width: auto;
        }

        span {
        }
      }
    }
  }
</style>