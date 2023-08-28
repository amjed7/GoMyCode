const finalScore = document.getElementById('finalScore');
const mostRecentScore = localStorage.getItem('mostRecentScore');

finalScore.innerText = mostRecentScore;


const nextLevelLink = document.getElementById('nextLevelLink');

nextLevelLink.addEventListener('click', () => {
    let nextLevel;

    switch (currentLevel) {
        case 'easy':
            nextLevel = 'medium';
            break;
        case 'medium':
            nextLevel = 'hard';
            break;
        case 'hard':
            // On the last level, link back to the home page
            nextLevel = 'index';
            break;
        default:
            nextLevel = 'easy'; // Handle other cases or loop back to 'easy.html'
            break;
    }

    nextLevelLink.href = `${nextLevel}.html`;
});


const userComment = document.getElementById('userComment');

const score = parseInt(mostRecentScore);
if (score >= 40) {
    userComment.textContent = "Congratulations! You did an amazing job!";
} else if (score >= 30) {   
    userComment.textContent = "Great job! You're improving!";
} else {
    userComment.textContent = "Keep practicing to improve your score!";
}
