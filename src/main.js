import './style.css';

const $ = document.querySelector.bind(document);
const form = $('form[name="form"]');
const input = $('.input')

const getRandomInt = () => {
    return Math.floor(Math.random() * 100) + 1
}

form.addEventListener('submit', (e) => {
    e.preventDefault()
    isShowResult()
})

function isShowResult () {

    let count = []

    const resultContainer = $('.content__result')
    const inputValue = parseInt(input.value)
    const randomInt = getRandomInt()

    console.log(randomInt)

    const answers = $('.content__answers')

    if (randomInt === inputValue) {
        resultContainer.textContent = 'Вы выиграли'
    }
    else if (randomInt > inputValue) {
        resultContainer.textContent = 'Вы проиграли'
        answers.textContent = 'Число меньше загаданного'

    } else if (randomInt < inputValue) {
        resultContainer.textContent = 'Вы проиграли'
        answers.textContent = 'Число больше загаданного'
    }
}







