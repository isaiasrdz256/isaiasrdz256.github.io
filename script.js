document.addEventListener('DOMContentLoaded', function() {
    // Scroll to top button
    const scrollToTopBtn = document.createElement('button');
    scrollToTopBtn.innerHTML = '↑';
    scrollToTopBtn.id = 'scrollToTopBtn';
    document.body.appendChild(scrollToTopBtn);

    window.addEventListener('scroll', function() {
        scrollToTopBtn.style.display = window.pageYOffset > 100 ? 'block' : 'none';
    });

    scrollToTopBtn.addEventListener('click', function() {
        window.scrollTo({top: 0, behavior: 'smooth'});
    });

    // Dark mode toggle
    const darkModeToggle = document.createElement('button');
    darkModeToggle.innerHTML = '🌓';
    darkModeToggle.id = 'darkModeToggle';
    document.body.insertBefore(darkModeToggle, document.body.firstChild);

    darkModeToggle.addEventListener('click', function() {
        document.body.classList.toggle('dark-mode');
        localStorage.setItem('darkMode', document.body.classList.contains('dark-mode'));
    });

    // Check for saved dark mode preference
    if (localStorage.getItem('darkMode') === 'true') {
        document.body.classList.add('dark-mode');
    }

    // CDN Quiz
    const quizContainer = document.createElement('div');
    quizContainer.id = 'quizContainer';
    document.querySelector('main').appendChild(quizContainer);

    const quizQuestions = [
        {
            question: "What does CDN stand for?",
            options: ["Content Delivery Network", "Computer Data Network", "Centralized Distribution Node", "Cloud Data Network"],
            correct: 0
        },
        {
            question: "Which of the following is NOT a benefit of using a CDN?",
            options: ["Improved load times", "Reduced bandwidth costs", "Increased server-side processing", "Enhanced content availability"],
            correct: 2
        },
        {
            question: "Which company is NOT typically considered a CDN provider?",
            options: ["Cloudflare", "Akamai", "Microsoft Excel", "Amazon CloudFront"],
            correct: 2
        }
    ];

    let currentQuestion = 0;
    let score = 0;

    function displayQuestion() {
        const q = quizQuestions[currentQuestion];
        quizContainer.innerHTML = `
            <h3>Question ${currentQuestion + 1}:</h3>
            <p>${q.question}</p>
            ${q.options.map((option, index) => 
                `<button onclick="checkAnswer(${index})">${option}</button>`
            ).join('')}
        `;
    }

    window.checkAnswer = function(index) {
        if (index === quizQuestions[currentQuestion].correct) {
            score++;
        }
        currentQuestion++;
        if (currentQuestion < quizQuestions.length) {
            displayQuestion();
        } else {
            quizContainer.innerHTML = `
                <h3>Quiz Complete!</h3>
                <p>Your score: ${score} out of ${quizQuestions.length}</p>
                <button onclick="resetQuiz()">Try Again</button>
            `;
        }
    }

    window.resetQuiz = function() {
        currentQuestion = 0;
        score = 0;
        displayQuestion();
    }

    displayQuestion();
});
