const fetch = (...args) =>
  import("node-fetch").then(({ default: fetch }) => fetch(...args));

const BASE_URL = process.env.API;

export default async (event, context) => {
    console.log('method', event.method, context);
    const { id } = context.params
    if (event.method === 'POST') {
        try {
            const body = await event.json();
            const res = await fetch(BASE_URL + '/comments/' + id, {method: 'POST', body: JSON.stringify(body)});
            console.log('res', res)
            const data = await res.json();
            return new Response(JSON.stringify(data), { status: 200 });
        } catch(error) {
            return new Response(error.toString(), { status: 500 });
        }
    } else {
    
        try {
            const res = await fetch(BASE_URL + '/comments/' + id);
            console.log('res', res)
            const data = await res.json();
            return new Response(JSON.stringify(data), { status: 200 });
        } catch(error) {
            return new Response(error.toString(), { status: 500 });
        }
    }

}

export const config = {
    path: "/comments/:id"
}