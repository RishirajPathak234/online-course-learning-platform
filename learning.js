const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
const nav = document.querySelector('nav');

mobileMenuBtn.addEventListener('click', () => {
  nav.classList.toggle('show');
  mobileMenuBtn.textContent = nav.classList.contains('show') ? '✕' : '☰';
});

const navLinks = document.querySelectorAll('nav a');
navLinks.forEach(link => {
  link.addEventListener('click', () => {
    if (nav.classList.contains('show')) {
      nav.classList.remove('show');
      mobileMenuBtn.textContent = '☰';
    }
  });
});

const tabButtons = document.querySelectorAll('.tab-btn');
const tabContents = document.querySelectorAll('.tab-content');

tabButtons.forEach(button => {
  button.addEventListener('click', () => {
    tabButtons.forEach(btn => btn.classList.remove('active'));
    tabContents.forEach(content => content.classList.remove('active'));
    button.classList.add('active');
    const tabId = button.getAttribute('data-tab');
    document.getElementById(tabId).classList.add('active');
  });
});

const syllabusHeaders = document.querySelectorAll('.syllabus-header');

syllabusHeaders.forEach(header => {
  header.addEventListener('click', () => {
    const content = header.nextElementSibling;
    const icon = header.querySelector('.toggle-icon');
    content.classList.toggle('show');
    icon.textContent = content.classList.contains('show') ? '−' : '+';
  });
});

function startCountdown() {
  const endTime = new Date();
  endTime.setHours(endTime.getHours() + 24);
  const timerElement = document.getElementById('timer');

  function updateTimer() {
    const now = new Date();
    const diff = endTime - now;

    if (diff <= 0) {
      timerElement.textContent = "Offer expired";
      return;
    }

    const hours = Math.floor(diff / (1000 * 60 * 60));
    const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((diff % (1000 * 60)) / 1000);

    timerElement.textContent = `${String(hours).padStart(2, '0')}:${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;
  }

  updateTimer();
  setInterval(updateTimer, 1000);
}

startCountdown();

const enrollButtons = document.querySelectorAll('.enroll-btn');

enrollButtons.forEach(button => {
  button.addEventListener('click', (e) => {
    e.preventDefault();
    alert('Thank you for your interest!');
    window.location.href = 'course.html';
  });
});

const scrollToTopBtn = document.querySelector('.scroll-to-top');

window.addEventListener('scroll', () => {
  if (window.pageYOffset > 300) {
    scrollToTopBtn.classList.add('visible');
  } else {
    scrollToTopBtn.classList.remove('visible');
  }
});

scrollToTopBtn.addEventListener('click', () => {
  window.scrollTo({
    top: 0,
    behavior: 'smooth'
  });
});

document.addEventListener('DOMContentLoaded', () => {
  startCountdown();
});