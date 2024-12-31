const fetch = (...args) =>
  import("node-fetch").then(({ default: fetch }) => fetch(...args));

const BASE_URL = process.env.API;

export default async (event, context) => {
    console.log('method', event.method, context);
    const { id } = context.params
    if (event.method === 'POST' && id === 'create') {
        try {
            const res = await fetch(BASE_URL + '/comments', {method: 'POST', body: event.body});
            console.log('res', res)
            const data = await res.json();
            console.log('data', data)
            if (data.code) {
                return {
                    statusCode: 200,
                };
            } else {
                return {
                    statusCode: 500,
                }
            }
        } catch(error) {
            return { statusCode: 500, body: error.toString() };
        }
    } else {
    
        try {
            const res = await fetch(BASE_URL + '/comments/' + id);
            console.log('res', res)
            const data = await res.json();
            return {
                statusCode: 200,
                body: JSON.stringify(data)
            };
        } catch(error) {
            return { statusCode: 500, body: error.toString() };
        }
    }

}

export const config = {
    path: "/comments/:id"
}