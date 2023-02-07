// All answer options
const option1 = document.querySelector('.option1'),
      option2 = document.querySelector('.option2'),
      option3 = document.querySelector('.option3'),
      option4 = document.querySelector('.option4');

// all our options
const optionElements = document.querySelectorAll('.option');
const question = document.getElementById('question'); //сам вопрос
const numberOfQuestion = document.getElementById('number-of-question'), // номер вопроса
      numberOfAllQuestion = document.getElementById('number-of-all-questions'); // количество всех вопросов

const quizTheme = document.getElementById('quiz-theme');      

let indexOfQuestion, // Индекс текущего вопроса
    indexOfPage = 0;  //индекс страниці

const answersTracker = document.getElementById('answers-tracker'); // обертка  для трекера  
const btnNext = document.getElementById('btn-next'); // кнопка далее

let score = 0; //итоговый результат викторины

const correctAnswer = document.getElementById('correct-answer'),// количество правильных ответов
      numberOfAllQuestins2 = document.getElementById('number-of-all-questions-2'),// количество всех вопросов в модальном окне
      btnTryAgain = document.getElementById('btn-try-again');

quizTheme.innerHTML = 'Вселенная Ведьмака'
const questions = [
    {   
        question: 'Какое прозвище дали Трисс Меригольд после битвы под Содденом?',
        options : [
            'Владычица Озера',
            'Битч с Района',
            'Четырнадцатая с холма',
            'Львица из Цинтры',
        ],
        rightAnswer: 2
    },
    {   
        question: 'Как называлась банда в которой состояла Цири?',
        options : [
            'Бобры',
            'Мыши',
            'Крысы',
            'Морские свинки',
        ],
        rightAnswer: 2
    },
    {   
        question: 'Кто является автором книг серии "Ведьмак" ?',
        options : [
            'А. Сапковский',
            'С. Кинг',
            'Д. Роулинг',
            'Д. Браун',
        ],
        rightAnswer: 0
    },
    {   
        question: 'Кого убивает Ведьмак?',
        options : [
            'Зверей',
            'Рыб',
            'Чудовищь опасных для людей',
            'Время',
        ],
        rightAnswer: 2
    },
    {   
        question: 'Как зовут отца Геральта ?',
        options : [
            'Лютик',
            'Золтан Хивай',
            'Риенс',
            'Вессимир',
        ],
        rightAnswer: 3
    },
    {   
        question: 'Кто лучший Ведьмак?',
        options : [
            'Ескель',
            'Ламберт',
            'Койон',
            'Генри Кавил',
        ],
        rightAnswer: 3
    },
    {   
        question: 'Как зовут лошадь Геральта?',
        options : [
            'Красноперка',
            'Плотва',
            'Щука',
            'Верховодка',
        ],
        rightAnswer: 1
    },
];

btnNext.addEventListener('click',() => {
    validate();
});

const load = () => {
    numberOfAllQuestion.innerHTML = questions.length;
    question.innerHTML = questions[indexOfQuestion].question;
    option1.innerHTML = questions[indexOfQuestion].options[0];
    option2.innerHTML = questions[indexOfQuestion].options[1];
    option3.innerHTML = questions[indexOfQuestion].options[2];
    option4.innerHTML = questions[indexOfQuestion].options[3]; 
    numberOfQuestion.innerHTML = indexOfPage + 1;  
    indexOfPage++;  
};

let completedAnswers = []// массив для уже заданных вопросов
const randomQuestion = () => {
    let randomNumber = Math.floor(Math.random() * questions.length);
    let hitDuplicate = false;// якорь для проверки повторяющихся вопросов
    
    if(indexOfPage == questions.length) {
        quizOver();
    } else {
        if (completedAnswers.length > 0) {
            completedAnswers.forEach(item => {
                if (item == randomNumber) {
                    hitDuplicate = true;
                }
            });
            if (hitDuplicate) {
                randomQuestion();
            } else {
                indexOfQuestion = randomNumber;
                load();
            }
        }
        if (completedAnswers.length == 0) {
            indexOfQuestion = randomNumber;
            load();
        }
    }
    completedAnswers.push(indexOfQuestion);
};

const checkAnswer = el => {
    if (el.target.dataset.id == questions[indexOfQuestion].rightAnswer ) {
        el.target.classList.add('correct');
        updateUnswerTracker('correct'); 
        score++;
    } else {
        el.target.classList.add('wrong');
        updateUnswerTracker('wrong');
    }
    disabledOptions();
};

for (option of optionElements) {
    option.addEventListener('click', e =>{
        checkAnswer(e);
    });
};

const disabledOptions = () => {
    optionElements.forEach( item => {
        item.classList.add('disabled');
        if (item.dataset.id == questions[indexOfQuestion].rightAnswer) {
            item.classList.add('correct');
        };
    });
};

const enableOptions = () => {
    optionElements.forEach(item => {
        item.classList.remove('disabled', 'correct', 'wrong');
    });
};

const answerTracker = () => {
    questions.forEach(() => {
        const div = document.createElement('div');
        answersTracker.appendChild(div);
    })
};

const updateUnswerTracker = status => {
    answersTracker.children[indexOfPage-1].classList.add(`${status}`);
};

const validate = () => {
    if (!optionElements[0].classList.contains('disabled')) {
        alert('Необходимо выбрать один вариантответа');
    } else {
         randomQuestion();
         enableOptions();
    };
};

const quizOver = () => {
    document.querySelector('.quiz-over-modal').classList.add('active');
    correctAnswer.innerHTML = score;
    numberOfAllQuestins2.innerHTML = questions.length;
};

const tryAgain = () => {
    window.location.reload();
};

btnTryAgain.addEventListener('click', () => {
    tryAgain();
});

window.addEventListener('load', () => {
    randomQuestion();
    answerTracker();
});