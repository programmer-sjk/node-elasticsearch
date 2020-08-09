const { Client } = require('@elastic/elasticsearch')
const client = new Client({
    node: 'http://localhost:9200',
    maxRetries: 5,
    requestTimeout: 60000,
})

async function get() {
    try {
        const result = await client.search({
            index: 'my-index',
            body: {
              query: {
                match: { hello: 'world' }
              }
            }
        })
    } catch(e) {
        console.log(e)
    }
}

get()
