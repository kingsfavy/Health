let isMenuOpen = false;

function ham() {
  const one = document.getElementById('one');
  const two = document.getElementById('two');
  const three = document.getElementById('three');
  const nav = document.getElementById('nav');

  if (!isMenuOpen) {
    // Open menu - hamburger to X
    one.style.transform = "rotate(45deg)";
    one.style.margin = "0";
    two.style.display = "none";
    three.style.transform = "rotate(-45deg)";
    three.style.margin = "0";
    nav.style.display = "block";
  } else {
    // Close menu - X to hamburger
    one.style.transform = "rotate(0)";
    one.style.margin = "6px 0";
    two.style.display = "block";
    two.style.margin = "6px 0";
    three.style.transform = "rotate(0)";
    three.style.margin = "6px 0";
    nav.style.display = "none";
  }

  one.style.transitionDuration = "0.4s";
  three.style.transitionDuration = "0.4s";

  isMenuOpen = !isMenuOpen;
}

// Close menu when a nav link is clicked
document.querySelectorAll('#nav a').forEach(link => {
  link.addEventListener('click', () => {
    // Only close if menu is open
    if (isMenuOpen) ham();
  });
});


function openModal() {
    document.getElementById("loginModal").style.display = "block";
    document.getElementById("mainContent").classList.add("blur");
  }
  
  function closeModal() {
    document.getElementById("loginModal").style.display = "none";
    document.getElementById("mainContent").classList.remove("blur");
  }
  
  window.onclick = function(event) {
    const modal = document.getElementById("loginModal");
    if (event.target === modal) {
      closeModal();
    }
  }
  
function read(){
document.getElementById("read").innerHTML - "Why Choose WellCare Pharmacy?
Experienced Team: Our pharmacists and staff are trained professionals with a passion for healthcare and years of practical experience.

Trusted Medications: We stock only certified, top-quality medications sourced from reputable manufacturers.

Health Education: We believe informed patients make better health choices, so we provide resources and consultations to empower our clients.

Timely Refills & Reminders: Never miss a dose — we offer prescription refill alerts and medication adherence support.

Customised Services: From paediatric to geriatric care, we tailor solutions to suit every stage of life.

Community Outreach: We regularly engage in health fairs, free screenings, and awareness campaigns to support our local community.";
