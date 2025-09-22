import './style.css';

const $ = document.querySelector.bind(document);
const form = $('form[name="form"]');
const input = $('.input')

const getRandomInt = () => {
    return Math.floor(Math.random() * 100 + 1)
}

const handleSubmit = (e) => {
    e.preventDefault()
}

form.addEventListener('submit', (e) => {
    handleSubmit(e)
    isShowResult()
})

function isShowResult () {
    const resultContainer = $('.content__result')
    const inputValue = parseInt(input.value)
    const randomInt = getRandomInt()

    if (randomInt === inputValue) {
        resultContainer.textContent = 'Вы выиграли!'
    } else {
        resultContainer.textContent = 'Вы проиграли :('
    }
}







