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

    const { body } = await client.get({
        index: 'customer',
        id: '2'
    })
    
    console.log(body)
}

customerTest()
