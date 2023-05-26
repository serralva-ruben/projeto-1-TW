function start(){
    const params = new URLSearchParams(window.location.search);
    const result = JSON.parse(params.get('result'))
    document.getElementById('finish').innerHTML += Object.values(result)
}

document.addEventListener('DOMContentLoaded', () => {
    start()
})