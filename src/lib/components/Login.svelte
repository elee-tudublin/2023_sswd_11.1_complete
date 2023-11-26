<script>
	 /**
	 * @type {{ auth: { signInWithPassword: (arg0: { email: string; password: string; }) => any; }; }}
	 */
	  export let supabase;

	/** @type {string}*/
	let email;
	/** @type {string}*/
	let password;

	const handleSignIn = async () => {
		await supabase.auth.signInWithPassword({
			email,
			password
		});
	};
</script>

<!-- Modal -->
<div
	class="modal fade"
	id="loginModal"
	tabindex="-1"
	aria-labelledby="modalLogin"
	aria-hidden="true">

	<div class="modal-dialog">
		<div class="modal-content">
			<div class="modal-header">
				<h1 class="modal-title fs-5" id="exampleModalLabel">Login</h1>
				<button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close" />
			</div>
			<div class="modal-body">
				<form>
					<!-- email -->
					<div class="mb-3">
						<label for="email" class="form-label">Email</label>
						<input type="text" name="email" class="form-control" bind:value={email} />
					</div>

					<!-- password -->
					<div class="mb-3">
						<label for="password" class="form-label">Password</label>
						<input type="password" name="password" class="form-control" bind:value={password} />
					</div>
				</form>
				<button on:click="{handleSignIn}" class="btn btn-primary" data-bs-dismiss="modal">Login</button>
			</div>
			<div class="modal-footer">
				<button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
			</div>
		</div>
	</div>
</div>
