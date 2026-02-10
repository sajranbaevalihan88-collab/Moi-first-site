/**
 * ЦИФРОВЫЕ ПЛАТФОРМЫ - ИНТЕРАКТИВНАЯ ПРЕЗЕНТАЦИЯ
 * ===============================================
 */

// ========================================
// ДАННЫЕ ТЕСТА
// ========================================
const quizData = [
    {
        question: "Что такое цифровая платформа?",
        answers: [
            "Программа для компьютера",
            "Программно-аппаратная среда с доступом к сервисам через интернет",
            "Социальная сеть",
            "Операционная система"
        ],
        correct: 1
    },
    {
        question: "Какое преимущество облачных технологий НЕ является верным?",
        answers: [
            "Синхронизация данных на всех устройствах",
            "Привязка к одному компьютеру",
            "Совместная работа в реальном времени",
            "Резервное копирование данных"
        ],
        correct: 1
    },
    {
        question: "Какой сервис относится к облачным хранилищам?",
        answers: [
            "Photoshop",
            "Google Drive",
            "Visual Studio Code",
            "Steam"
        ],
        correct: 1
    },
    {
        question: "Что такое двухфакторная аутентификация?",
        answers: [
            "Два пароля вместо одного",
            "Дополнительный уровень защиты помимо пароля",
            "Вход с двух устройств",
            "Два аккаунта для одного пользователя"
        ],
        correct: 1
    },
    {
        question: "Какая платформа предназначена для управления проектами методом Kanban?",
        answers: [
            "Slack",
            "Zoom",
            "Trello",
            "Telegram"
        ],
        correct: 2
    },
    {
        question: "Какой из сервисов является образовательной платформой?",
        answers: [
            "Dropbox",
            "Coursera",
            "Trello",
            "Discord"
        ],
        correct: 1
    },
    {
        question: "Что позволяет делать Google Workspace?",
        answers: [
            "Только писать письма",
            "Создавать документы, таблицы и презентации в облаке",
            "Играть в игры",
            "Редактировать видео"
        ],
        correct: 1
    },
    {
        question: "Какой принцип НЕ относится к цифровой безопасности?",
        answers: [
            "Использование сложных паролей",
            "Переход по всем подряд ссылкам",
            "Регулярное резервное копирование",
            "Включение двухфакторной аутентификации"
        ],
        correct: 1
    },
    {
        question: "Что такое метавселенная?",
        answers: [
            "Новая социальная сеть",
            "Виртуальное пространство для работы, учёбы и развлечений",
            "Облачное хранилище",
            "Мессенджер"
        ],
        correct: 1
    },
    {
        question: "Какой тренд НЕ относится к будущему цифровых платформ?",
        answers: [
            "Искусственный интеллект",
            "Виртуальная реальность",
            "Отказ от облачных технологий",
            "Метавселенные"
        ],
        correct: 2
    }
];

// ========================================
// СОСТОЯНИЕ ПРИЛОЖЕНИЯ
// ========================================
let currentSlideIndex = 0;
let slides = [];
let quizStarted = false;
let currentQuestion = 0;
let score = 0;
let answers = [];

// ========================================
// ИНИЦИАЛИЗАЦИЯ
// ========================================
document.addEventListener('DOMContentLoaded', function() {
    initSlides();
    initMenu();
    updateNavigation();
    updateProgress();
    
    // Клавиатурная навигация
    document.addEventListener('keydown', handleKeyboard);
    
    // Свайпы для мобильных
    initTouchEvents();
});

// ========================================
// СЛАЙДЫ
// ========================================
function initSlides() {
    slides = document.querySelectorAll('.slide');
    document.getElementById('totalSlides').textContent = slides.length;
}

function showSlide(index) {
    if (index < 0 || index >= slides.length) return;
    
    // Скрываем текущий слайд
    slides[currentSlideIndex].classList.remove('active');
    slides[currentSlideIndex].classList.add('prev');
    
    // Показываем новый слайд
    currentSlideIndex = index;
    slides[currentSlideIndex].classList.remove('prev');
    slides[currentSlideIndex].classList.add('active');
    
    // Обновляем навигацию
    updateNavigation();
    updateProgress();
    updateMenu();
    
    // Прокручиваем содержимое слайда вверх
    const content = slides[currentSlideIndex].querySelector('.slide-content');
    if (content) content.scrollTop = 0;
}

function nextSlide() {
    if (currentSlideIndex < slides.length - 1) {
        showSlide(currentSlideIndex + 1);
    }
}

function prevSlide() {
    if (currentSlideIndex > 0) {
        showSlide(currentSlideIndex - 1);
    }
}

function updateNavigation() {
    const prevBtn = document.getElementById('prevBtn');
    const nextBtn = document.getElementById('nextBtn');
    const currentSlideEl = document.getElementById('currentSlide');
    
    prevBtn.disabled = currentSlideIndex === 0;
    nextBtn.disabled = currentSlideIndex === slides.length - 1;
    currentSlideEl.textContent = currentSlideIndex + 1;
}

function updateProgress() {
    const progressFill = document.getElementById('progressFill');
    const progress = ((currentSlideIndex + 1) / slides.length) * 100;
    progressFill.style.width = progress + '%';
}

// ========================================
// МЕНЮ
// ========================================
function initMenu() {
    const menuItems = document.getElementById('menuItems');
    const slideTitles = [
        'Начало',
        'Что такое цифровые платформы?',
        'Популярные платформы',
        'Облачные технологии',
        'Инструменты совместной работы',
        'Образовательные платформы',
        'Цифровая безопасность',
        'Советы по использованию',
        'Будущее цифровых платформ',
        'Проверьте свои знания'
    ];
    
    slideTitles.forEach((title, index) => {
        const item = document.createElement('div');
        item.className = 'menu-item' + (index === 0 ? ' active' : '');
        item.onclick = () => {
            showSlide(index);
            toggleMenu();
        };
        item.innerHTML = `
            <div class="menu-item-number">${index + 1}</div>
            <div class="menu-item-title">${title}</div>
        `;
        menuItems.appendChild(item);
    });
}

function toggleMenu() {
    const menu = document.getElementById('slideMenu');
    menu.classList.toggle('active');
}

function updateMenu() {
    const menuItems = document.querySelectorAll('.menu-item');
    menuItems.forEach((item, index) => {
        item.classList.toggle('active', index === currentSlideIndex);
    });
}

// ========================================
// КЛАВИАТУРНАЯ НАВИГАЦИЯ
// ========================================
function handleKeyboard(e) {
    // Закрыть меню по Escape
    if (e.key === 'Escape') {
        const menu = document.getElementById('slideMenu');
        if (menu.classList.contains('active')) {
            toggleMenu();
            return;
        }
    }
    
    // Навигация по слайдам
    if (e.key === 'ArrowRight' || e.key === ' ') {
        e.preventDefault();
        nextSlide();
    } else if (e.key === 'ArrowLeft') {
        e.preventDefault();
        prevSlide();
    } else if (e.key === 'Home') {
        e.preventDefault();
        showSlide(0);
    } else if (e.key === 'End') {
        e.preventDefault();
        showSlide(slides.length - 1);
    }
}

// ========================================
// TOUCH СОБЫТИЯ (мобильные)
// ========================================
function initTouchEvents() {
    let touchStartX = 0;
    let touchEndX = 0;
    const minSwipeDistance = 50;
    
    document.addEventListener('touchstart', e => {
        touchStartX = e.changedTouches[0].screenX;
    }, false);
    
    document.addEventListener('touchend', e => {
        touchEndX = e.changedTouches[0].screenX;
        handleSwipe();
    }, false);
    
    function handleSwipe() {
        const swipeDistance = touchEndX - touchStartX;
        
        if (Math.abs(swipeDistance) > minSwipeDistance) {
            if (swipeDistance > 0) {
                // Свайп вправо - предыдущий слайд
                prevSlide();
            } else {
                // Свайп влево - следующий слайд
                nextSlide();
            }
        }
    }
}

// ========================================
// ТЕСТ
// ========================================
function startQuiz() {
    quizStarted = true;
    currentQuestion = 0;
    score = 0;
    answers = [];
    
    document.getElementById('quizStart').style.display = 'none';
    document.getElementById('quizQuestion').style.display = 'block';
    document.getElementById('quizResult').style.display = 'none';
    
    showQuestion();
}

function showQuestion() {
    const question = quizData[currentQuestion];
    const questionNumber = document.getElementById('questionNumber');
    const totalQuestions = document.getElementById('totalQuestions');
    const questionText = document.getElementById('questionText');
    const answersGrid = document.getElementById('answersGrid');
    const questionBar = document.getElementById('questionBar');
    
    // Обновляем прогресс
    const progress = ((currentQuestion + 1) / quizData.length) * 100;
    questionBar.style.width = progress + '%';
    
    // Обновляем текст вопроса
    questionNumber.textContent = currentQuestion + 1;
    totalQuestions.textContent = quizData.length;
    questionText.textContent = question.question;
    
    // Создаём кнопки ответов
    answersGrid.innerHTML = '';
    const letters = ['A', 'B', 'C', 'D'];
    
    question.answers.forEach((answer, index) => {
        const btn = document.createElement('button');
        btn.className = 'answer-btn';
        btn.innerHTML = `
            <span class="answer-letter">${letters[index]}</span>
            <span class="answer-text">${answer}</span>
        `;
        btn.onclick = () => selectAnswer(index);
        answersGrid.appendChild(btn);
    });
}

function selectAnswer(answerIndex) {
    const question = quizData[currentQuestion];
    const answerBtns = document.querySelectorAll('.answer-btn');
    const isCorrect = answerIndex === question.correct;
    
    // Блокируем все кнопки
    answerBtns.forEach((btn, index) => {
        btn.disabled = true;
        if (index === question.correct) {
            btn.classList.add('correct');
        } else if (index === answerIndex && !isCorrect) {
            btn.classList.add('wrong');
        }
    });
    
    // Сохраняем ответ
    answers.push({
        question: question.question,
        selected: answerIndex,
        correct: question.correct,
        isCorrect: isCorrect
    });
    
    if (isCorrect) {
        score++;
    }
    
    // Переход к следующему вопросу через задержку
    setTimeout(() => {
        currentQuestion++;
        if (currentQuestion < quizData.length) {
            showQuestion();
        } else {
            showResults();
        }
    }, 1500);
}

function showResults() {
    document.getElementById('quizQuestion').style.display = 'none';
    document.getElementById('quizResult').style.display = 'block';
    
    const resultIcon = document.getElementById('resultIcon');
    const resultTitle = document.getElementById('resultTitle');
    const resultScore = document.getElementById('resultScore');
    const resultMessage = document.getElementById('resultMessage');
    const resultDetails = document.getElementById('resultDetails');
    
    const percentage = Math.round((score / quizData.length) * 100);
    
    // Определяем результат
    let resultClass, title, message;
    if (percentage >= 80) {
        resultClass = 'excellent';
        title = 'Отлично!';
        message = 'Вы отлично разбираетесь в цифровых платформах!';
    } else if (percentage >= 60) {
        resultClass = 'good';
        title = 'Хорошо!';
        message = 'У вас хорошие знания, но есть куда расти.';
    } else {
        resultClass = 'bad';
        title = 'Попробуйте ещё!';
        message = 'Рекомендуем повторить материал урока.';
    }
    
    resultIcon.className = 'result-icon ' + resultClass;
    resultIcon.innerHTML = percentage >= 60 ? '<i class="fas fa-trophy"></i>' : '<i class="fas fa-book-open"></i>';
    resultTitle.textContent = title;
    resultScore.textContent = percentage + '%';
    resultMessage.textContent = message;
    
    // Детали результатов
    resultDetails.innerHTML = `
        <div class="result-stat">
            <span class="result-stat-value">${score}</span>
            <span class="result-stat-label">Правильных</span>
        </div>
        <div class="result-stat">
            <span class="result-stat-value">${quizData.length - score}</span>
            <span class="result-stat-label">Неправильных</span>
        </div>
        <div class="result-stat">
            <span class="result-stat-value">${quizData.length}</span>
            <span class="result-stat-label">Всего вопросов</span>
        </div>
    `;
}

function restartQuiz() {
    startQuiz();
}

// ========================================
// ЭФФЕКТЫ ПАРТИКЛОВ (дополнительно)
// ========================================
function createParticles() {
    const container = document.createElement('div');
    container.className = 'particles-container';
    container.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        pointer-events: none;
        z-index: -1;
        overflow: hidden;
    `;
    
    for (let i = 0; i < 30; i++) {
        const particle = document.createElement('div');
        particle.className = 'particle';
        particle.style.cssText = `
            position: absolute;
            width: ${Math.random() * 4 + 2}px;
            height: ${Math.random() * 4 + 2}px;
            background: rgba(99, 102, 241, ${Math.random() * 0.3 + 0.1});
            border-radius: 50%;
            left: ${Math.random() * 100}%;
            top: ${Math.random() * 100}%;
            animation: particleFloat ${Math.random() * 10 + 10}s linear infinite;
            animation-delay: ${Math.random() * 5}s;
        `;
        container.appendChild(particle);
    }
    
    document.body.appendChild(container);
    
    // Добавляем стили для анимации
    const style = document.createElement('style');
    style.textContent = `
        @keyframes particleFloat {
            0% {
                transform: translateY(100vh) rotate(0deg);
                opacity: 0;
            }
            10% {
                opacity: 1;
            }
            90% {
                opacity: 1;
            }
            100% {
                transform: translateY(-100vh) rotate(720deg);
                opacity: 0;
            }
        }
    `;
    document.head.appendChild(style);
}

// Запускаем частицы при загрузке
document.addEventListener('DOMContentLoaded', createParticles);

// ========================================
// КОНФЕТТИ ПРИ ОТЛИЧНОМ РЕЗУЛЬТАТЕ
// ========================================
function createConfetti() {
    const colors = ['#6366F1', '#EC4899', '#06B6D4', '#10B981', '#F59E0B'];
    
    for (let i = 0; i < 100; i++) {
        const confetti = document.createElement('div');
        confetti.style.cssText = `
            position: fixed;
            width: 10px;
            height: 10px;
            background: ${colors[Math.floor(Math.random() * colors.length)]};
            left: ${Math.random() * 100}%;
            top: -10px;
            border-radius: ${Math.random() > 0.5 ? '50%' : '0'};
            animation: confettiFall ${Math.random() * 3 + 2}s linear forwards;
            z-index: 9999;
        `;
        document.body.appendChild(confetti);
        
        setTimeout(() => confetti.remove(), 5000);
    }
    
    const style = document.createElement('style');
    style.textContent = `
        @keyframes confettiFall {
            to {
                transform: translateY(100vh) rotate(${Math.random() * 360}deg);
                opacity: 0;
            }
        }
    `;
    document.head.appendChild(style);
}

// Модифицируем showResults для добавления конфетти
const originalShowResults = showResults;
showResults = function() {
    originalShowResults();
    const percentage = Math.round((score / quizData.length) * 100);
    if (percentage >= 80) {
        setTimeout(createConfetti, 500);
    }
};

// ========================================
// ПРЕДЗАГРУЗКА ИЗОБРАЖЕНИЙ
// ========================================
window.addEventListener('load', function() {
    document.body.classList.add('loaded');
});

// ========================================
// ОБРАБОТКА ОШИБОК
// ========================================
window.onerror = function(msg, url, line) {
    console.error('Ошибка: ' + msg + '\nURL: ' + url + '\nСтрока: ' + line);
    return false;
};

// Экспорт функций для глобального доступа
window.nextSlide = nextSlide;
window.prevSlide = prevSlide;
window.toggleMenu = toggleMenu;
window.startQuiz = startQuiz;
window.restartQuiz = restartQuiz;
