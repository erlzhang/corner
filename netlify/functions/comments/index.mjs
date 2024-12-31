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
            const data = JSON.parse(res.body);
            if (data.code) {
                return {
                    statusCode: 200,
                };
            } else {
                return {
                    statusCode: 500,
                }
            }
        } catch(err) {
            return { statusCode: 500, body: error.toString() };
        }
    } else {
    
        try {
            const res = await fetch(BASE_URL + '/comments/' + id);
            console.log('res', res)
            const data = JSON.parse(res.body);
            if (data.code) {
                return {
                    statusCode: 200,
                    body: data.data
                };
            } else {
                return {
                    statusCode: 500,
                }
            }
        } catch(err) {
            return { statusCode: 500, body: error.toString() };
        }
    }

}

export const config = {
    path: "/comments/:id"
}