const fetch = (...args) =>
  import("node-fetch").then(({ default: fetch }) => fetch(...args));

const BASE_URL = process.env.API;

const handler = async (event, context) => {
    try {
        const res = await fetch(BASE_URL + '/comments', {method: 'POST', body: event.body});
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
}

const config = {
    path: "/comments/create"
}

module.exports = { handler, config };