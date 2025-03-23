const coursesData = [
    {
        id: 1,
        title: "Complete Web Development Bootcamp",
        instructor: "Sarah Johnson",
        image: "./assets/1.png",
        rating: 4.8,
        reviews: 3245,
        price: 749,
        difficulty: "beginner",
        duration: "long",
        category: "web development",
        popular: true
    },
    {
        id: 2,
        title: "Machine Learning A-Z",
        instructor: "David Lee",
        image: "./assets/2.png",
        rating: 4.7,
        reviews: 2897,
        price: 1099,
        difficulty: "intermediate",
        duration: "long",
        category: "data science",
        popular: true
    },
    {
        id: 3,
        title: "Python for Data Science",
        instructor: "Michael Brown",
        image: "./assets/3.png",
        rating: 4.6,
        reviews: 1876,
        price: 999,
        difficulty: "beginner",
        duration: "medium",
        category: "data science",
        popular: true
    },
    {
        id: 4,
        title: "UX/UI Design Fundamentals",
        instructor: "Emma Wilson",
        image: "./assets/4.png",
        rating: 4.9,
        reviews: 1245,
        price: 1399,
        difficulty: "beginner",
        duration: "medium",
        category: "design",
        popular: true
    },
    {
        id: 5,
        title: "JavaScript Advanced Concepts",
        instructor: "James Anderson",
        image: "/assets/5.png",
        rating: 4.7,
        reviews: 1567,
        price: 1099,
        difficulty: "advanced",
        duration: "medium",
        category: "web development",
        popular: true
    },
    {
        id: 6,
        title: "iOS App Development with Swift",
        instructor: "Lisa Wang",
        image: "./assets/8.png",
        rating: 4.8,
        reviews: 987,
        price: 1299,
        difficulty: "intermediate",
        duration: "long",
        category: "mobile development",
        popular: false
    },
    {
        id: 7,
        title: "Photography Masterclass",
        instructor: "Robert Chen",
        image: "./assets/9.png",
        rating: 4.5,
        reviews: 2345,
        price: 799,
        difficulty: "beginner",
        duration: "short",
        category: "photography",
        popular: false
    },
    {
        id: 8,
        title: "Digital Marketing Strategy",
        instructor: "Jennifer Garcia",
        image: "./assets/7.png",
        rating: 4.6,
        reviews: 1234,
        price: 1049,
        difficulty: "intermediate",
        duration: "medium",
        category: "marketing",
        popular: false
    },
    {
        id: 9,
        title: "Introduction to 3D Modeling",
        instructor: "Alex Turner",
        image: "./assets/10.png",
        rating: 4.4,
        reviews: 874,
        price: 899,
        difficulty: "beginner",
        duration: "short",
        category: "design",
        popular: false
    },
    {
        id: 10,
        title: "Cybersecurity Fundamentals",
        instructor: "Daniel Martinez",
        image: "./assets/6.png",
        rating: 4.9,
        reviews: 776,
        price: 1199,
        difficulty: "intermediate",
        duration: "medium",
        category: "it & security",
        popular: true
    }
];

const popularCoursesContainer = document.getElementById('popular-courses-container');
const recommendationsContainer = document.getElementById('recommendations-container');
const searchInput = document.getElementById('search-input');
const searchButton = document.getElementById('search-btn');
const difficultySelect = document.getElementById('difficulty');
const priceSelect = document.getElementById('price');
const durationSelect = document.getElementById('duration');
const filterButton = document.getElementById('filter-btn');
const loginButton = document.getElementById('login-btn');
const signupButton = document.getElementById('signup-btn');

document.addEventListener('DOMContentLoaded', function() {
    displayPopularCourses();
    displayRecommendedCourses();
    setupEventListeners();
});

function displayPopularCourses() {
    const popularCourses = coursesData.filter(course => course.popular);
    renderCourses(popularCourses, popularCoursesContainer);
}

function displayRecommendedCourses() {
    const nonPopularCourses = coursesData.filter(course => !course.popular);
    const shuffled = [...nonPopularCourses].sort(() => 0.5 - Math.random());
    const recommendedCourses = shuffled.slice(0, 4);
    renderCourses(recommendedCourses, recommendationsContainer);
}

function renderCourses(courses, container) {
    container.innerHTML = '';
    
    if (courses.length === 0) {
        container.innerHTML = '<p class="no-results">No courses found matching your criteria.</p>';
        return;
    }
    
    courses.forEach(course => {
        const courseElement = createCourseElement(course);
        container.appendChild(courseElement);
    });
}

function createCourseElement(course) {
    const courseElement = document.createElement('div');
    courseElement.className = 'course-card';
    
    const priceDisplay = course.price === 0 ? 
        '<span class="course-price free">Free</span>' : 
        `<span class="course-price">${course.price}</span>`;
    
    courseElement.innerHTML = `
        <img src="${course.image}" alt="${course.title}" class="course-image">
        <div class="course-info">
            <h3 class="course-title">${course.title}</h3>
            <p class="course-instructor">By ${course.instructor}</p>
            <div class="course-meta">
                <div class="course-rating">
                    ★★★★★
                    <span>${course.rating} (${course.reviews})</span>
                </div>
                ${priceDisplay}
            </div>
            <div class="course-details">
                <span>Difficulty: ${capitalizeFirstLetter(course.difficulty)}</span>
                <span>${getDurationText(course.duration)}</span>
            </div>
        </div>
    `;
    
    courseElement.addEventListener('click', () => {
        alert(`You selected: ${course.title}`);
    });
    
    return courseElement;
}

function capitalizeFirstLetter(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
}

function getDurationText(duration) {
    switch(duration) {
        case 'short': return '<3 hours';
        case 'medium': return '3-10 hours';
        case 'long': return '>10 hours';
        default: return duration;
    }
}

function setupEventListeners() {
    searchButton.addEventListener('click', handleSearch);
    searchInput.addEventListener('keypress', function(e) {
        if (e.key === 'Enter') {
            handleSearch();
        }
    });
    
    filterButton.addEventListener('click', applyFilters);
    
    loginButton.addEventListener('click', () => {
        alert('Login functionality would open here');
    });
    
    signupButton.addEventListener('click', () => {
        alert('Sign up functionality would open here');
    });
}

function handleSearch() {
    const searchTerm = searchInput.value.trim().toLowerCase();
    
    if (searchTerm === '') {
        displayPopularCourses();
        return;
    }
    
    const searchResults = coursesData.filter(course => 
        course.title.toLowerCase().includes(searchTerm) || 
        course.instructor.toLowerCase().includes(searchTerm) || 
        course.category.toLowerCase().includes(searchTerm)
    );
    
    popularCoursesContainer.previousElementSibling.textContent = 'Search Results';
    renderCourses(searchResults, popularCoursesContainer);
}

function applyFilters() {
    const difficulty = difficultySelect.value;
    const price = priceSelect.value;
    const duration = durationSelect.value;
    
    let filteredCourses = [...coursesData];
    
    if (difficulty !== 'all') {
        filteredCourses = filteredCourses.filter(course => course.difficulty === difficulty);
    }
    
    if (price !== 'all') {
        if (price === 'free') {
            filteredCourses = filteredCourses.filter(course => course.price === 0);
        } else if (price === 'paid') {
            filteredCourses = filteredCourses.filter(course => course.price > 0);
        }
    }
    
    if (duration !== 'all') {
        filteredCourses = filteredCourses.filter(course => course.duration === duration);
    }
    
    popularCoursesContainer.previousElementSibling.textContent = 'Filtered Courses';
    renderCourses(filteredCourses, popularCoursesContainer);
}