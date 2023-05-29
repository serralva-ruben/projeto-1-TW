const correct = '../media/summaryIcons/correct.png'
const wrong = '../media/summaryIcons/wrong.png'

document.addEventListener('DOMContentLoaded', () => {start()})

function start(){
    const params = new URLSearchParams(window.location.search);
    const result = JSON.parse(params.get('result'))
    let resultList = document.getElementById('resultList')
    for(const key of Object.keys(result)){
        let img = wrong
        if(result[key]) img = correct
        const questionNumber = parseInt(key.replace(/\D/g, ''));
        resultList.innerHTML += `<li><text>Questão nº ${questionNumber}</text> <img src = ${img} class="resultIMG"></img></li>`
    }
    document.getElementById('resultPhrase').innerHTML += `<h1>Voce acertou ${parseInt(params.get('score'))} de ${Object.entries(result).length} perguntas</h1>`
}