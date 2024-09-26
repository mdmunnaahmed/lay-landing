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

document.querySelectorAll(".form-control").forEach((input) => {
  input.addEventListener("blur", function () {
    const formGroup = this.closest(".form-group");
    if (!this.value.trim()) {
      formGroup.classList.add("required");
    } else {
      formGroup.classList.remove("required");
    }
  });
});

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

// Create an IntersectionObserver with a 100px offset from the bottom of the viewport
const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      const liElement = entry.target;

      if (entry.isIntersecting) {
        // Add the class only when the element enters the viewport
        liElement.classList.add("in-view");
      }
      // No action needed for out-of-view elements,
      // as we want to keep the class on previously added elements.
    });
  },
  {
    root: null, // The viewport is the root
    threshold: 0, // Trigger as soon as any part of the element enters the viewport
    rootMargin: "0px 0px -100px 0px", // 100px from the bottom of the viewport
  }
);

// Target all the <li> elements inside the scroll-tabs
document.querySelectorAll(".scroll-tabs ul li").forEach((li) => {
  observer.observe(li); // Start observing each <li> element
});

// Array of selectors for different item classes
const targetClasses = ["#shipping-info", "#payment-form", "#order"]; // Add your class selectors here

// Function to get the position from the top of the page for multiple items
function getDivPositions() {
  targetClasses.forEach((targetClass) => {
    const targetDivs = document.querySelectorAll(targetClass); // Select all divs of the current class

    targetDivs.forEach((targetDiv) => {
      const rect = targetDiv.getBoundingClientRect(); // Get the bounding rectangle of the div
      const rect2 = targetDiv.getBoundingClientRect(); // Get the bounding rectangle of the div
      const divPositionFromTop = rect.top + window.scrollY - 800; // Calculate the position from the top of the page
      const divPositionFromTop2 = rect2.top + window.scrollY + 1500; // Calculate the position from the top of the page

      if (divPositionFromTop2 < window.scrollY) {
        document.querySelector(".scroll-tabs-two.desktop-hidden").classList.add("hide");
      }else if((rect2.top + window.scrollY ) > window.scrollY){
        document.querySelector(".scroll-tabs-two.desktop-hidden").classList.remove("hide");
      }

      if (window.scrollY > divPositionFromTop) {
        const targetRef = document.querySelector(targetClass + "-ref"); // Vanilla JS selector for the target-ref class
        if (targetRef) {
          targetRef.classList.add("active");
        }
      } else {
        const targetRef = document.querySelector(targetClass + "-ref"); // Vanilla JS selector for the target-ref class
        if (targetRef) {
          targetRef.classList.remove("active");
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
