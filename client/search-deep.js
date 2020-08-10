const { Client } = require('@elastic/elasticsearch')
const client = new Client({
    node: 'http://localhost:9200',
    maxRetries: 5,
    requestTimeout: 60000,
})

client.search({
    index: 'customer',
    body: {
        query: {
            match: { name: 'seo_1' }
        },
        highlight: {
            fields: {
                name: {}
            }
        }
    }
}, (err, result) => {
    err && console.log(err) || console.log(result.body.hits.hits)
})
