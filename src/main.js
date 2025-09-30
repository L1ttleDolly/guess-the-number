import './style.css';

const $ = document.querySelector.bind(document);

const form = $('form[name="form"]');
const input = $('.input')

const restartButton = $('.button-interactive')
const resultContainer = $('.content__result')
const answers = $('.content__answers')

let randomInt

let attempts = 0

const maxAttempts = 5

const getRandomInt = () => {
    return Math.floor(Math.random() * 100) + 1
}

function startNewGame() {
    randomInt = getRandomInt()
}

startNewGame()

function isShowResult () {
    attempts++
    const inputValue = parseInt(input.value)

    if (randomInt === inputValue) {
        resultContainer.textContent = 'Вы выиграли'
        answers.textContent = 'Число меньше загаданного'
    }
    else if (attempts === maxAttempts)  {
        resultContainer.textContent = 'Вы проиграли'
        answers.textContent = ''
        isValidButton(true)
    }
    else if (randomInt > inputValue) {
        resultContainer.textContent = 'Игра продолжается'
        answers.textContent = 'Число меньше загаданного'
    }
    else if (randomInt < inputValue) {
        resultContainer.textContent = 'Игра продолжается'
        answers.textContent = 'Число больше загаданного'
    }
}

function isValidButton(boolean) {
    const button = $('.button-submit')
    if(button){
        button.classList.add('disabled')
        button.disabled = boolean
    } else {
        button.disabled = boolean
        button.classList.remove('disabled')
    }
}

function restartGame() {
    form.reset()
    isValidButton(false)
    resultContainer.textContent = ''
    answers.textContent = ''
    attempts = 0
    startNewGame()
}

restartButton.addEventListener('click', () => {
    restartGame()
})

form.addEventListener('submit', (e) => {
    e.preventDefault()
    isShowResult()
})

