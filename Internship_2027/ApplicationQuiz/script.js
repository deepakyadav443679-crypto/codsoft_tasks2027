// ==========================================
// QUIZ DATA
// ==========================================

const questions = [

    {
        question:
            "Which language is mainly used to structure a web page?",

        options: [
            "HTML",
            "CSS",
            "JavaScript",
            "SQL"
        ],

        answer: 0
    },


    {
        question:
            "Which language is used to style a web page?",

        options: [
            "HTML",
            "CSS",
            "JavaScript",
            "Java"
        ],

        answer: 1
    },


    {
        question:
            "Which keyword is used to declare a variable in JavaScript?",

        options: [
            "var",
            "int",
            "string",
            "define"
        ],

        answer: 0
    },


    {
        question:
            "Which language is used to communicate with a database?",

        options: [
            "HTML",
            "CSS",
            "SQL",
            "XML"
        ],

        answer: 2
    },


    {
        question:
            "Which symbol is used for an ID selector in CSS?",

        options: [
            ".",
            "#",
            "*",
            "@"
        ],

        answer: 1
    },


    {
        question:
            "Which HTML tag is used to create a hyperlink?",

        options: [
            "<link>",
            "<a>",
            "<href>",
            "<url>"
        ],

        answer: 1
    },


    {
        question:
            "Which method is used to print output in the browser console?",

        options: [
            "console.log()",
            "print()",
            "display()",
            "show()"
        ],

        answer: 0
    },


    {
        question:
            "Which CSS property changes the text color?",

        options: [
            "font-color",
            "text-color",
            "color",
            "background"
        ],

        answer: 2
    },


    {
        question:
            "Which data structure follows the LIFO principle?",

        options: [
            "Queue",
            "Stack",
            "Array",
            "Tree"
        ],

        answer: 1
    },


    {
        question:
            "Which operator is used for strict equality in JavaScript?",

        options: [
            "=",
            "==",
            "===",
            "!="
        ],

        answer: 2
    }

];


// ==========================================
// VARIABLES
// ==========================================

let currentQuestion = 0;

let score = 0;

let wrongAnswers = 0;

let timeLeft = 15;

let timer;

const totalQuestions = questions.length;

const totalTime = 15;


// ==========================================
// HTML ELEMENTS
// ==========================================

const questionElement =
    document.getElementById("question");

const optionsContainer =
    document.getElementById("options-container");

const nextButton =
    document.getElementById("next-btn");

const timerElement =
    document.getElementById("timer");

const questionNumber =
    document.getElementById("question-number");

const progress =
    document.getElementById("progress");

const progressText =
    document.getElementById("progress-text");

const timerCircle =
    document.getElementById("timer-circle");

const resultContainer =
    document.getElementById("result-container");

const app =
    document.querySelector(".app");


// ==========================================
// LOAD QUESTION
// ==========================================

function loadQuestion() {

    clearInterval(timer);

    timeLeft = totalTime;

    timerElement.textContent = timeLeft;

    updateTimerCircle();

    const question =
        questions[currentQuestion];


    // Question number

    let questionNo =
        String(currentQuestion + 1)
        .padStart(2, "0");

    questionNumber.textContent =
        `${questionNo} / ${totalQuestions}`;


    // Question

    questionElement.textContent =
        question.question;


    // Progress

    let percentage =
        ((currentQuestion + 1) / totalQuestions) * 100;

    progress.style.width =
        percentage + "%";

    progressText.textContent =
        percentage + "%";


    // Clear old options

    optionsContainer.innerHTML = "";


    // Create options

    question.options.forEach(
        (option, index) => {

            const button =
                document.createElement("button");

            button.classList.add("option");

            button.innerHTML = `

                <span class="option-letter">
                    ${String.fromCharCode(65 + index)}
                </span>

                <span>
                    ${option}
                </span>

            `;

            button.addEventListener(
                "click",
                () => selectAnswer(button, index)
            );

            optionsContainer.appendChild(button);
        }
    );


    startTimer();
}


// ==========================================
// SELECT ANSWER
// ==========================================

function selectAnswer(button, selectedIndex) {

    clearInterval(timer);

    const buttons =
        document.querySelectorAll(".option");

    const correctAnswer =
        questions[currentQuestion].answer;


    // Disable buttons

    buttons.forEach(btn => {

        btn.disabled = true;

    });


    // Correct answer

    if (selectedIndex === correctAnswer) {

        button.classList.add("correct");

        score++;

    }

    // Wrong answer

    else {

        button.classList.add("wrong");

        wrongAnswers++;


        // Show correct answer

        buttons[correctAnswer]
            .classList.add("correct");
    }
}


// ==========================================
// TIMER
// ==========================================

function startTimer() {

    timer =
        setInterval(() => {

            timeLeft--;

            timerElement.textContent =
                timeLeft;

            updateTimerCircle();


            if (timeLeft <= 5) {

                timerCircle.style.stroke =
                    "#ef4444";

            }


            if (timeLeft === 0) {

                clearInterval(timer);

                timeUp();

            }

        }, 1000);
}


// ==========================================
// TIMER CIRCLE
// ==========================================

function updateTimerCircle() {

    const circumference =
        326.7;

    const progressValue =
        timeLeft / totalTime;

    const offset =
        circumference *
        (1 - progressValue);

    timerCircle.style.strokeDashoffset =
        offset;
}


// ==========================================
// TIME UP
// ==========================================

function timeUp() {

    const buttons =
        document.querySelectorAll(".option");

    const correctAnswer =
        questions[currentQuestion].answer;


    buttons.forEach(button => {

        button.disabled = true;

    });


    buttons[correctAnswer]
        .classList.add("correct");


    wrongAnswers++;
}


// ==========================================
// NEXT QUESTION
// ==========================================

nextButton.addEventListener(
    "click",
    () => {

        currentQuestion++;

        if (currentQuestion < totalQuestions) {

            timerCircle.style.stroke =
                "#6366f1";

            loadQuestion();

        }

        else {

            showResult();

        }

    }
);


// ==========================================
// SHOW RESULT
// ==========================================

function showResult() {

    clearInterval(timer);

    app.style.display = "none";

    resultContainer.style.display = "flex";


    const correct =
        score;

    const wrong =
        totalQuestions - correct;

    const percentage =
        Math.round(
            (correct / totalQuestions) * 100
        );


    document.getElementById("score")
        .textContent = correct;

    document.getElementById("correct-count")
        .textContent = correct;

    document.getElementById("wrong-count")
        .textContent = wrong;

    document.getElementById("percentage")
        .textContent = percentage + "%";


    let message;


    if (percentage >= 80) {

        message =
            "Excellent performance! You have a strong understanding of the concepts.";

    }

    else if (percentage >= 50) {

        message =
            "Good effort! Keep practicing to improve your score.";

    }

    else {

        message =
            "Keep learning and practicing. You can do better next time!";

    }


    document.getElementById("result-message")
        .textContent = message;
}


// ==========================================
// RESTART
// ==========================================

document.getElementById("restart-btn")
    .addEventListener(
        "click",
        () => {

            currentQuestion = 0;

            score = 0;

            wrongAnswers = 0;

            resultContainer.style.display =
                "none";

            app.style.display =
                "block";

            timerCircle.style.stroke =
                "#6366f1";

            loadQuestion();

        }
    );


// ==========================================
// START QUIZ
// ==========================================

loadQuestion();