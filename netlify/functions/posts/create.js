const process = require('process')

const { Client, query } = require('faunadb')
const fetch = (...args) => import('node-fetch').then(({default: fetch}) => fetch(...args));

/* configure faunaDB Client with our secret */
const client = new Client({
  secret: process.env.FAUNA_SECRET,
})

/* export our lambda function as named "handler" export */
const handler = async (event) => {
  /* parse the string body into a useable JS object */
  const data = JSON.parse(event.body)
  console.log('Function `create` invoked', data)
  const item = {
    data,
  }
  /* construct the fauna query */
  try {
    const response = await client.query(query.Create(query.Collection('Post'), item))
    console.log('success', response)
    /* Success! return the response with statusCode 200 */

    // trigger build
    fetch('https://api.netlify.com/build_hooks/64a5500e5450e0103a34c667', {
      method: 'POST'
    });

    return {
      statusCode: 200,
      body: JSON.stringify({code: 1}),
    }
  } catch (error) {
    console.log('error', error)
    /* Error! return the error with statusCode 400 */
    return {
      statusCode: 400,
      body: JSON.stringify(error),
    }
  }
}

module.exports = { handler }
