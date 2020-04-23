const updateStock = () => {
    const amdStock = document.querySelector('#amd')
    const msftStock = document.querySelector('#msft')

    fetch(
            'https://apidojo-yahoo-finance-v1.p.rapidapi.com/market/get-quotes?region=US&lang=en&symbols=AMD%252CMSFT', {
                method: 'GET',
                headers: {
                    'x-rapidapi-host': 'apidojo-yahoo-finance-v1.p.rapidapi.com',
                    'x-rapidapi-key': '55c0e914bbmsh0128bce8df6703fp1874bbjsn4adf9c08a58d',
                },
            }
        )
        .then(response => {
            response.json().then(result => {
                amdStock.textContent = result.quoteResponse.result[0].regularMarketPrice
                msftStock.textContent = result.quoteResponse.result[1].regularMarketPrice
                console.log('updated');
            })
        })
        .catch(err => {
            console.log(err)
        })
}

updateStock()