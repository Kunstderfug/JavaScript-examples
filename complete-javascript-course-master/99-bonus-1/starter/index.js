const fs = require('fs')
const http = require('http')
const url = require('url')

const json = fs.readFileSync(`${__dirname}/data/data.json`, 'utf-8') //what file to read and code
const laptopData = JSON.parse(json) //parses JSON data into the object


const server = http.createServer((req, res) => {

    const pathName = url.parse(req.url, true).pathname //parses the path

    const id = url.parse(req.url, true).query.id //query id
    const laptop = laptopData[id]

    //Rendering a products page from the template
    if (pathName === '/products' || pathName === '/') {
        res.writeHead(200, {
            'Content-type': 'text/html'
        })
        fs.readFile(`${__dirname}/templates/template-overview.html`, 'utf-8', (err, data) => {
            let overview = data // assigning the original overview html to the data variable

            //Rendering cards by looping through laptopData array
            fs.readFile(`${__dirname}/templates/template-card.html`, 'utf-8', (err, data) => {

                const cards = laptopData.map(el => replaceTemplate(data, el)).join('')

                //replacing the placeholders in overview with cards
                overview = overview.replace('{%CARDS%}', cards)
                res.end(overview)
            })
        })

        //Rendering a laptop page from the template
    } else if (pathName === '/laptop' && id < laptopData.length) {
        res.writeHead(200, {
            'Content-type': 'text/html'
        })
        fs.readFile(`${__dirname}/templates/template-laptop.html`, 'utf-8', (err, data) => {

            const output = replaceTemplate(data, laptop)
            res.end(output)
        })

        //Not found
    }

    //Route for images
    else if ((/\.(jpg|jpeg|png|gif|svg)$/i).test(pathName)) {
        fs.readFile(`${__dirname}/data/img/${pathName}`, (err, data) => {
            res.writeHead(200, {
                'Content-type': 'image/jpg'
            })
            res.end(data)
        })
    }

    //URL has not found
    else {
        res.writeHead(404, {
            'Content-type': 'text/html'
        })
        res.end('Sorry, we didn\'t find this page')
    }


})

server.listen(1337, 'localhost', () => {
    console.log('listening on port 1337');
})

function replaceTemplate(origHTML, laptop) {
    let output = origHTML.replace(/{%PRODUCTNAME%}/g, laptop.productName)
    output = output.replace(/{%PRICE%}/g, `$${laptop.price}`)
    output = output.replace(/{%DESCRIPTION%}/g, laptop.description)
    output = output.replace(/{%IMAGE%}/g, laptop.image)
    output = output.replace(/{%SCREEN%}/g, laptop.screen)
    output = output.replace(/{%CPU%}/g, laptop.cpu)
    output = output.replace(/{%STORAGE%}/g, laptop.storage)
    output = output.replace(/{%RAM%}/g, laptop.ram)
    output = output.replace(/{%ID%}/g, laptop.id)
    return output
}