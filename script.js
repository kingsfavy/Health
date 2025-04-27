

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

const showCalendarBtn = document.getElementById('showCalendarBtn');
const calendarContainer = document.getElementById('calendarContainer');
const bookingResult = document.getElementById('bookingResult');

// When the button is clicked
showCalendarBtn.addEventListener('click', function() {
    calendarContainer.innerHTML = ''; // Clear previous calendar if any

    const today = new Date();
    const year = today.getFullYear();
    const month = today.getMonth(); // January = 0

    const daysInMonth = new Date(year, month + 1, 0).getDate();

    // Month names
    const monthNames = [
        "January", "February", "March", "April", "May", "June",
        "July", "August", "September", "October", "November", "December"
    ];

    // Title
    const title = document.createElement('h2');
    title.textContent = `${monthNames[month]} ${year}`;
    calendarContainer.appendChild(title);

    // Days container
    const daysDiv = document.createElement('div');
    daysDiv.style.display = 'flex';
    daysDiv.style.flexWrap = 'wrap';
    daysDiv.style.maxWidth = '300px';

    for (let day = 1; day <= daysInMonth; day++) {
        const dayBtn = document.createElement('button');
        dayBtn.textContent = day;
        dayBtn.style.width = '40px';
        dayBtn.style.height = '40px';
        dayBtn.style.margin = '5px';
        dayBtn.style.cursor = 'pointer';
        dayBtn.style.backgroundColor = '#2E5F3C';

        dayBtn.style.color = '#ffffff';
        dayBtn.style.borderRadius = '50px';

        // When a date is clicked
        dayBtn.addEventListener('click', function() {
            const selectedDate = `${monthNames[month]} ${day}, ${year}`;

            // Animate: fade out and shrink
            bookingResult.style.opacity = '0';
            bookingResult.style.transform = 'scale(0.8)';

            setTimeout(() => {
                // Update booking result
                bookingResult.textContent = `Booking confirmed for: ${selectedDate}`;
                
                // Animate: fade in and bounce back
                bookingResult.style.opacity = '1';
                bookingResult.style.transform = 'scale(1.1)';

                // After short delay, return to normal size
                setTimeout(() => {
                    bookingResult.style.transform = 'scale(1)';
                }, 300);

            }, 300); // Wait before changing text and starting pop

            // Remove the calendar
            calendarContainer.innerHTML = '';
        });

        daysDiv.appendChild(dayBtn);
    }

    calendarContainer.appendChild(daysDiv);
});


// Adjust if window resizes
window.addEventListener('resize', () => {
    slideWidth = images[0].clientWidth;
});

function read(){
document.getElementById("read").style.display = "block";
  document.getElementById("btn").style.display = "none";
}

const year = new Date().getFullYear();
document.getElementById("year").innerHTML = year;

        function btn() {
const name = document.getElementById('name').value;
document.getElementById('showName').innerHTML = name;
document.getElementById('showNames').innerHTML = name;
document.getElementById('showName').style.display = "block";
document.getElementById('showNames').style.display = "block";
            alert("Welcome" + " " + name);
            document.getElementById("log").style.display = "none";
                        document.getElementById("logs").style.display = "none";
            
        }


// Users storage
const users = [];
const usersMap = new Map();

// Add user to both array and map
function addUser(id, name) {
  const user = { id, name };
  users.push(user);
  usersMap.set(id, user);
}

// Get user name by ID and display in .showName
function getUserNameById(id) {
  const user = usersMap.get(id);
  const showNameElement = document.querySelector('.showName');
  
  if (user) {
    showNameElement.textContent = user.name;
  } else {
    // If user doesn't exist, automatically register and display
    const newName = `User${id}`;  // Create a default name for the new user
    addUser(id, newName);
    showNameElement.textContent = `Welcome, ${newName}! (New User)`;
  }
}

// Handle form submission
document.getElementById('loginForm').addEventListener('submit', function(event) {
  event.preventDefault(); // Prevent form submission

  const userId = document.getElementById('userId').value;
  getUserNameById(Number(userId));
});

