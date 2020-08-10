const { Client } = require('@elastic/elasticsearch')
const client = new Client({
    node: 'http://localhost:9200',
    maxRetries: 5,
    requestTimeout: 60000,
})

async function addUser() {
    console.log('====add=====')
    await client.index({
        index: 'user',
        id: '1',
        body: {
          name: 'seo jeong kuk',
          age: 1
        }
    })
    getUser();
}

async function modUser() {
    console.log('====mod=====')
    try {
        await client.update({
            index: 'user',
            id: '1',
            body: {
                doc: {
                    name: 'seo jeong kuk2',
                }                
            }
        })
        setTimeout(getUser, 500)
    }catch(e) {
        console.log(e)
    }
}

async function delUser() {
    console.log('====del=====')
    await client.delete({
        index: 'user',
        id: '1'
    })

    setTimeout(getUser, 500)
}

async function getUser() {
    const {body} = await client.search({
        index: 'user',
        body: {
            query: {
                match_all: {}
            },
        }
    })
    console.log(body)
    console.log(body.hits.hits)
}

delUser();

