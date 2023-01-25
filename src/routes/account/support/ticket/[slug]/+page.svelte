<script lang="ts">
    import {invalidateAll} from '$app/navigation';
    import {formHelper} from "$lib/utils/form-helper";
    import {api} from "$lib/stores/api";
    import Input from "$lib/components/component/Input.svelte";
    import {cookies} from "$lib/stores/cookies.js";

    export let data;

    let success: boolean = false;
    let loading: boolean = false;
    let errors = {};

    async function sendMessage(e) {
        if (loading || success) return;
        let formData = formHelper.getFormData(e.target);

        if (!formData["message"]) {
            errors["message"] = "Type a message before sending.";
            return;
        }

        errors = {};
        loading = true;

        try {
            let res = await api.post('/api/support/message', formData);
            await invalidateAll()
            success = true;

            setTimeout(() => {
                success = false;
            }, 2000);
        } catch (error) {
            console.error(error);
        }

        loading = false;
    }

</script>

<section>
    <h2>Support Ticket - #{data.ticket.id}</h2>
    <div>
        <div class="flex">
            Store - <strong class="ml-2">{data?.ticket?.store}</strong>
        </div>
        <div class="flex">
            Email - <strong class="ml-2">{data?.ticket?.user}</strong>
        </div>
        <div class="flex">
            Status - <strong class="ml-2"
                             class:text-green-600={data?.ticket.open}
                             class:text-gray-400={!data?.ticket.open}
        >{data?.ticket.open ? "Open" : "Closed"}</strong>
        </div>
        <div class="flex">
            Subject - <strong class="ml-2">{data?.ticket?.subject}</strong>
        </div>
    </div>


    <div class="conversation">
        {#each data["messages"] as message}
            <div class:otherParty={message.user_id !== $cookies.user_id}>
                <span>{message?.created_at ? new Date(message.created_at).toLocaleDateString() : ''}</span>
                <div class="flex w-full">
                    {@html message.message}
                </div>
            </div>
        {/each}
    </div>

    <form class="footer" on:submit|preventDefault={sendMessage}>
        <Input type="textarea" clazz="w-full" name="message" required error={errors["message"]}>
            New Message
        </Input>

        <input type="hidden" name="ticket_id" value={data?.ticket?.id}/>

        <button type="submit" class:success
                disabled={loading || success}>{success ? "Message sent!" : loading ? "Please wait..." : "Send message"}</button>
    </form>
</section>

<style lang="scss">
  section {
    @apply flex flex-col w-full min-h-full max-h-fit;

    > div:first-of-type {
      @apply flex flex-col mt-4 flex-shrink;
    }

    .conversation {
      @apply flex flex-col flex-grow overflow-auto mt-8 border border-solid border-gray-200 shadow-md rounded-2xl;

      max-height: 40vh;

      > div {
        @apply flex flex-col my-2;
        align-self: flex-end;
        min-width: 65%;

        &.otherParty {
          align-self: flex-start;
        }

        > span {
          @apply text-gray-400;
        }

        > div {
          @apply bg-blue-500 text-white rounded-lg p-4;
        }
      }
    }

    .footer {
      @apply flex flex-col w-full flex-shrink mt-6;
    }
  }

  button {
    @apply bg-black text-white px-2 py-1 rounded-lg self-start mt-6 transition;

    &.success {
      @apply bg-green-500 text-white;
    }
  }

  h2 {
    @apply text-xl font-medium mb-2;
  }
</style>