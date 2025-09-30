import './style.css';

const $ = document.querySelector.bind(document);

const form = $('form[name="form"]');
const input = $('.input')

const restartButton = $('.button-interactive')
const resultContainer = $('.content__result')
const answers = $('.content__answers')
const modal = $('.modal')
const buttonModalOpen = $('.button-info')
const buttonModalClose = $('.modal__button-close')

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

// Add smooth animation for result updates
function updateResult(text, className = '') {
    resultContainer.style.opacity = '0';
    resultContainer.style.transform = 'translateY(10px)';
    
    setTimeout(() => {
        resultContainer.textContent = text;
        resultContainer.className = `content__result ${className}`;
        resultContainer.style.opacity = '1';
        resultContainer.style.transform = 'translateY(0)';
    }, 150);
}

function updateAnswers(text) {
    answers.style.opacity = '0';
    
    setTimeout(() => {
        answers.textContent = text;
        answers.style.opacity = '1';
    }, 150);
}

function isShowResult () {
    attempts++
    const inputValue = parseInt(input.value)

    // Add input shake animation for invalid input
    if (isNaN(inputValue) || inputValue < 1 || inputValue > 100) {
        input.classList.add('shake');
        setTimeout(() => input.classList.remove('shake'), 500);
        return;
    }

    if (randomInt === inputValue) {
        updateResult('🎉 Вы выиграли! 🎉', 'win');
        updateAnswers(`Загаданное число: ${randomInt}`);
        isValidButton(true);
        
        // Confetti effect
        createConfetti();
    }
    else if (attempts === maxAttempts)  {
        updateResult('😔 Вы проиграли', 'lose');
        updateAnswers(`Загаданное число было: ${randomInt}`);
        isValidButton(true);
    }
    else if (randomInt > inputValue) {
        updateResult('🎮 Игра продолжается');
        updateAnswers('⬆️ Загаданное число больше');
    }
    else if (randomInt < inputValue) {
        updateResult('🎮 Игра продолжается');
        updateAnswers('⬇️ Загаданное число меньше');
    }
    
    // Clear input with animation
    input.style.transform = 'scale(0.95)';
    setTimeout(() => {
        input.value = '';
        input.style.transform = 'scale(1)';
        input.focus();
    }, 200);
}

function isValidButton(boolean) {
    const button = $('.button-submit')
    if(boolean){
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
    
    // Smooth fade out and in
    resultContainer.style.opacity = '0';
    answers.style.opacity = '0';
    
    setTimeout(() => {
        updateResult('');
        updateAnswers('');
        attempts = 0
        startNewGame()
        input.focus();
    }, 300);
}

function openModal() {
    modal.showModal()
    modal.classList.add('modal-isOpen')
}

function closeModal() {
    modal.classList.remove('modal-isOpen')
    setTimeout(() => {
        modal.close()
    }, 300);
}

// Confetti effect for winning
function createConfetti() {
    const colors = ['#6366f1', '#ec4899', '#06b6d4', '#10b981', '#f59e0b'];
    const confettiCount = 50;
    
    for (let i = 0; i < confettiCount; i++) {
        const confetti = document.createElement('div');
        confetti.style.position = 'fixed';
        confetti.style.width = '10px';
        confetti.style.height = '10px';
        confetti.style.backgroundColor = colors[Math.floor(Math.random() * colors.length)];
        confetti.style.left = Math.random() * 100 + 'vw';
        confetti.style.top = '-10px';
        confetti.style.opacity = '1';
        confetti.style.transform = 'rotate(' + Math.random() * 360 + 'deg)';
        confetti.style.transition = 'all 3s ease-out';
        confetti.style.pointerEvents = 'none';
        confetti.style.zIndex = '9999';
        confetti.style.borderRadius = '50%';
        
        document.body.appendChild(confetti);
        
        setTimeout(() => {
            confetti.style.top = '100vh';
            confetti.style.opacity = '0';
            confetti.style.transform = 'rotate(' + (Math.random() * 720 - 360) + 'deg)';
        }, 10);
        
        setTimeout(() => {
            confetti.remove();
        }, 3000);
    }
}

restartButton.addEventListener('click', () => {
    restartGame()
})

form.addEventListener('submit', (e) => {
    e.preventDefault()
    isShowResult()
})

buttonModalOpen.addEventListener('click', () => {
    openModal()
})

buttonModalClose.addEventListener('click', () => {
    closeModal()
})

// Close modal on backdrop click
modal.addEventListener('click', (e) => {
    if (e.target === modal) {
        closeModal()
    }
})

// Close modal on Escape key
document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && modal.open) {
        closeModal()
    }
})

// Focus input on page load
window.addEventListener('load', () => {
    input.focus();
});