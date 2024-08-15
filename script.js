document.addEventListener("DOMContentLoaded", function () {
    const passwordScreen = document.getElementById('password-screen');
    const passwordInput = document.getElementById('password');
    const passwordSubmit = document.getElementById('submit-password');

    passwordSubmit.addEventListener('click', function (event) {
        event.preventDefault(); // Prevent the default form submission behavior
        const passwordValue = passwordInput.value.trim(); // Trim any whitespace
        if (passwordValue === "iloveyourbutt") {
            passwordScreen.style.display = 'none';
            document.getElementById('splash-screen').style.display = 'block'; // Show splash screen after password
        } else {
            alert('Incorrect password. Please try again.');
        }
    });
});

// Splash screen
function start() {
    document.getElementById('splash-screen').style.display = 'none';
    document.getElementById('content').style.display = 'block';
}

// Section navigation
function showSection(sectionId) {
    const sections = document.querySelectorAll('section');
    sections.forEach(section => {
        section.style.display = 'none';
    });
    document.getElementById(sectionId).style.display = 'block';
}

// Carousel for Memories section
let currentSlide = 0;
function moveSlide(direction) {
    const carouselInner = document.querySelector('.carousel-inner');
    const images = carouselInner.querySelectorAll('img');
    const totalImages = images.length;
    currentSlide = (currentSlide + direction + totalImages) % totalImages;
    carouselInner.style.transform = `translateX(-${currentSlide * 160}px)`;
}

// Video pop-up for About section
const checkpoints = document.querySelectorAll('.checkpoint');
const videoPopup = document.createElement('div');
videoPopup.className = 'video-popup';
videoPopup.style.display = 'none';
videoPopup.innerHTML = `
    <div class="video-popup-content">
        <span class="close-button">&times;</span>
        <video controls>
            <source src="" type="video/mp4">
            Your browser does not support the video tag.
        </video>
    </div>
`;

document.body.appendChild(videoPopup);

checkpoints.forEach((checkpoint, index) => {
    checkpoint.addEventListener('click', function () {
        const videoElement = videoPopup.querySelector('video');
        videoElement.querySelector('source').src = `videos/video${index + 1}.mp4`;
        videoElement.load();
        videoPopup.style.display = 'block';
    });
});

videoPopup.querySelector('.close-button').addEventListener('click', function () {
    videoPopup.style.display = 'none';
    videoPopup.querySelector('video').pause();
});

// Quiz for Photo Puzzle section
const quizForm = document.getElementById('quiz-form');
quizForm.addEventListener('submit', function (e) {
    e.preventDefault();

    const correctAnswers = ['c', 'a', 'b', 'a', 'c']; // Example answers
    const userAnswers = Array.from(document.querySelectorAll('input[type="radio"]:checked')).map(input => input.value);

    if (userAnswers.length !== correctAnswers.length) {
        alert('Please answer all questions.');
        return;
    }

    const isCorrect = userAnswers.every((answer, index) => answer === correctAnswers[index]);
    if (isCorrect) {
        document.getElementById('code').style.display = 'block';
        document.getElementById('funny-message').style.display = 'block';
    } else {
        alert('Some answers are incorrect. Please try again.');
    }
});
