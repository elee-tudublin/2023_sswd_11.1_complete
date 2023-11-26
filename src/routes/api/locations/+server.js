import { json, error } from '@sveltejs/kit';

// Get all locations
export async function GET({ request, cookies, locals: { supabase, getSession } }) {

    const locations = await supabase
    .from('locations')
    .select('*');

    if (locations.error) {
        return json({
            status: locations.status,
            error: locations.error
        });
    }

    return json({
        data: locations.data,
        status: locations.status
    });
}

// Add a new location
export async function POST({ request, cookies, locals: { supabase, getSession }  }) {

    // auth - check for session
    // see https://supabase.com/docs/guides/auth/auth-helpers/sveltekit
    const session = await getSession()
    if (!session) {
      // the user is not signed in
      throw error(401, { message: 'Unauthorized' })
    }

    let data = await request.json();

    const new_loc = await supabase
    .from('locations')
    .insert([data])
    .select()

    if (new_loc.error) {
        return json({
            status: new_loc.status,
            error: new_loc.error
        });
    }

    return json({
        data: new_loc.data[0],
        status: new_loc.status
    });
}

// Endpoint for locations updates
// Handles HTTP PUT requests for /api/locations
export async function PUT({ request, cookies, locals: { supabase, getSession }  }) {

    const session = await getSession()
    if (!session) {
      // the user is not signed in
      throw error(401, { message: 'Unauthorized' })
    }

    let data = await request.json();

    console.log('update: ', data);

    const updated_loc = await supabase
    .from('locations')
    .update([data])
    .eq('id', data.id)
    .select();

    if (updated_loc.error) {
        return json({
            status: updated_loc.status,
            error: updated_loc.error
        });
    }

    return json({
        data: updated_loc.data[0],
        status: updated_loc.status
    });
}