// Header shrink on scroll
window.addEventListener('scroll', () => {
  const header = document.getElementById('header');
  header.classList.toggle('shrink', window.scrollY > 50);
});

// Scroll progress bar
window.addEventListener('scroll', () => {
  const scrollTop = window.scrollY;
  const docHeight = document.body.scrollHeight - window.innerHeight;
  const scrollPercent = (scrollTop / docHeight) * 100;
  document.getElementById('progress-bar').style.width = scrollPercent + '%';
});

// Scroll fade-in effect
const fadeElements = document.querySelectorAll('.fade-in');
const observer = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) entry.target.classList.add('visible');
  });
});
fadeElements.forEach(el => observer.observe(el));

// Typing effect
const text = "Hi, I’m Rendi Febriansyah";
const typingElement = document.querySelector('.typing-text');
let index = 0;
function type() {
  if (index < text.length) {
    typingElement.textContent += text.charAt(index);
    index++;
    setTimeout(type, 100);
  }
}
typingElement.textContent = '';
type();
