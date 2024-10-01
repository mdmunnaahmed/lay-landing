"user strict";

// Preloader
window.addEventListener("load", function () {
  const loadingPage = document.querySelector(".main-loading-page-wrapper");
  const stepOne = document.querySelector(".step-one");
  const stepTwo = document.querySelector(".step-two");

  const totalDuration = 7000; // Total duration for both steps and loading page (8 seconds)
  const halfDuration = totalDuration / 2; // First half (4 seconds)

  // Step 1: Show loading page for 8 seconds
  setTimeout(function () {
    loadingPage.style.transition = "opacity 1s"; // Add transition for smooth fade out
    loadingPage.style.opacity = 0; // Fade out loading page

    // After 1s fade-out, hide the loading page
    setTimeout(function () {
      loadingPage.style.display = "none";
    }, 1000);
  }, totalDuration); // Keep the loading screen for 8 seconds before fading out

  // Step 2: Show the first ul (step-one) immediately after loading page starts
  stepOne.style.display = "flex";

  // Step 3: Hide step-one and show step-two after the first half of the total duration (4s)
  setTimeout(function () {
    stepOne.style.display = "none"; // Hide the first ul (step-one)
    stepTwo.style.display = "flex"; // Show the second ul (step-two)
    document.querySelector(".step-title").textContent = "STEP 2";
    document.querySelector(".step-check").textContent = "Checking Deals";
  }, halfDuration); // Trigger after 4 seconds (halfDuration)
});

document.addEventListener("DOMContentLoaded", function () {
  const progressBar = document.querySelector(".progess-bar");
  const span = progressBar.querySelector("span");

  let progress = 0; // Initial progress
  const duration = 6000; // Duration in milliseconds
  const interval = 100; // Update interval in milliseconds
  const increment = (interval / duration) * 100; // Percentage increment per interval

  const updateProgress = setInterval(() => {
    progress += increment; // Increase progress
    if (progress > 100) progress = 100; // Cap at 100%

    progressBar.style.width = `${progress}%`; // Update width
    span.textContent = `${Math.round(progress)}%`; // Update text

    // Stop updating when it reaches 100%
    if (progress >= 100) {
      clearInterval(updateProgress);
    }
  }, interval);
});

// info modal
// Select the elements
const questionModalToggle = document.querySelector(".question-modal-toggle");
const questionMarkModal = document.querySelector(".question-mark-modal");
const closeModal = document.querySelector(".close-modal");

// Function to toggle the modal
function toggleModal() {
  questionMarkModal.classList.toggle("active"); // Toggle the 'active' class
}

// Event listeners
questionModalToggle.addEventListener("click", (e) => {
  e.preventDefault(); // Prevent default anchor behavior
  toggleModal();
});

closeModal.addEventListener("click", () => {
  toggleModal(); // Close the modal when clicking the close button
});

document.querySelectorAll(".form-control[required]").forEach((input) => {
  input.addEventListener("blur", function () {
    const formGroup = this.closest(".form-group");
    if (!this.value.trim()) {
      formGroup.classList.add("required");
    } else {
      formGroup.classList.remove("required");
    }
  });
});

document.querySelectorAll("#aptSuite").forEach((input) => {
  input.addEventListener("blur", function () {
    const formGroup = this.closest(".form-group");
    if (this.value.trim().length) {
      formGroup.classList.add("has-value");
    } else {
      formGroup.classList.remove("has-value");
    }
  });
});

document.addEventListener("DOMContentLoaded", function () {
  const creditCardInput = document.getElementById("creditCard");
  const formGroup = creditCardInput.closest(".form-group");
  const errorDiv = formGroup.querySelector(".card-error");
  const requiredDiv = formGroup.querySelector(".error");

  // Allow only numeric input and format with spaces
  creditCardInput.addEventListener("input", function () {
    // Replace any non-numeric characters and format with spaces
    let value = this.value.replace(/\D/g, ""); // Keep only digits
    if (value.length > 16) {
      value = value.slice(0, 16); // Truncate to the first 16 digits
    }

    // Add spaces after every 4 digits
    this.value = value.replace(/(.{4})/g, "$1 ").trim(); // Add space and trim the end

    // Reset error messages as user types
    errorDiv.style.display = "none";
    requiredDiv.style.display = "none";
    formGroup.classList.remove("error");
    formGroup.classList.remove("card-error");
  });

  // Validate on blur
  creditCardInput.addEventListener("blur", function () {
    const value = this.value.replace(/\s/g, ""); // Remove spaces for validation

    // Check if the input is empty
    if (!value) {
      requiredDiv.style.display = "block"; // Show required error message
      formGroup.classList.add("error");
    }
    // Check for a valid credit card number (basic check)
    else if (!/^\d{13,16}$/.test(value)) {
      errorDiv.style.display = "block"; // Show credit card error message
      formGroup.classList.add("card");
    } else {
      formGroup.classList.remove("error");
      formGroup.classList.remove("card");
      errorDiv.style.display = "none"; // Hide credit card error message
      requiredDiv.style.display = "none"; // Hide required message
    }
  });
});

document.querySelectorAll("#zip").forEach((input) => {
  // Allow only numeric input and limit to 4 digits
  input.addEventListener("input", function () {
    // Replace any non-numeric characters
    this.value = this.value.replace(/\D/g, ""); // Keep only digits

    // Limit the length to 4 digits
    if (this.value.length > 6) {
      this.value = this.value.slice(0, 6); // Truncate to the first 4 digits
    }
  });

  // Validate on blur
  input.addEventListener("blur", function () {
    const formGroup = this.closest(".form-group");
    const errorDiv = formGroup.querySelector(".zip-error");

    // Check if the input is empty
    if (!this.value.trim()) {
      formGroup.classList.add("required");
      errorDiv.style.display = "none"; // Hide zip error
    }
    // Check if the input is less than 3 digits
    else if (this.value.trim().length < 6) {
      formGroup.classList.add("zip");
      errorDiv.style.display = "block"; // Show zip error
    } else {
      formGroup.classList.remove("required");
      formGroup.classList.remove("zip");
      errorDiv.style.display = "none"; // Hide zip error
    }
  });
});

document.querySelectorAll("#cvv").forEach((input) => {
  // Allow only numeric input and limit to 4 digits
  input.addEventListener("input", function () {
    // Replace any non-numeric characters
    this.value = this.value.replace(/\D/g, ""); // Keep only digits

    // Limit the length to 4 digits
    if (this.value.length > 4) {
      this.value = this.value.slice(0, 4); // Truncate to the first 4 digits
    }
  });

  // Validate on blur
  input.addEventListener("blur", function () {
    const formGroup = this.closest(".form-group");
    const errorDiv = formGroup.querySelector(".cvv-error");

    // Check if the input is empty
    if (!this.value.trim()) {
      formGroup.classList.add("required");
      errorDiv.style.display = "none"; // Hide CVV error
    }
    // Check if the input is less than 3 digits
    else if (this.value.trim().length < 3) {
      formGroup.classList.add("cvv");
      errorDiv.style.display = "block"; // Show CVV error
    } else {
      formGroup.classList.remove("required");
      formGroup.classList.remove("cvv");
      errorDiv.style.display = "none"; // Hide CVV error
    }
  });
});

// Get the current month (0-based, so January is 0, February is 1, etc.)
var currentMonth = new Date().getMonth();

// Select the dropdown element
var selectElement = document.getElementById("monthSelect");

// Set the current month as the selected option
selectElement.selectedIndex = currentMonth;

// Select all product cards
const productCards = document.querySelectorAll(".product-card");

productCards.forEach((card) => {
  card.addEventListener("click", function () {
    // 1. Remove 'active' class from all product cards
    productCards.forEach((c) => c.classList.remove("active"));

    // 2. Add 'active' class to the clicked product card
    this.classList.add("active");

    // 3. Get product details from the clicked card
    const packageName = this.querySelector(".package-name").textContent.trim();
    const packageDiscount = this.querySelector(".package-discount").textContent.trim();
    const discount = this.querySelector(".discount").textContent.trim();
    const price = this.querySelector(".price").textContent.trim();
    const img = this.querySelector(".package-img").getAttribute("src");

    // 4. Get package details list
    const packageDetails = [...this.querySelectorAll(".package-details li")].map((li) => li.textContent.trim());

    // Parse the number from the first element (if present)
    const firstDetail = packageDetails[0];
    const parsedNumber = firstDetail.match(/\d+/);

    if (parsedNumber) {
      const number = parsedNumber[0];
      document.querySelectorAll(".percent-off").forEach((el) => {
        el.textContent = number;
      });
    }

    // Update the relevant fields in all instances on the page
    document.querySelectorAll(".product-print-title").forEach((el) => {
      el.innerHTML = `${packageName} <br /> ${packageDiscount}`;
    });

    document.querySelectorAll(".product-print-qty").forEach((el) => {
      const qty = packageName.match(/(\d+)X/i)[1];
      el.textContent = `QTY: ${qty}`;
    });

    document.querySelectorAll(".product-print-price").forEach((el) => {
      el.textContent = price;
    });

    // Function to parse the dollar amount (removes $ sign and converts to number)
    function parsePrice(value) {
      return parseFloat(value.replace(/[^\d.-]/g, "")); // Remove $ and convert to number
    }
    const discountPrice = parsePrice(discount) - parsePrice(price);

    document.querySelectorAll(".product-print-original-price").forEach((el) => {
      el.textContent = discount;
    });

    document.querySelectorAll(".product-print-discount-price").forEach((el) => {
      el.textContent = "$" + discountPrice.toFixed(2);
    });

    document.querySelectorAll(".product-print-total-price").forEach((el) => {
      el.textContent = price;
    });

    document.querySelectorAll(".product-print-img").forEach((imgEl) => {
      imgEl.setAttribute("src", img);
    });
  });
});

// Array of selectors for different item classes
const targetClasses = ["#shipping-info", "#payment-form", "#order"];

// Function to get the position from the top of the page for multiple items
function getDivPositions() {
  targetClasses.forEach((targetClass) => {
    const targetDivs = document.querySelectorAll(targetClass); // Select all divs of the current class

    targetDivs.forEach((targetDiv) => {
      const rect = targetDiv.getBoundingClientRect(); // Get the bounding rectangle of the div
      const rect2 = targetDiv.getBoundingClientRect(); // Get the bounding rectangle of the div
      const divPositionFromTop = rect.top + window.scrollY - 750; // Calculate the position from the top of the page
      const divPositionFromTop2 = rect2.top + window.scrollY + 1850; // Calculate the position from the top of the page

      if (divPositionFromTop2 < window.scrollY) {
        document.querySelector(".scroll-tabs-two.desktop-hidden").classList.add("hide");
      } else if (rect2.top + window.scrollY > window.scrollY) {
        document.querySelector(".scroll-tabs-two.desktop-hidden").classList.remove("hide");
      }

      if (window.scrollY > divPositionFromTop) {
        const targetRef = document.querySelector(targetClass + "-ref");
        const targetRef2 = document.querySelector(targetClass + "-one");
        if (targetRef) {
          targetRef.classList.add("active");
          targetRef2.classList.add("active");
        }
      } else {
        const targetRef = document.querySelector(targetClass + "-ref");
        const targetRef2 = document.querySelector(targetClass + "-one");
        if (targetRef) {
          targetRef.classList.remove("active");
          targetRef2.classList.remove("active");
        }
      }
    });
  });
}

// Call the function to get the positions initially
getDivPositions();

// Add scroll event listener to check positions dynamically
window.addEventListener("scroll", getDivPositions);

document.addEventListener("DOMContentLoaded", function () {
  var faqTitles = document.querySelectorAll(".faq-title");

  faqTitles.forEach(function (title) {
    title.addEventListener("click", function () {
      var item = this.parentNode;
      var content = item.querySelector(".faq-content");

      if (item.classList.contains("active")) {
        // Close the item
        content.style.height = "0";
        item.classList.remove("active");
      } else {
        // Close other open items
        document.querySelectorAll(".faq-item.active").forEach(function (activeItem) {
          var activeContent = activeItem.querySelector(".faq-content");
          activeContent.style.height = "0";
          activeItem.classList.remove("active");
        });

        // Open this item
        content.style.height = content.scrollHeight + "px";
        item.classList.add("active");
      }
    });
  });
});

document.addEventListener("DOMContentLoaded", function () {
  // Show the first modal after 15 seconds
  setTimeout(function () {
    document.getElementById("modal1").style.display = "flex";
  }, 12000);

  // Close the first modal and then show the second modal
  window.closeModal2 = function (modalId) {
    document.getElementById(modalId).style.display = "none";

    if (modalId === "modal1") {
      // Show the second modal after closing the first modal
      setTimeout(function () {
        document.getElementById("modal2").style.display = "flex";
      }, 8000); // Show modal2 after 1 second
    }
  };
});

// Set countdown duration (5 minutes in seconds)
let countdownDuration = 5 * 60 + 12; // 5 minutes in seconds

// Update the timer every second
const countdownInterval = setInterval(() => {
  // Calculate minutes and seconds
  const minutes = Math.floor(countdownDuration / 60);
  const seconds = countdownDuration % 60;

  // Format minutes and seconds with leading zeros
  const formattedMinutes = String(minutes).padStart(2, "0");
  const formattedSeconds = String(seconds).padStart(2, "0");

  // Update the time display
  document.getElementById("time").textContent = `${formattedMinutes} : ${formattedSeconds}`;

  // Decrease the countdown duration
  countdownDuration--;

  // Stop the countdown when it reaches zero
  if (countdownDuration < 0) {
    clearInterval(countdownInterval);
    document.getElementById("time").textContent = "00 : 00"; // Final display
  }
}, 1000); // Update every second

// Scroll tab JS
const targetClasses2 = ["#shipping-info", "#payment-form", "#order"];
const targetSelectors = ["#shipping-info-one", "#payment-form-one", "#order-one"];

// Function to get the distance from .scroll-tabs to each targetClass
function getDivPositions2() {
  // Get the position of .scroll-tabs from the top of the page
  const scrollTabs = document.querySelector(".scroll-tabs");

  if (scrollTabs) {
    const scrollTabsRect = scrollTabs.getBoundingClientRect();
    const scrollTabsPositionFromTop = scrollTabsRect.top + window.scrollY;

    // Loop through each target class and its corresponding target selector
    targetClasses2.forEach((targetClass, index) => {
      const targetDiv = document.querySelector(targetClass); // Select the current target div
      const correspondingSelector = targetSelectors[index]; // Get the corresponding selector for each class

      if (targetDiv && correspondingSelector) {
        // Get the position of the target div from the top of the page
        const targetRect = targetDiv.getBoundingClientRect();
        const targetPositionFromTop = targetRect.top + window.scrollY;

        // Calculate the distance from .scroll-tabs to the target div
        const distanceFromScrollTabs = Math.abs(targetPositionFromTop - scrollTabsPositionFromTop);

        // Apply the distance as the top style to the corresponding div (e.g., .shipping-info-one)
        const correspondingDiv = document.querySelector(correspondingSelector);
        if (correspondingDiv) {
          correspondingDiv.style.top = distanceFromScrollTabs - 20 + "px";
        }

        // Add or remove "active" class based on scroll position
        if (window.scrollY > targetPositionFromTop) {
          targetDiv.classList.add("active");
          // document.querySelector('.line-two').style.height = window.scrollY - 20 + "px";
        } else {
          targetDiv.classList.remove("active");
        }
      }
    });
  }
}

// Call the function to get the positions
getDivPositions2();

// Optionally, update the positions when the user scrolls
window.addEventListener("scroll", getDivPositions2);

document.getElementById("country-select").addEventListener("change", function () {
  const country = this.value;
  const usaStates = document.getElementById("usa-states");
  const canadaStates = document.getElementById("canada-states");
  const blank = document.getElementById("blank-select");

  if (country === "USA") {
    usaStates.style.display = "block";
    canadaStates.style.display = "none";
    blank.style.display = "none";
    usaStates.required = true;
    canadaStates.required = false;
  } else if (country === "Canada") {
    usaStates.style.display = "none";
    blank.style.display = "none";
    canadaStates.style.display = "block";
    usaStates.required = false;
    canadaStates.required = true;
  } else {
    blank.style.display = "block";
    usaStates.style.display = "none";
    canadaStates.style.display = "none";
    usaStates.required = false;
    canadaStates.required = false;
  }
});

document.getElementById("email").addEventListener("blur", function () {
  const emailInput = this.value;
  const errorMessage = document.getElementById("email-error");

  // Regular expression for basic email validation
  const emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

  if (emailInput === "") {
    errorMessage.textContent = "This field is required.";
    errorMessage.style.display = "block";
    this.closest(".form-group").classList.add("required");
  } else if (!emailPattern.test(emailInput)) {
    errorMessage.textContent = "Please enter a valid email address.";
    errorMessage.style.display = "block";
    this.closest(".form-group").classList.add("required");
  } else {
    errorMessage.style.display = "none";
    this.closest(".form-group").classList.remove("required");
  }
});
