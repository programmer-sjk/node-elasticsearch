const { Client } = require('@elastic/elasticsearch')
const client = new Client({
    node: 'http://localhost:9200',
    maxRetries: 5,
    requestTimeout: 60000,
})

async function searchOR() {
    const {body} = await client.search({
        index: 'customer',
        body: {
            query: {
                match: {name: "seo_1 seo_2 seo"}
            },
            sort: [{
                "age": "asc"
            }],
        }
    })
    console.log(body)
    console.log(body.hits.hits)
}

async function searchEQ() {
    const {body} = await client.search({
        index: 'customer',
        body: {
            query: {
                match_phrase: {name: "seo_1"}
            },
            sort: [{
                "age": "asc"
            }],
        }
    })
    console.log(body)
    console.log(body.hits.hits)
}

async function searchFilter() {
    const {body} = await client.search({
        index: 'customer',
        body: {
            query: {
                bool: {
                    must: {match_all: {}},
                    filter: [
                        {"range": {"age": {"gte": 5}}}
                    ]
                }
            },
        }
    })
    console.log(body)
    console.log(body.hits.hits)
}

searchFilter()
