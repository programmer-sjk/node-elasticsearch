const { Client } = require('@elastic/elasticsearch')
const client = new Client({
    node: 'http://localhost:9200',
    maxRetries: 5,
    requestTimeout: 60000,
})

async function customerTest() {
    await client.index({
        index: 'customer',
        id: '2',
        body: {
          name: 'seo jeong kuk',
          age: 2
        }
    })

    const { body, statusCode, headers, meta } = await client.get({
        index: 'customer',
        id: '2'
    })
    
    console.log(body)
    console.log(statusCode)
    console.log(headers)
    console.log(meta)
}

async function addCustomers() {
    for(let i=0; i<3; i++) {
        const names = ['seo', 'seo jeong', 'seo jeong kuk']
        await client.index({
            index: 'customer',
            id: (i+1).toString(),
            body: {
              name: names[i],
              age: i + 1
            }
        })
    }
}
async function searchCustomer() {
    const { body } = await client.search({
        index: 'customer',
        body: {
          query: {
            match: { name: 'seo' }
          }
        }
    })
    console.log(body)
    console.log(body.hits.hits)
}

addCustomers()
searchCustomer()
