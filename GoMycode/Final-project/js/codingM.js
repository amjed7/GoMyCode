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
        question: "What is the purpose of the 'try' and 'except' blocks in Python?",
        choice1: "A- To define new data types",
        choice2: "B- To handle errors and exceptions",
        choice3: "C- To create multi-threaded programs",
        choice4: "D- To declare global variables",
        answer: 2
    },
    {
        question: "How do you create a comment in Python?",
        choice1: "A- // This is a comment",
        choice2: "B- /* This is a comment */",
        choice3: "C- # This is a comment",
        choice4: "D- <!-- This is a comment -->",
        answer: 3
    },
    {
        question: "How do you create a comment in HTML?",
        choice1: "A- // This is a comment",
        choice2: "B- /* This is a comment */",
        choice3: "C- # This is a comment",
        choice4: "D- <!-- This is a comment -->",
        answer: 4
    },
    {
        question: "What is the correct way to print 'Hello, World!' to the console in Java?",
        choice1: "A- Console.log('Hello, World!');",
        choice2: "B- print('Hello, World!');",
        choice3: "C- System.out.println('Hello, World!');",
        choice4: "D- println('Hello, World!');",
        answer: 3
    },
    {
        question: "What is the purpose of the 'main' function in a C program?",
        choice1: "A- It is a user-defined function.",
        choice2: "B- It is a constructor.",
        choice3: "C-  It is the entry point of the program.",
        choice4: "D- It is used to declare variables.",
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


const currentLevel = 'medium';