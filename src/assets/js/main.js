"user strict";

// Preloader
$(window).on("load", function () {
  $(".preloader").fadeOut(1000);
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
      const divPositionFromTop = rect.top + window.scrollY; // Calculate the position from the top of the page

      if (window.scrollY > (divPositionFromTop - 100)) {
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
