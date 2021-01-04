export const fetchData = (callback) => {
    fetch('http://localhost:63342/accordion/static/js/data.json', {
        mode: 'no-cors'
    })
        .then(response => response.json())
        .then(data => callback(data))
}
