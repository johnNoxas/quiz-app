function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
}

function displayQuiz(quizData) {
    document.getElementById("quiz-title").innerText = quizData.title;
    const quizQuestionsDiv = document.getElementById("quiz-questions");
    quizQuestionsDiv.innerHTML = "";

    quizData.questions.forEach((question, index) => {
        const questionDiv = document.createElement("div");
        questionDiv.className = "question";

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
    const quizData = document.querySelectorAll(".question");
    quizData.forEach((question, index) => {
        const selectedOption = document.querySelector(`input[name="question-${index}"]:checked`);
        if (selectedOption && selectedOption.value === quizData[index].dataset.correctAnswer) {
            score++;
        }
    });

    const resultDiv = document.getElementById("quiz-result");
    resultDiv.innerText = `You scored ${score} out of ${quizData.length}.`;
}
