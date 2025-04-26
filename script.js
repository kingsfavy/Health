
// Select the button and the container
const showCalendarBtn = document.getElementById('showCalendarBtn');
const calendarContainer = document.getElementById('calendarContainer');

// When the button is clicked
showCalendarBtn.addEventListener('click', function() {
    calendarContainer.innerHTML = ''; // Clear previous content

    const today = new Date();
    const year = today.getFullYear();
    const month = today.getMonth(); // 0-indexed (0 = January)

    // Get number of days in this month
    const daysInMonth = new Date(year, month + 1, 0).getDate();

    // Create a calendar title
    const monthNames = [
        "January", "February", "March", "April", "May", "June",
        "July", "August", "September", "October", "November", "December"
    ];
    const title = document.createElement('h2');
    title.textContent = `${monthNames[month]} ${year}`;
    calendarContainer.appendChild(title);

    // Create a div for the days
    const daysDiv = document.createElement('div');
    daysDiv.style.display = 'flex';
    daysDiv.style.flexWrap = 'wrap';
    daysDiv.style.maxWidth = '300px';

    // Create buttons for each day
    for (let day = 1; day <= daysInMonth; day++) {
        const dayBtn = document.createElement('button');
        dayBtn.textContent = day;
        dayBtn.style.width = '40px';
        dayBtn.style.height = '40px';
        dayBtn.style.margin = '5px';
        dayBtn.style.cursor = 'pointer';

        // Add click event to each day
        dayBtn.addEventListener('click', function() {
            alert(`You booked: ${monthNames[month]} ${day}, ${year}`);
        });

        daysDiv.appendChild(dayBtn);
    }

    calendarContainer.appendChild(daysDiv);
});



function read(){
document.getElementById("read").style.display = "block";
  document.getElementById("btn").style.display = "none";
}


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
    document.getElementById("mainContent").classList.add("blur");
  } else {
    // Close menu - X to hamburger
    one.style.transform = "rotate(0)";
    one.style.margin = "6px 0";
    two.style.display = "block";
    two.style.margin = "6px 0";
    three.style.transform = "rotate(0)";
    three.style.margin = "6px 0";
    nav.style.display = "none";
    document.getElementById("mainContent").classList.remove("blur");
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

const slides = document.querySelector('.slides');
const images = document.querySelectorAll('.slides img');

// Clone the first image and add it to the end
const firstClone = images[0].cloneNode(true);
slides.appendChild(firstClone);

let index = 0;
let slideWidth = images[0].clientWidth;

function moveToNextSlide() {
    index++;
    slides.style.transform = `translateX(-${index * 100}%)`;
    slides.style.transition = 'transform 0.5s ease-in-out';

    // When we reach the clone, reset back to real first slide
    if (index === images.length) {
        setTimeout(() => {
            slides.style.transition = 'none'; // Remove transition
            index = 0;
            slides.style.transform = `translateX(0)`;
        }, 500); // Wait for the slide animation to finish
    }
}

// Move every 3 seconds
setInterval(moveToNextSlide, 5000);

// Adjust if window resizes
window.addEventListener('resize', () => {
    slideWidth = images[0].clientWidth;
});
