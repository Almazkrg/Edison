// Smooth scrolling for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        document.querySelector(this.getAttribute('href')).scrollIntoView({
            behavior: 'smooth'
        });
    });
});

// Add animation to invention cards when they come into view
const observerOptions = {
    threshold: 0.1
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

// Apply animation to invention cards
document.querySelectorAll('.invention-card').forEach(card => {
    card.style.opacity = '0';
    card.style.transform = 'translateY(20px)';
    card.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
    observer.observe(card);
});

// Add scroll-based header transparency
const header = document.querySelector('header');
let lastScroll = 0;

window.addEventListener('scroll', () => {
    const currentScroll = window.pageYOffset;
    
    if (currentScroll <= 0) {
        header.style.backgroundColor = 'var(--primary-color)';
        return;
    }
    
    if (currentScroll > lastScroll) {
        // Scrolling down
        header.style.backgroundColor = 'rgba(44, 62, 80, 0.9)';
    } else {
        // Scrolling up
        header.style.backgroundColor = 'var(--primary-color)';
    }
    
    lastScroll = currentScroll;
});

// Gallery functionality
document.addEventListener('DOMContentLoaded', function() {
    const galleryItems = document.querySelectorAll('.gallery-item');
    
    galleryItems.forEach(item => {
        item.addEventListener('click', function() {
            const img = this.querySelector('img');
            const caption = this.querySelector('.gallery-caption');
            
            if (caption.style.transform === 'translateY(0px)') {
                caption.style.transform = 'translateY(100%)';
            } else {
                caption.style.transform = 'translateY(0)';
            }
        });
    });
});

// Map functionality
function initMap() {
    const map = new google.maps.Map(document.getElementById('edison-map'), {
        center: { lat: 40.7128, lng: -74.0060 }, // New York coordinates
        zoom: 10
    });

    const locations = [
        {
            position: { lat: 40.7128, lng: -74.0060 },
            title: "Edison's Laboratory",
            info: "Menlo Park Laboratory where many inventions were created"
        },
        {
            position: { lat: 40.7589, lng: -73.9851 },
            title: "Edison's Home",
            info: "Thomas Edison's residence in New York"
        }
    ];

    locations.forEach(location => {
        const marker = new google.maps.Marker({
            position: location.position,
            map: map,
            title: location.title
        });

        const infoWindow = new google.maps.InfoWindow({
            content: `<h3>${location.title}</h3><p>${location.info}</p>`
        });

        marker.addListener('click', () => {
            infoWindow.open(map, marker);
        });
    });
}

// Quiz functionality
document.addEventListener('DOMContentLoaded', function() {
    const quizOptions = document.querySelectorAll('.quiz-option');
    const submitButton = document.querySelector('.submit-quiz');
    const quizResult = document.querySelector('.quiz-result');
    
    let selectedAnswer = null;
    
    quizOptions.forEach(option => {
        option.addEventListener('click', function() {
            // Remove selected class from all options
            quizOptions.forEach(opt => opt.classList.remove('selected'));
            
            // Add selected class to clicked option
            this.classList.add('selected');
            selectedAnswer = this.dataset.answer;
        });
    });
    
    submitButton.addEventListener('click', function() {
        if (!selectedAnswer) {
            alert('Please select an answer!');
            return;
        }
        
        const correctAnswer = 'A'; // This should match the correct answer in your HTML
        
        if (selectedAnswer === correctAnswer) {
            quizResult.textContent = 'Correct! Well done!';
            quizResult.classList.remove('incorrect');
            quizResult.classList.add('correct');
        } else {
            quizResult.textContent = 'Incorrect. Try again!';
            quizResult.classList.remove('correct');
            quizResult.classList.add('incorrect');
        }
        
        quizResult.style.display = 'block';
    });
}); 