const { Client } = require('@elastic/elasticsearch')
const client = new Client({
    node: 'http://localhost:9200',
    maxRetries: 5,
    requestTimeout: 60000,
})

async function addCustomers() {
    for(let i=0; i<30; i++) {
        const name = 'seo'
        const names = ['seo', 'seo jeong', 'seo jeong kuk']
        await client.index({
            index: 'customer',
            id: (i+1).toString(),
            body: {
              name: `${name}_${i+1}`,
              age: i + 1
            }
        })
    }
}

addCustomers()
