const question = document.getElementById("question");
const choices = Array.from(document.getElementsByClassName("choice-txt"));
const progressText = document.getElementById("progressTxt");
const scoreText = document.getElementById("score");
const progressBarFull = document.getElementById('progressBarFull');


let currentQuestion = {};
let acceptingAnswers = false;
let score = 0;
let questionCounter = 0;
let availableQuestions = [];

const questions = [
    {
        question: "How do you handle exceptions in C?",
        choice1: "A- Using try-catch blocks.",
        choice2: "B- Using the 'ry' and 'except' blocks.",
        choice3: "C- Using the 'throw' statement.",
        choice4: "D- C does not have built-in exception handling.",
        answer: 4
    },
    {
        question: "What is the Python keyword used to make decisions in code by evaluating a condition?",
        choice1: "A- case",
        choice2: "B- switch",
        choice3: "C- if",
        choice4: "D- then",
        answer: 3
    },
    {
        question: "Which of the following correctly creates an empty list in Python?",
        choice1: "A- list = {}",
        choice2: "B- list = []",
        choice3: "C- list = [None]",
        choice4: "D- list = [0]",
        answer: 2
    },
    {
        question: "Which protocol is used for sending emails over the internet?",
        choice1: "A- FTP",
        choice2: "B- HTTP",
        choice3: "C- SMTP",
        choice4: "D- POP3",
        answer: 3
    },
    {
        question: "How many bits are in a byte?",
        choice1: "A- 4",
        choice2: "B- 8",
        choice3: "C-  16",
        choice4: "D- 32",
        answer: 2
    }
];

const correct_bonus = 10;
const max_question = 5;

startGame = () => {
    questionCounter = 0;
    score = 0;
    availableQuestions = [ ...questions];
    getNewQuestion();
};

getNewQuestion= () => {
    if (availableQuestions.length=== 0 || questionCounter>= max_question){
        localStorage.setItem("mostRecentScore", score);
        return window.location.assign("/end.html");
    }

    questionCounter++;
    progressText.innerText = "Question:" + questionCounter + "/" + max_question;

    progressBarFull.style.width = `${(questionCounter / max_question) * 100}%`;

    const questionIndex = Math.floor(Math.random()* availableQuestions.length);
    currentQuestion = availableQuestions[questionIndex];
    question.innerText = currentQuestion.question;

    choices.forEach( choice => {
        const number = choice.dataset["number"];
        choice.innerText = currentQuestion["choice" + number];
    });

    availableQuestions.splice(questionIndex, 1);
    acceptingAnswers = true;
};

choices.forEach(choice => {
    choice.addEventListener("click", e => {
        if (!acceptingAnswers) return;

        acceptingAnswers = false;
        const selectedChoice = e.target;
        const selectedAnswer = selectedChoice.dataset["number"];

        const classToApply = 
            selectedAnswer == currentQuestion.answer ? "correct" : "incorrect";

            if (classToApply === "correct"){
                incrementScore(correct_bonus);
            }
        
        selectedChoice.parentNode.classList.add(classToApply);
        
        setTimeout(() => {
            selectedChoice.parentNode.classList.remove(classToApply);
            getNewQuestion();

        }, 1000);
    });
});

incrementScore = num =>{
    score += num;
    scoreText.innerText = score;
}

startGame();

const currentLevel = 'hard';