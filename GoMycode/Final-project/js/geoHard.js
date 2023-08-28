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
        question: "How many stars are on the US flag ?",
        choice1: "A- 50",
        choice2: "B- 51",
        choice3: "C- 52",
        choice4: "D- 53",
        answer: 1
    },
    {
        question: "Which Asian country is known as the 'Land of the Rising Sun'?",
        choice1: "A- China",
        choice2: "B- Japan",
        choice3: "C- South Korea",
        choice4: "D- Vietnam",
        answer: 2
    },
    {
        question: "How many countries are there in africa ?",
        choice1: "A- 44",
        choice2: "B- 50",
        choice3: "C- 54",
        choice4: "D- 60",
        answer: 3
    },
    {
        question: "Which is the largest ocean on Earth?",
        choice1: "A- tlantic Ocean",
        choice2: "B-Indian Ocean",
        choice3: "C- Southern Ocean",
        choice4: "D- Pacific Ocean",
        answer: 4
    },
    {
        question: "Which country is made up entirely of islands and is sometimes referred to as the 'Emerald Isle'?",
        choice1: "A- Australia",
        choice2: "B- New Zealand",
        choice3: "C- Ireland",
        choice4: "D- United Kingdom",
        answer: 3
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

const currentLevel = 'easy';