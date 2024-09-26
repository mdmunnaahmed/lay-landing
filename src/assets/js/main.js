"user strict";

// Preloader
$(window).on("load", function () {
  $(".preloader").fadeOut(1000);
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
      el.textContent = discountPrice.toFixed(2);
    });

    document.querySelectorAll(".product-print-total-price").forEach((el) => {
      el.textContent = price;
    });

    document.querySelectorAll(".product-print-img").forEach((imgEl) => {
      imgEl.setAttribute("src", img);
    });
  });
});
