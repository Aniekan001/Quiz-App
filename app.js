const questionElement = document.querySelector(".questionss")   //questions asked
const answersdiv = document.querySelector(".answers")     //the div that is supposed to contain the answers
const next = document.querySelector(".nextbutton")
var timer = document.querySelector(".timer")

var questions = [   //questions and their supposed answers
    {
        question: "Which is the largest animal in the world?",
        answers: [
            { text: "Shark", correct: false },
            { text: "Blue whale", correct: true },
            { text: "Elephant", correct: false },
            { text: "Giraffe", correct: false }
        ]
    },
    {
        question: 'Which planet is known as the "Red Planet"',
        answers: [
            { text: "Earth", correct: false },
            { text: "Mars", correct: true },
            { text: "Jupiter", correct: false },
            { text: "Venus", correct: false }
        ]
    },
    {
        question: 'Who wrote the play "Romeo and Juliet"?',
        answers: [
            { text: "William Shakespeare", correct: true },
            { text: "Charles Dickens", correct: false },
            { text: "George Orwell", correct: false },
            { text: "Leo Tolstoy", correct: false }
        ]
    },
    {
        question: "What is the capital of Japan?",
        answers: [
            { text: "Beijing", correct: false },
            { text: "Seoul", correct: false },
            { text: "Bangkok", correct: false },
            { text: "Tokyo", correct: true }
        ]
    },
    {
        question: "The chemical symbol for Gold is",
        answers: [
            { text: "Ag", correct: false },
            { text: "Au", correct: true },
            { text: "Go", correct: false },
            { text: "Gd", correct: false }
        ]
    },
    {
        question: "Who invented the light bulb?",
        answers: [
            { text: "Nikola Tesla", correct: false },
            { text: "Alexander Graham Bell", correct: false },
            { text: "Thomas Eddison", correct: true },
            { text: "Albert Einstein", correct: false }
        ]
    },
    {
        question: "Which ocean is the largest in the world?",
        answers: [
            { text: "Atlantic Ocean", correct: false },
            { text: "Pacific Ocean", correct: true },
            { text: "Indian Ocean", correct: false },
            { text: "Arctic Ocean", correct: false }
        ]
    },
    {
        question: "Which gas do humans inhale to survive?",
        answers: [
            { text: "Oxygen", correct: true },
            { text: "Carbon dioxide", correct: false },
            { text: "Nitrogen", correct: false },
            { text: "Hydrogen", correct: false }
        ]
    },
    {
        question: 'Who is known as the “Father of Computers”?',
        answers: [
            { text: "Alan Turing", correct: false },
            { text: "Steve Jobs", correct: false },
            { text: "Charles Babbage", correct: true },
            { text: "Bill Gates", correct: false }
        ]
    },
    {
        question: "In which year did Nigeria gain independence?",
        answers: [
            { text: "1957", correct: false },
            { text: "1960", correct: true },
            { text: "1963", correct: false },
            { text: "1970", correct: false }
        ]
    }
]

let currentQuestionIndex = 0    //first question index
let score = 0
let currentQuestion
let startingtime = 5 * (questions.length)     //time allocated for the quiz should be 5s times the number of questons given
let timeinterval

function startQuiz() {
    timer.style.color = "green"
    currentQuestionIndex = 0
    score = 0
    next.innerHTML = "Next"   //text the next button should display
    startingtime = 5 * (questions.length)
    hours = Math.floor(startingtime / (60 * 60))
    minutes = Math.floor(startingtime % (60 * 60) / (60))
    seconds = Math.floor(startingtime % (60))    //calculations to get the mins and sec according to the starting time given
    timer.textContent = `${(hours < 10 ? "0" : "") + hours}:${(minutes < 10 ? "0" : "") + minutes}:${(seconds < 10 ? "0" : "") + seconds}`   //how the time should be displayed
    timeinterval = setInterval(timerfunction, 1000)   //how the time reduces should be according to normal time
    showQuestion()
}

function showQuestion() {
    resetState()   //as each question is displayed the former answers should be removed and new answers put in place
    currentQuestion = questions[currentQuestionIndex]   // lcate the current question from the array
    let questionNo = currentQuestionIndex + 1
    questionElement.innerHTML = questionNo + ") " + currentQuestion.question  //gives the question in display

    currentQuestion.answers.forEach(answer => {   //distribute each possible answers to each button
        const button = document.createElement("button")
        button.innerHTML = answer.text
        button.classList.add("btn")
        answersdiv.appendChild(button)
        if (answer.correct) {
            button.dataset.correct = answer.correct   //if answer is correct, it shouldbe true
        }
        button.addEventListener("click", selectAnswer)   //function for selecting answers
    })
}
function resetState() {
    next.style.display = "none"
    while (answersdiv.firstChild) {
        answersdiv.removeChild(answersdiv.firstChild)   //as questions change, the answers for the previous questions need to be removed before the new ones comes in place
    }
}

function selectAnswer(e) {
    const selectBtn = e.target
    const isCorrect = selectBtn.dataset.correct === "true"
    if (isCorrect) {
        selectBtn.classList.add("correct")
        score++
    } else {
        selectBtn.classList.add("incorrect")
    }
    Array.from(answersdiv.children).forEach(button => {
        if (button.dataset.correct === "true") {
            button.classList.add("correct")
        }
        button.disabled = true
    })
    next.style.display = "block"  //after each click of answer,the next button should display
}
function showScore() {   //this works after the last question has been reached
    resetState()
    clearInterval(timeinterval)
    questionElement.innerHTML = `You scored ${score} out of ${questions.length}`
    next.innerHTML = "Play Again"
    next.style.display = "block"
}
function handlenextbutton() {   //functions for clicking the next button
    currentQuestionIndex++
    if (currentQuestionIndex < questions.length) {
        showQuestion()
    } else {
        showScore()
    }
}

next.addEventListener("click", () => {
    if (currentQuestionIndex < questions.length) {
        handlenextbutton()
    } else {
        startQuiz()
    }
})
function timerfunction() {    //want to integrate a timer to the quiz
    hours = Math.floor(startingtime / (60 * 60))
    minutes = Math.floor(startingtime % (60 * 60) / (60))
    seconds = Math.floor(startingtime % (60))

    timer.textContent = `${(hours < 10 ? "0" : "") + hours}:${(minutes < 10 ? "0" : "") + minutes}:${(seconds < 10 ? "0" : "") + seconds}`
    startingtime--

    stop()
}
function stop() {  //how the timer behaves when it wants to stop
    if (startingtime < 15) {
        timer.style.color = "gold"

        if (startingtime < 5) {
            timer.style.color = "red"

            if (startingtime < 0) {
                timer.textContent = `00:00:00`
                next.style.display = "block"
               showScore()
               startingtime = 5*(questions.length)
               clearInterval(timeinterval)
               currentQuestionIndex = questions.length
            }
        }
    }
}
startQuiz()



