
    function btn() {
      const nameInput = document.getElementById('name').value;

      if (nameInput) {
        // Save name to localStorage
        localStorage.setItem('fullName', nameInput);

        // Retrieve name from localStorage
        const storedName = localStorage.getItem('fullName');

        // Hide the 'log' and 'logs' paragraphs
        document.getElementById('log').style.display = 'none';
        document.getElementById('logs').style.display = 'none';

        // Display the name in 'showName' and 'showNames' paragraphs
        document.getElementById('showName').textContent = storedName;
        document.getElementById('showNames').textContent = storedName;
      }
    }

    // Optional: If you want to automatically check if there's a saved name on page load:
    window.onload = function() {
      const storedName = localStorage.getItem('fullName');
      if (storedName) {
        document.getElementById('log').style.display = 'none';
        document.getElementById('logs').style.display = 'none';
        document.getElementById('showName').textContent = storedName;
        document.getElementById('showNames').textContent = storedName;
      }
    };


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

function reveal() {
  var reveals = document.querySelectorAll(".reveal");

  for (var i = 0; i < reveals.length; i++) {
    var windowHeight = window.innerHeight;
    var elementTop = reveals[i].getBoundingClientRect().top;
    var elementVisible = 150;

    if (elementTop < windowHeight - elementVisible) {
      reveals[i].classList.add("active");
    } else {
      reveals[i].classList.remove("active");
    }
  }
}

window.addEventListener("scroll", reveal);


// Smooth scrolling

document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();

        document.querySelector(this.getAttribute('href')).scrollIntoView({
            behavior: 'smooth'
        });
    });
});



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
                bookingResult.textContent = `You booked an appointment for Healthrite pharmacy on  ${selectedDate}`;
                
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




function read(){
document.getElementById("read").style.display = "block";
  document.getElementById("btn").style.display = "none";
}

const year = new Date().getFullYear();
document.getElementById("year").innerHTML = year;
const years = new Date().getFullYear();
document.getElementById("years").innerHTML = years;

function supermarket(){
    document.getElementById("supermarket").style.display="block";
     document.getElementById("pharmacy").style.display="none";
}

function pharmacy(){
     document.getElementById("supermarket").style.display="none";
     document.getElementById("pharmacy").style.display="block";
}


document.getElementById("greeting").innerText = getGreeting();

  function getGreeting() {
    const now = new Date();
    const hour = now.getHours();

    if (hour < 12) {
      return "Good morning!";
    } else if (hour < 18) {
      return "Good afternoon!";
    } else {
      return "Good evening! ";
    }
  }

  // Change image automatically every 3 seconds
      /*function btn() {
const name = document.getElementById('name').value;
document.getElementById('showName').innerHTML = name;
document.getElementById('showNames').innerHTML = name;
document.getElementById('showName').style.display = "block";
document.getElementById('showNames').style.display = "block";
            alert("Welcome" + " " + name);
            document.getElementById("log").style.display = "none";
                        document.getElementById("logs").style.display = "none";
            
        }
  function btn() {
      const nameInput = document.getElementById('name').value;

      if (nameInput) {
        // Save name to localStorage
        localStorage.setItem('fullName', nameInput);

        // Retrieve name from localStorage
        const storedName = localStorage.getItem('fullName');

        // Hide the 'log' and 'logs' paragraphs
        document.getElementById('log').style.display = 'none';
        document.getElementById('logs').style.display = 'none';

        // Display the name in 'showName' and 'showNames' paragraphs
        document.getElementById('showName').textContent = storedName;
        document.getElementById('showNames').textContent = storedName;
      }
    }


    window.onload = function() {
      const storedName = localStorage.getItem('fullName');
      if (storedName) {
        document.getElementById('log').style.display = 'none';
        document.getElementById('logs').style.display = 'none';
        document.getElementById('showName').textContent = storedName;
        document.getElementById('showNames').textContent = storedName;
      }
    }*/
