const startBtn = document.getElementById('start-btn');
const questionContainerElement = document.getElementById('ques-container');
const nextBtn = document.getElementById('next-btn');

let shuffledQuestions, currentQuestionIndex;
const questionElement = document.getElementById('question');
const answerBtn = document.getElementById('answer-btn');

startBtn.addEventListener('click', startGame);
nextBtn.addEventListener('click', () => {
    currentQuestionIndex++;
    setNextQuestion();
});

function startGame() {
    console.log('Started');
    startBtn.classList.add('hide');
    shuffledQuestions = questions.sort(() => Math.random() - .5);
    currentQuestionIndex = 0;
    questionContainerElement.classList.remove('hide');
    setNextQuestion();
}

function setNextQuestion() {
    resetState();
    showQuestion(shuffledQuestions[currentQuestionIndex]);
}

function showQuestion(question) {
    questionElement.innerText = question.question;
    question.answer.forEach(answer => {
        const button = document.createElement('button');
        button.innerText = answer.text;
        button.classList.add('btn');
        if (answer.correct) {
            button.dataset.correct = answer.correct;
        }
        button.addEventListener('click', selectAnswer);
        answerBtn.appendChild(button);
    });
}

function resetState() {
    clearStatusClass(document.body);
    nextBtn.classList.add('hide');
    while (answerBtn.firstChild) {
        answerBtn.removeChild(answerBtn.firstChild);
    }
}

function selectAnswer(a) {
    const selectedBtn = a.target;
    const correct = selectedBtn.dataset.correct;

    setStatusClass(document.body, correct);
    Array.from(answerBtn.children).forEach(button => {
        setStatusClass(button, button.dataset.correct);
    });

    if (shuffledQuestions.length > currentQuestionIndex + 1) {
       nextBtn.classList.remove('hide');
    } else {
        startBtn.innerText = 'Restart';
        startBtn.classList.remove('hide');
    }
}

function setStatusClass(element, correct) {
    clearStatusClass(element);
    if (correct) {
        element.classList.add('correct');
    } else{
        element.classList.add('wrong');
    }
}





function clearStatusClass(element) {
    element.classList.remove('correct');
    element.classList.remove('wrong');
}

const questions = [
    {
        question: 'What is 2 + 2?',
        answer: [
            {text: '4', correct: true},
            {text: '22', correct: false}
        ]
    },
    {
        question: 'What is Wikipedia?',
        answer: [
            {text: 'It is a Global website', correct: true},
            {text: 'Commercial website', correct: false}
        ]
    }
];