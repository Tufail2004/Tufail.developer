
// EmailJS ye mail ke liye hain
const EMAILJS_SERVICE_ID = "service_6gty4mh";
const EMAILJS_TEMPLATE_ID = "template_w2zxhso";
const EMAILJS_PUBLIC_KEY = "OxTieu6YeN5bnNu06";


if (window.emailjs) {
  emailjs.init({
    publicKey: EMAILJS_PUBLIC_KEY
  });
}

window.addEventListener('load', () => {
  const fill = document.getElementById('load-fill');
  gsap.to(fill, { width: '100%', duration: 1.1, ease: 'power2.inOut' });
  setTimeout(() => {
    const loader = document.getElementById('loader');
    loader.style.opacity = '0';
    loader.style.visibility = 'hidden';
    setTimeout(() => loader.remove(), 700);
    startPageAnimations();
  }, 1200);
});



const STORAGE_KEY = 'portfolio-theme';
const themeToggleBtn = document.getElementById('theme-toggle-btn');
const themeIcon = document.getElementById('theme-toggle-icon');
const themeMenu = document.getElementById('theme-menu');
const themeOptions = [...document.querySelectorAll('[data-theme-option]')];
const systemThemeQuery = window.matchMedia('(prefers-color-scheme: dark)');

function getThemePreference() {
  const saved = localStorage.getItem(STORAGE_KEY);
  return ['light', 'dark', 'system'].includes(saved) ? saved : 'system';
}

function getResolvedTheme(theme) {
  if (theme === 'light') return 'light';
  if (theme === 'dark') return 'dark';
  return systemThemeQuery.matches ? 'dark' : 'light';
}

function setThemeIcon(theme) {
  const resolved = getResolvedTheme(theme);
  const isDark = resolved === 'dark';
  const icons = {
    light: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" width="20" height="20" aria-hidden="true"><circle cx="12" cy="12" r="4"></circle><path d="M12 2v2M12 20v2M4.93 4.93l1.41 1.41M17.66 17.66l1.41 1.41M2 12h2M20 12h2M4.93 19.07l1.41-1.41M17.66 6.34l1.41-1.41"></path></svg>',
    dark: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" width="20" height="20" aria-hidden="true"><path d="M20 15.5A7.5 7.5 0 0 1 8.5 4a8.5 8.5 0 1 0 11.5 11.5Z"></path></svg>',
    system: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" width="20" height="20" aria-hidden="true"><rect x="3" y="4" width="18" height="12" rx="2"></rect><path d="M8 20h8"></path><path d="M12 16v4"></path></svg>'
  };

  if (themeIcon) {
    themeIcon.innerHTML = icons[theme] || icons.system;
  }

  const nextTitle = theme === 'light' ? 'Switch to light theme' : theme === 'dark' ? 'Switch to dark theme' : 'Switch to system theme';
  if (themeToggleBtn) {
    themeToggleBtn.setAttribute('aria-label', nextTitle);
    themeToggleBtn.setAttribute('title', nextTitle);
    themeToggleBtn.classList.toggle('ring-2', isDark);
    themeToggleBtn.classList.toggle('ring-orange/50', isDark);
  }
}

function applyTheme(theme) {
  const resolved = getResolvedTheme(theme);
  const isDark = resolved === 'dark';
  document.documentElement.classList.toggle('dark', isDark);
  document.documentElement.dataset.theme = theme;
  localStorage.setItem(STORAGE_KEY, theme);

  themeOptions.forEach((option) => {
    const isActive = option.dataset.themeOption === theme;
    option.classList.toggle('active', isActive);
    option.setAttribute('aria-pressed', String(isActive));
  });

  setThemeIcon(theme);
}

function toggleThemeMenu(forceOpen) {
  if (!themeMenu || !themeToggleBtn) return;
  const shouldOpen = typeof forceOpen === 'boolean' ? forceOpen : themeMenu.classList.contains('hidden');
  themeMenu.classList.toggle('hidden', !shouldOpen);
  themeToggleBtn.setAttribute('aria-expanded', String(shouldOpen));
}

if (themeToggleBtn) {
  themeToggleBtn.addEventListener('click', (event) => {
    event.stopPropagation();
    toggleThemeMenu();
  });
}

themeOptions.forEach((option) => {
  option.addEventListener('click', () => {
    const selectedTheme = option.dataset.themeOption;
    applyTheme(selectedTheme);
    toggleThemeMenu(false);
  });
});

document.addEventListener('click', (event) => {
  if (!themeMenu || !themeToggleBtn) return;
  if (!themeMenu.contains(event.target) && !themeToggleBtn.contains(event.target)) {
    toggleThemeMenu(false);
  }
});

systemThemeQuery.addEventListener('change', () => {
  const storedTheme = getThemePreference();
  if (storedTheme === 'system') {
    applyTheme('system');
  }
});

applyTheme(getThemePreference());

const navbar = document.getElementById('navbar');
const backTop = document.getElementById('back-to-top');
window.addEventListener('scroll', () => {
  const scrolled = window.scrollY;
  if (scrolled > 30) {
    navbar.classList.add('glass');
  } else {
    navbar.classList.remove('glass');
  }
  backTop.classList.toggle('show', scrolled > 500);
});
backTop.addEventListener('click', ()=> window.scrollTo({top:0, behavior:'smooth'}));


const toggle = document.getElementById('mobile-toggle');
const menu = document.getElementById('mobile-menu');
toggle.addEventListener('click', ()=> menu.classList.toggle('hidden'));
menu.querySelectorAll('a').forEach(a=> a.addEventListener('click', ()=> menu.classList.add('hidden')));


const roles = ["Frontend Developer", "Full Stack Developer", "Electronics & Communication Engineer"];
const typingEl = document.getElementById('typing');
let ri=0, ci=0, deleting=false;
function typeLoop(){
  const word = roles[ri];
  if(!deleting){
    typingEl.textContent = word.slice(0, ++ci);
    if(ci === word.length){ deleting = true; setTimeout(typeLoop, 1400); return; }
  } else {
    typingEl.textContent = word.slice(0, --ci);
    if(ci === 0){ deleting = false; ri = (ri+1) % roles.length; }
  }
  setTimeout(typeLoop, deleting ? 40 : 75);
}
typeLoop();


gsap.registerPlugin(ScrollTrigger);
function startPageAnimations(){
  gsap.utils.toArray('.reveal').forEach((el, i)=>{
    const anim = el.getAttribute('data-anim') || 'up';
    let fromVars = { opacity: 0, y: 30 };
    if(anim === 'scale') fromVars = { opacity: 0, scale: 0.92, y: 20 };
    gsap.fromTo(el, fromVars, {
      opacity: 1, y: 0, scale: 1, duration: 0.9, ease: 'power3.out',
      scrollTrigger: { trigger: el, start: 'top 88%' }
    });
  });
}


const upcomingCards = document.querySelectorAll('.upcoming-card');
if (window.framerMotion) {
  upcomingCards.forEach((card, index) => {
    card.style.opacity = '0';
    card.style.transform = 'translateY(30px)';
    requestAnimationFrame(() => {
      window.framerMotion.animate(card, { opacity: 1, y: 0 }, { duration: 0.5, delay: index * 0.12, ease: 'easeOut' });
    });
  });
} else {
  upcomingCards.forEach((card, index) => {
    card.style.opacity = '0';
    card.style.transform = 'translateY(26px)';
    setTimeout(() => {
      card.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
      card.style.opacity = '1';
      card.style.transform = 'translateY(0)';
    }, index * 120);
  });
}


const projectMedia = document.querySelectorAll('.project-screenshot');
projectMedia.forEach(img => {
  const wrapper = img.parentElement;
  if (img.complete) {
    wrapper.classList.add('is-loaded');
    return;
  }

  img.addEventListener('load', () => wrapper.classList.add('is-loaded'));
  img.addEventListener('error', () => wrapper.classList.add('is-loaded'));
});

document.querySelectorAll('.project-read-more').forEach(button => {
  const description = button.previousElementSibling;
  if (!description) return;

  button.addEventListener('click', () => {
    const expanded = description.classList.toggle('expanded');
    button.textContent = expanded ? 'Read Less' : 'Read More';
    button.setAttribute('aria-expanded', String(expanded));
  });
});

const filterBtns = document.querySelectorAll('.filter-btn');
const projectCards = document.querySelectorAll('.project-card');
filterBtns.forEach(btn=>{
  btn.addEventListener('click', ()=>{
    filterBtns.forEach(b=>b.classList.remove('active'));
    btn.classList.add('active');
    const f = btn.getAttribute('data-filter');
    projectCards.forEach(card=>{
      const cats = card.getAttribute('data-cat').split(' ');
      const show = f === 'all' || cats.includes(f);
      gsap.to(card, { opacity: show ? 1 : 0, scale: show ? 1 : 0.95, duration: 0.35, onStart: ()=>{ if(show) card.style.display='block'; }, onComplete: ()=>{ if(!show) card.style.display='none'; } });
    });
  });
});

document.querySelectorAll('a[href^="#"]').forEach(a=>{
  a.addEventListener('click', function(e){
    const id = this.getAttribute('href');
    if(id.length>1){
      e.preventDefault();
      document.querySelector(id)?.scrollIntoView({behavior:'smooth'});
    }
  });
});

const contactForm = document.getElementById('contact-form');
const contactSubmit = document.getElementById('contact-submit');
const formStatus = document.getElementById('form-status');

function setFormStatus(message, isError = false) {
  if (!formStatus) return;
  formStatus.textContent = message;
  formStatus.classList.remove('hidden');
  formStatus.classList.remove('text-red-400', 'text-green-400');
  formStatus.classList.add(isError ? 'text-red-400' : 'text-green-400');
}

function resetSubmitButton() {
  if (!contactSubmit) return;
  contactSubmit.disabled = false;
  contactSubmit.textContent = 'Send Message';
}

if (contactForm) {
  contactForm.addEventListener('submit', async (event) => {
    event.preventDefault();

    if (!contactSubmit) return;

    const formData = new FormData(contactForm);
    const name = String(formData.get('name') || '').trim();
    const email = String(formData.get('email') || '').trim();
    const subject = String(formData.get('subject') || '').trim();
    const message = String(formData.get('message') || '').trim();

    if (!name || !email || !subject || !message) {
      setFormStatus('Please fill in all fields.', true);
      return;
    }

    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailPattern.test(email)) {
      setFormStatus('Please enter a valid email address.', true);
      return;
    }

    if (!EMAILJS_SERVICE_ID || !EMAILJS_TEMPLATE_ID || !EMAILJS_PUBLIC_KEY || !window.emailjs) {
      console.error('EmailJS configuration is missing or the EmailJS script did not load.', {
        EMAILJS_SERVICE_ID,
        EMAILJS_TEMPLATE_ID,
        EMAILJS_PUBLIC_KEY
      });
      setFormStatus('Something went wrong. Please try again or contact me directly by email.', true);
      return;
    }

    
    contactSubmit.disabled = true;
    contactSubmit.textContent = 'Sending...';
    formStatus.classList.add('hidden');

    console.log("Sending Email", {
      service: EMAILJS_SERVICE_ID,
      template: EMAILJS_TEMPLATE_ID,
      payload: {
        from_name: name,
        from_email: email,
        subject,
        message
      }
    });

    try {
      await emailjs.send(
        EMAILJS_SERVICE_ID,
        EMAILJS_TEMPLATE_ID,
        {
          from_name: name,
          from_email: email,
          subject: subject,
          message: message,
          reply_to: email
        }
      );

      setFormStatus("Message sent successfully! I'll get back to you soon.");
      contactForm.reset();
      resetSubmitButton();
    } catch (error) {
      console.error("EmailJS Error:", error);
      console.error("Status:", error.status);
      console.error("Text:", error.text);
      console.error("Full Error:", JSON.stringify(error));
      setFormStatus('Something went wrong. Please try again or contact me directly by email.', true);
      resetSubmitButton();
    }
  });
}

