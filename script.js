let currentQuizData; // Variable to hold the current quiz data

async function loadQuiz() {
    const urlParams = new URLSearchParams(window.location.search);
    const quizFile = urlParams.get('quiz');

    if (!quizFile) {
        document.getElementById("quiz-title").innerText = "Quiz not found!";
        return;
    }

    try {
        const response = await fetch(`quizzes/${quizFile}`);
        currentQuizData = await response.json(); // Store the loaded quiz data
        displayQuiz(currentQuizData);
    } catch (error) {
        console.error("Error loading quiz:", error);
        document.getElementById("quiz-title").innerText = "Failed to load quiz.";
    }
}

function displayQuiz(quizData) {
    document.getElementById("quiz-title").innerText = quizData.title;
    const quizQuestionsDiv = document.getElementById("quiz-questions");
    quizQuestionsDiv.innerHTML = "";

    quizData.questions.forEach((question, index) => {
        const questionDiv = document.createElement("div");
        questionDiv.className = "question";
        questionDiv.dataset.correctAnswer = question.correct_answer;

        const questionTitle = document.createElement("p");
        questionTitle.className = "question-title";
        questionTitle.innerText = `${index + 1}. ${question.stem}`;
        questionDiv.appendChild(questionTitle);

        const options = [...question.distractors, question.correct_answer];
        shuffleArray(options);

        const optionsList = document.createElement("ul");
        optionsList.className = "options";

        options.forEach(option => {
            const optionItem = document.createElement("li");
            const optionInput = document.createElement("input");
            optionInput.type = "radio";
            optionInput.name = `question-${index}`;
            optionInput.value = option;
            optionItem.appendChild(optionInput);
            optionItem.appendChild(document.createTextNode(option));
            optionsList.appendChild(optionItem);
        });

        questionDiv.appendChild(optionsList);
        quizQuestionsDiv.appendChild(questionDiv);
    });
}

function submitQuiz() {
    let score = 0;
    const questions = document.querySelectorAll(".question");
    questions.forEach((question, index) => {
        const selectedOption = document.querySelector(`input[name="question-${index}"]:checked`);
        if (selectedOption && selectedOption.value === currentQuizData.questions[index].correct_answer) {
            score++;
        }
    });

    const resultDiv = document.getElementById("quiz-result");
    resultDiv.innerText = `You scored ${score} out of ${questions.length}.`;
}

function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
}

loadQuiz();
