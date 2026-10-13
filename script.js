const roles = [
  "Full-Stack Web Engineer",
  "SEO Optimization Specialist",
  "UI & UX Designer",
  "Computer Science Specialist"
];

let roleIndex = 0;
let charIndex = 0;
let isDeleting = false;

function typeEffect() {
  const typingElement = document.getElementById("typing-element");
  if (!typingElement) return;

  const currentRole = roles[roleIndex];
  
  if (isDeleting) {
    typingElement.textContent = currentRole.substring(0, charIndex - 1);
    charIndex--;
  } else {
    typingElement.textContent = currentRole.substring(0, charIndex + 1);
    charIndex++;
  }

  let typeSpeed = isDeleting ? 40 : 80;

  if (!isDeleting && charIndex === currentRole.length) {
    typeSpeed = 2000;
    isDeleting = true;
  } else if (isDeleting && charIndex === 0) {
    isDeleting = false;
    roleIndex = (roleIndex + 1) % roles.length;
    typeSpeed = 500;
  }

  setTimeout(typeEffect, typeSpeed);
}

const projectsData = [
  {
    title: "Little Eats App",
    description: "Fine dining web application featuring an interactive online ordering system, dynamic currency conversion, and integrated payment execution.",
    image: "images/sofia.jpg",
    tags: ["JavaScript", "HTML/CSS", "PayPal API"],
    liveUrl: "https://little-eats.vercel.app/",
    githubUrl: "https://github.com/SkylerVee/Little-Eats.git"
  },
  {
    title: "Platinum Liquor",
    description: "E-commerce web application featuring mobile payment checkout integrations, custom database management, and mobile indexing optimization.",
    image: "images/catalog background.jpg",
    tags: ["Supabase", "M-Pesa API", "JavaScript"],
    liveUrl: "https://platinum-liqour.netlify.app/",
    githubUrl: "https://github.com/SkylerVee/Platinum-Liquor.git"
  },
  {
    title: "Skye Motors",
    description: "Automotive showcase platform featuring car brand and model listings, detailed specs filtering, and an integrated booking session form for test drives.",
    image: "images/Bently.jpeg",
    tags: ["React", "Node.js", "CSS Grid", "Vercel"],
    liveUrl: "https://skye-motors.vercel.app/",
    githubUrl: "https://github.com/SkylerVee/Skye-Motors.git"
  },
  {
    title: "Portfolio Website",
    description: "Modern developer portfolio featuring an interactive HTML5 canvas background, sleek glassmorphism UI, smooth scroll interactions, and responsive design.",
    image: "images/Portifolio.jpeg",
    tags: ["HTML5", "CSS3", "JavaScript", "Vercel"],
    liveUrl: "#home",
    githubUrl: "https://github.com/SkylerVee/Portifolio.git"
  }
];

function renderProjects() {
  const container = document.getElementById("projects-container");
  if (!container) return;

  container.innerHTML = projectsData.map(project => `
    <div class="project-card reveal">
      <div class="project-img" style="background-image: url('${project.image}');">
        <div class="project-links-overlay">
          <a href="${project.githubUrl}" target="_blank" aria-label="GitHub Repository"><i class="fa-brands fa-github"></i></a>
          <a href="${project.liveUrl}" target="_blank" aria-label="Live Demo"><i class="fa-solid fa-arrow-up-right-from-square"></i></a>
        </div>
      </div>
      <div class="project-body">
        <h3>${project.title}</h3>
        <p>${project.description}</p>
        <div class="project-tags">
          ${project.tags.map(tag => `<span class="tag">${tag}</span>`).join('')}
        </div>
        <a href="${project.liveUrl}" target="_blank" class="btn btn-secondary" style="margin-top:auto; width: 100%; justify-content: center;">View Project</a>
      </div>
    </div>
  `).join('');
}

function initConstellationBg() {
  const canvas = document.getElementById('bg-canvas');
  if (!canvas) return;
  const ctx = canvas.getContext('2d');

  let width = canvas.width = window.innerWidth;
  let height = canvas.height = window.innerHeight;

  window.addEventListener('resize', () => {
    width = canvas.width = window.innerWidth;
    height = canvas.height = window.innerHeight;
  });

  const particles = [];
  const particleCount = Math.floor((width * height) / 15000);

  class Particle {
    constructor() {
      this.x = Math.random() * width;
      this.y = Math.random() * height;
      this.vx = (Math.random() - 0.5) * 0.6;
      this.vy = (Math.random() - 0.5) * 0.6;
      this.radius = Math.random() * 1.8 + 1;
    }

    update() {
      this.x += this.vx;
      this.y += this.vy;

      if (this.x < 0 || this.x > width) this.vx *= -1;
      if (this.y < 0 || this.y > height) this.vy *= -1;
    }

    draw() {
      ctx.beginPath();
      ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
      ctx.fillStyle = '#00f2fe';
      ctx.fill();
    }
  }

  for (let i = 0; i < particleCount; i++) {
    particles.push(new Particle());
  }

  function animate() {
    ctx.clearRect(0, 0, width, height);

    for (let i = 0; i < particles.length; i++) {
      particles[i].update();
      particles[i].draw();

      for (let j = i + 1; j < particles.length; j++) {
        const dx = particles[i].x - particles[j].x;
        const dy = particles[i].y - particles[j].y;
        const dist = Math.sqrt(dx * dx + dy * dy);

        if (dist < 120) {
          ctx.beginPath();
          ctx.moveTo(particles[i].x, particles[i].y);
          ctx.lineTo(particles[j].x, particles[j].y);
          ctx.strokeStyle = `rgba(0, 242, 254, ${1 - dist / 120})`;
          ctx.lineWidth = 0.5;
          ctx.stroke();
        }
      }
    }

    requestAnimationFrame(animate);
  }

  animate();
}

document.addEventListener("DOMContentLoaded", () => {
  typeEffect();
  initConstellationBg();
  renderProjects();

  const observerOptions = {
    root: null,
    rootMargin: '0px',
    threshold: 0.15
  };

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('active');
      }
    });
  }, observerOptions);

  document.querySelectorAll('.reveal').forEach(element => {
    observer.observe(element);
  });

  const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
  const navLinks = document.querySelector('.nav-links');

  if (mobileMenuBtn && navLinks) {
    mobileMenuBtn.addEventListener('click', () => {
      navLinks.classList.toggle('active');
      
      const icon = mobileMenuBtn.querySelector('i');
      if (icon) {
        icon.classList.toggle('fa-bars');
        icon.classList.toggle('fa-xmark');
      }
    });

    document.querySelectorAll('.nav-links a').forEach(link => {
      link.addEventListener('click', () => {
        navLinks.classList.remove('active');
        const icon = mobileMenuBtn.querySelector('i');
        if (icon) {
          icon.classList.add('fa-bars');
          icon.classList.remove('fa-xmark');
        }
      });
    });
  }
});