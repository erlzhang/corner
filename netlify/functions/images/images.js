// Docs on event and context https://docs.netlify.com/functions/build/#code-your-function-2
const createRoute = require('./create.js')
const readRoute = require('./list.js')
const deleteRoute = require('./delete.js')

const handler = async (event, context) => {
  const path = event.path.replace(/\.netlify\/functions\/[^/]+/, '')
  const segments = path.split('/').filter(Boolean)
  try {
    const subject = event.queryStringParameters.name || 'World'

    switch (event.httpMethod) {
      case 'POST':
          return createRoute.handler(event, context)
      case 'GET':
          return readRoute.handler(event, context)
    case 'DELETE':
      // e.g. DELETE /.netlify/functions/fauna-crud/123456
      if (segments.length === 1) {
        const [id] = segments
        event.id = id
        return deleteRoute.handler(event, context)
      }
      return {
        statusCode: 500,
        body: 'invalid segments in DELETE request, must be /.netlify/functions/fauna-crud/123456',
      }
    default:
      return {
        statusCode: 500,
        body: 'unrecognized HTTP Method, must be one of GET/POST/PUT/DELETE',
      }
    }
  } catch (error) {
    return { statusCode: 500, body: error.toString() }
  }
}

module.exports = { handler }
