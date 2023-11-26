// https://superforms.rocks/get-started
// 1. npm i -D sveltekit-superforms zod

// import dependencies
// Zod: validator
// superforms: form helper
import { fail } from '@sveltejs/kit';
import { z } from 'zod';
import { superValidate, message } from 'sveltekit-superforms/server';

// Define the form schema and validation requirments
// this is a basic example
//for more see Zod Doc: https://zod.dev/
const schema = z.object({
    id: z.number().optional(),
    category_id: z.number(),
    name: z.string(),
    description: z.string(),
    longitude: z.number(),
    latitude: z.number(),
    shared: z.boolean().default(false),
    favourite: z.boolean().default(false)
});

// Page load
// Build the form and returns to page
export async function load({ fetch, params }) {

    // Check if id parameter exists - this indicates an update operation
    // Get the location from DB
    let loc_update = null;

    // check if the optional id param is set
    // if it is then get that location by id from Supabase.
    if (params.id) {
        const response = await fetch(`/api/locations/${params.id}`)
        const json = await response.json();
        loc_update = json.data;
    }

    // Build form
    // if loc_update.data is null, default values for the schema will be returned.
    // Otherwise, the form will be filled with the location to be updated.
    const form = await superValidate(loc_update, schema);

    // Get categories (to display in a select list in the form)
    let categories;
    const response = await fetch('/api/categories');

    // if resonse code 200 (ok)
    if (response.ok) {
        // get json from resonse
        categories = await response.json();
    }

    // Return form and categories
    return {
        form,
        categories: categories.data,
    };
}

// Form actions (e.g. what to do when submit happens)
export const actions = {
    // default form submit
    default: async ({ request, fetch }) => {
        // retrieve form data and validate
        const form = await superValidate(request, schema);
        //console.log('POST', form);

        let http_method = 'POST';

        if (!form.valid) {
            return fail(400, { form });
        }

        if (form.id != null && parseInt(form.id) > 0) {
            http_method = 'PUT';
        }

        // Add the new location via n API call
        // note POST
        const response = await fetch('/api/locations', {
            method: http_method,
            body: JSON.stringify(form.data),
            headers: {
                'Content-Type': 'application/json'
            }
        });
        const new_loc  = await response.json();

        // if insert returned a new location, add its id to the form for display
        if (new_loc.data)
        {
            form.data.id = new_loc.data.id;
        }
        // return form and message
        return message(form, `success: new location added`);
    }
};