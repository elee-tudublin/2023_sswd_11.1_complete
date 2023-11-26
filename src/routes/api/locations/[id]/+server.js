import { json, error } from '@sveltejs/kit';


export async function GET({ params, request, locals: { supabase, getSession } }) {

    if (params.id) {
        const id = parseInt(params.id)
        const locations = await supabase
        .from('locations')
        .select('*')
        .eq('id', id)
        .order('name', {ascending: true});

        if (locations.error) {
            return json({
                status: locations.status,
                error: locations.error
            });
        }

        return json({
            data: locations.data[0],
            status: locations.status
        });

    }
    return json({
        status: 400,
        error: 'Bad Request'
    });
}

export async function DELETE({ params, request, locals: { supabase, getSession } }) {

    const session = await getSession()
    if (!session) {
      // the user is not signed in
      throw error(401, { message: 'Unauthorized' })
    }

    if (params.id) {
        const id = parseInt(params.id)
        const result = await supabase
        .from('locations')
        .delete()
        .eq('id', id)

        if (result.error) {
            return json({
                status: result.status,
                error: result.error
            });
        }

        return json({
            data: result.data,
            status: result.status
        });

    }
    return json({
        status: 400,
        error: 'Bad Request'
    });
}