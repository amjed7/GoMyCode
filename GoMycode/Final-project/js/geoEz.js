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
        question: "how many continents are there?",
        choice1: "A- 6",
        choice2: "B- 7",
        choice3: "C- 8",
        choice4: "D- only One",
        answer: 2
    },
    {
        question: "Which ocean is located to the east of Africa?",
        choice1: "A- Atlantic Ocean",
        choice2: "B- Indian Ocean",
        choice3: "C- Pacific Ocean",
        choice4: "D- Arctic Ocean",
        answer: 2
    },
    {
        question: "The capital city of France is:",
        choice1: "A- Berlin",
        choice2: "B- London",
        choice3: "C- Paris",
        choice4: "D- Rome",
        answer: 3
    },
    {
        question: "Which continent is entirely south of the equator?",
        choice1: "A- Europe",
        choice2: "B-Asia",
        choice3: "C- Australia",
        choice4: "D- North America",
        answer: 3
    },
    {
        question: "Which river is the longest in the world?",
        choice1: "A- Amazon River",
        choice2: "B- Nile River",
        choice3: "C- Mississippi River",
        choice4: "D- Yangtze River",
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

const currentLevel = 'easy';