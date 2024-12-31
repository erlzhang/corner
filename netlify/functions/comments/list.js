const fetch = (...args) =>
  import("node-fetch").then(({ default: fetch }) => fetch(...args));

const BASE_URL = process.env.API;

const handler = async (event, context) => {
    const { id } = context.params
    try {
        const res = await fetch(BASE_URL + '/comments/' + id);
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

const config = {
    path: "/comments/list/:id"
}

module.exports = { handler, config };