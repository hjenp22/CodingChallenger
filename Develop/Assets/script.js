document.addEventListener("DOMContentLoaded", function () {
    const startButton = document.getElementById("start-btn");
    const quizScreen = document.getElementById("quiz-screen");
    const endScreen = document.getElementById("end-screen");
    const submitButton = document.getElementById("submit-btn");
    const saveScoreButton = document.getElementById("save-score-btn");
    const initialsInput = document.getElementById("initials");
    const questionContainer = document.getElementById("question-container");
    const choicesContainer = document.getElementById("choices-container");
    const finalScoreSpan = document.getElementById("final-score");

    let currentQuestionIndex = 0;
    let score = 0;
    let timer;

    const questions = [
        {
            question: "What programming language helps to build interactive websites?",
            choices: ["Java", "SQL", "JavaScript", "Python"],
            correctAnswer: "JavaScript",
        },
        {
            question: "What is 'Hyper Text Markup Language' in short hand?",
            choices: ["YEAL", "HTML", "HJPS", "JFAB"],
            correctAnswer: "HTML",
        },
        {
            question: "Which is not a Flex property?",
            choices: ["Grow", "Shrink", "Basis", "Chipotle"],
            correctAnswer: "Chipotle",
        }
    ];
    

    function startQuiz() {
        startButton.style.display = "none";
        quizScreen.style.display = "flex";
        showQuestion();
        startTimer();
    }

    function showQuestion() {
        const question = questions[currentQuestionIndex];
        questionContainer.textContent = question.question;

        choicesContainer.innerHTML = "";
        question.choices.map((choice) => {
            const button = document.createElement("button");
            button.textContent = choice;
            button.addEventListener("click", () => checkAnswer(choice));
            choicesContainer.appendChild(button);
        });
    }

    function checkAnswer(userChoice) {
        const question = questions[currentQuestionIndex];
        if (userChoice === question.correctAnswer) {
            score++;
        } else {
            timer -= 10;
        }

        currentQuestionIndex++;

        if (currentQuestionIndex < questions.length) {
            showQuestion();
        } else {
            endQuiz();
        }
    }

    function startTimer() {
        let seconds = 60; 
        timer = setInterval(function () {
            seconds--;

            if (seconds <= 0) {
                clearInterval(timer);
                endQuiz();
            }
        }, 1000);
    }

    function startTimer() {
        let seconds = 60;
        timer = setInterval(function () {
            seconds--;
    
            if (seconds <= 0) {
                clearInterval(timer); 
                endQuiz();
            }
        }, 1000);
    }
    

    function endQuiz() {
        clearInterval(timer);
        quizScreen.style.display = "none";
        endScreen.style.display = "flex";
        finalScoreSpan.textContent = score;
    }
    submitButton.addEventListener("click", () => checkAnswer());
    startButton.addEventListener("click", startQuiz);
    saveScoreButton.addEventListener("click", saveScore);
});

function saveScore() {
    const initialsInput = document.getElementById("initials");
    const initials = initialsInput.value.toUpperCase();
    if (initials.trim() ===""){
        alert("Please enter your initials");
        return;
    }

    const scoreData = {
        initials: initials,
        score: score,
    }


    const highScores = JSON.parse(localStorage.getItem("highscores")) || [];
    highScores.push(scoreData);
    highScores.sort((a,b) => b.score - a.score);
    localStorage.setItem("highScores", JSON.stringify(highScores));
    
    alert(`Score Saved for ${initials}!`);
}