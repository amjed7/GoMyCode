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
        question: "What does 'HTML' stand for in web development?",
        choice1: "A- Hyper Transfer Markup Language",
        choice2: "B- Hyper Text Markup Language",
        choice3: "C- High Tech Markup Language",
        choice4: "D- Hyperlink and Text Markup Language",
        answer: 2
    },
    {
        question: "Which programming language is commonly used for building interactive and dynamic web pages?",
        choice1: "A- Java",
        choice2: "B- Python",
        choice3: "C- Ruby",
        choice4: "D- JavaScript",
        answer: 4
    },
    {
        question: "In programming, what is a 'variable' used for?",
        choice1: "A- Storing and manipulating data",
        choice2: "B- Displaying messages",
        choice3: "C- Creating loops",
        choice4: "D- Defining functions",
        answer: 1
    },
    {
        question: "What is the purpose of the 'if' statement in coding?",
        choice1: "A- Defining a function",
        choice2: "B-Looping through an array",
        choice3: "C- Handling conditions and making decisions",
        choice4: "D- Importing external libraries",
        answer: 3
    },
    {
        question: "What does the acronym 'IDE' stand for in the context of programming?",
        choice1: "A- Integrated Development Environment",
        choice2: "B- Internet Development Environment",
        choice3: "C- Interface Design Engine",
        choice4: "D- In-Depth Execution",
        answer: 1
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