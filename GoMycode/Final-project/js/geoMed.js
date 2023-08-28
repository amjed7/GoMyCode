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
        question: "The city of Istanbul straddles two continents. Which two continents are they?",
        choice1: "A- Europe and Africa",
        choice2: "B- Europe and Asia",
        choice3: "C- Asia and Australia",
        choice4: "D- Africa and Asia",
        answer: 2
    },
    {
        question: "How many colors are there in the usa flag ?",
        choice1: "A- 2",
        choice2: "B- 3",
        choice3: "C- 4",
        choice4: "D- 5",
        answer: 2
    },
    {
        question: "Which continent is the largest by land area?",
        choice1: "A- Asia",
        choice2: "B- Africa",
        choice3: "C- North America",
        choice4: "D- South America",
        answer: 1
    },
    {
        question: "The Nordic countries, known for their high quality of life and cold climates, are located in which region?",
        choice1: "A- Northern Europe",
        choice2: "B-Eastern Europe",
        choice3: "C- Sub-Saharan Africa",
        choice4: "D- Southeast Asia",
        answer: 3
    },
    {
        question: "Which region is known for its rich cultural diversity, Bollywood films, and the Taj Mahal?",
        choice1: "A- Sub-Saharan Africa",
        choice2: "B- South Asia",
        choice3: "C- Middle East",
        choice4: "D- Oceania",
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