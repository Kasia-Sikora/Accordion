export const fetchData = (callback) => {
    fetch('http://localhost:63342/accordion/static/js/data.json', {
        headers: {
            'Content-Type': 'application/json',
            'Access-Control-Allow-Origin': '*',
        }
    })
        .then(response => response.json())
        .then(data => callback(data))
}
