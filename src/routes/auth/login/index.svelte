<script lang="ts" context="module">
  export const load: Load = ({ session, props }) => {
    if (session.user) {
      return {
        status: 302,
        redirect: '/',
      }
    }

    return { props }
  }
</script>

<script lang="ts">
  import { session } from '$app/stores'
  import { send } from '$lib/api'
  import type { Load } from '@sveltejs/kit'

  export let error: string

  async function login(event: SubmitEvent) {
    error = ''

    const formEl = event.target as HTMLFormElement
    const response = await send(formEl)

    if (response.error) {
      error = response.error
    }

    $session.user = response.user

    formEl.reset()
  }
</script>

<form
  on:submit|preventDefault={login}
  method="post"
  autocomplete="off"
>
  <div>
    <label for="username">Username</label>
    <input type="text" id="username" name="username" required />
  </div>
  <div>
    <label for="password">Password</label>
    <input type="password" id="password" name="password" required />
  </div>

  {#if error}
    <p>{error}</p>
  {/if}

  <button type="submit">Sign in</button>
</form>
