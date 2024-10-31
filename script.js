const typed = new Typed(".multi-text",{
    strings : ["Programmer", "Developer", "UI/UX Designer"],
    typeSpeed : 70,
    backSpeed : 70,
    backDelay : 1000,
    loop : true,
})

ScrollReveal({
    distance: '80px',
    duration: 2000,
    delay: 200,
});

function revealElements() {
    ScrollReveal().reveal('.home-content, .heading', { origin: 'top' });
    ScrollReveal().reveal('.home-img, img', { origin: 'right' });
    ScrollReveal().reveal('.home-content p, .about-content ', { origin: 'right' });
    ScrollReveal().reveal('.about-content, .heading', { origin: 'top' });
    ScrollReveal().reveal('.home-img, .education-container, .service-container, .project-box, .contact form', { origin: 'bottom' });
    ScrollReveal().reveal('.home-contact h1, .about-img', { origin: 'center' });
}

revealElements();

const icon = document.getElementById('menu-icon');
const navbar = document.querySelector('.navbar');

icon.onclick = () => {
    icon.classList.toggle('fa-bars');
    icon.classList.toggle('fa-xmark');
    navbar.classList.toggle('active');
};

const scriptURL = 'https://script.google.com/macros/s/AKfycbzjHRrf6J2M1fBVXKhBeJx6HER_ZBJTMYrQpjuwTOwuuTTI3goMddb5cWotkYguX3yo/exec'
  const form = document.forms['submit-to-google-sheet']
  const success = document.getElementById('success');
  form.addEventListener('submit', e => {
    e.preventDefault()
    fetch(scriptURL, { method: 'POST', body: new FormData(form)})
      .then(response => {
         success.innerHTML = "Data successfully submit ";
         setTimeout(function()
        {
            success.innerHTML = " ";
        }, 3000)
        form.reset();
      })
      .catch(error => console.error('Error!', error.message))
  });