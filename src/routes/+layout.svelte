<script>
// @ts-nocheck

  import { invalidate } from '$app/navigation'
  import { onMount } from 'svelte'
  import Login from '$lib/components/Login.svelte'

  // get data returned by srver and client load
  export let data;

  let { supabase, session } = data;

  // $ defines the values as reactive so that changes in values automatically update dependants.
  $: ({ supabase, session } = data);


  // Check whats happening to the session
  // console.log('session: ', JSON.stringify(session));

  // executes after the page renders
  // Check if session is valid, if not: invalidate
  onMount(() => {
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((event, _session) => {
      if (_session?.expires_at !== session?.expires_at) {
        invalidate('supabase:auth');
      }
    })

    return () => subscription.unsubscribe();
  });

  // logout() function - sign out and invalidate the session
  async function logout() {
    await supabase.auth.signOut();
  }

</script>

<nav class="navbar navbar-expand-sm navbar-dark bg-dark static-top">
    <ul class="navbar-nav ml-auto">
        <li class="nav-item">
            <a class="nav-link" href="/">Home</a>
        </li>
        <li class="nav-item">
            <a class="nav-link" href="/about">About</a>
        </li>
        <li class="nav-item">
            <a class="nav-link" href="/contact">Contact</a>
        </li>
        <li class="nav-item">
            <a class="nav-link" href="/locations">Locations</a>
        </li>
        <li class="nav-item">
            <a class="nav-link" href="/register">Register</a>
        </li>
        <li>
        <!-- use session state to show login or logout -->
        {#if !session}
            <button id="Login" type="button" class="btn nav-link btn-color" 
            data-bs-toggle="modal" data-bs-target="#loginModal">
            Login
            </button>
        {:else}
            <button on:click={logout} id="Logout" type="button" 
            class="btn nav-link btn-color">
            Logout
            </button>
        {/if}
        </li>
    </ul>
</nav>
<style>
	nav a {
		color: yellow;
	}
    .btn-color {
        color: yellow;
    }


</style>
<!-- show session -->
<p>session: {JSON.stringify(session)}</p>

<slot />

<!-- Load the login component (displays as a modal) -->
<Login bind:supabase={data.supabase}/>