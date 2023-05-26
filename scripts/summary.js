const correct = '../media/summaryIcons/correct.png'
const wrong = '../media/summaryIcons/wrong.png'

function start(){
    const params = new URLSearchParams(window.location.search);
    const result = JSON.parse(params.get('result'))
    let resultList = document.getElementById('resultList')
    for(const key of Object.keys(result)){
        let img = wrong
        if(result[key]) img = correct
        resultList.innerHTML += `<li">${key} : <img src = ${img} class="resultIMG"></img></li>`
    }
    document.getElementById('resultPhrase').innerHTML += `<h1>Voce acertou ${parseInt(params.get('score'))} de ${Object.entries(result).length} perguntas</h1>`
}

document.addEventListener('DOMContentLoaded', () => {
    start()
})