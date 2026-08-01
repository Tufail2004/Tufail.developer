
// EmailJS credentials
const EMAILJS_SERVICE_ID = "service_6gty4mh";
const EMAILJS_TEMPLATE_ID = "template_w2zxhso";
const EMAILJS_PUBLIC_KEY = "OxTieu6YeN5bnNu06";

// Initialize EmailJS once at startup, after the CDN loads.
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



const dot = document.getElementById('cursor-dot');
const ring = document.getElementById('cursor-ring');

let mx=0,my=0,rx=0,ry=0;
window.addEventListener('mousemove', e=>{
  mx=e.clientX; my=e.clientY;
  dot.style.left=mx+'px'; dot.style.top=my+'px';
});
function ringLoop(){
  rx += (mx-rx)*0.18; ry += (my-ry)*0.18;
  ring.style.left=rx+'px'; ring.style.top=ry+'px';
  requestAnimationFrame(ringLoop);
}
ringLoop();
document.querySelectorAll('a, button, .panel, input, textarea').forEach(el=>{
  el.addEventListener('mouseenter', ()=> ring.classList.add('active'));
  el.addEventListener('mouseleave', ()=> ring.classList.remove('active'));
});


const navbar = document.getElementById('navbar');
const progress = document.getElementById('scroll-progress');
const backTop = document.getElementById('back-to-top');
window.addEventListener('scroll', () => {
  const scrolled = window.scrollY;
  if (scrolled > 30) {
    navbar.classList.add('glass');
  } else {
    navbar.classList.remove('glass');
  }
  const h = document.documentElement;
  const pct = (h.scrollTop) / (h.scrollHeight - h.clientHeight) * 100;
  progress.style.width = pct + '%';
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


document.querySelectorAll('.magnetic').forEach(btn=>{
  btn.addEventListener('mousemove', (e)=>{
    const r = btn.getBoundingClientRect();
    const x = e.clientX - r.left - r.width/2;
    const y = e.clientY - r.top - r.height/2;
    gsap.to(btn, { x: x*0.25, y: y*0.35, duration: 0.4, ease: 'power2.out' });
  });
  btn.addEventListener('mouseleave', ()=> gsap.to(btn, { x:0, y:0, duration: 0.5, ease: 'elastic.out(1,0.4)' }));
});

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

    // Prevent duplicate submissions while the request is processing.
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
      // Match the EmailJS template variables exactly:
      // {{from_name}}, {{from_email}}, {{subject}}, {{message}}
      // Send the payload without any extra options because init() already configured the public key.
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

