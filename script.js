const form = document.getElementById("registrationForm");

const fields = ["name", "roll", "email", "course",
                "password", "document"];

function showError(field, message) {
    const input = document.getElementById(field);
    const error = document.getElementById(field + "Error");

    error.textContent = message;
    input.classList.toggle("invalid", message !== "");
    input.setAttribute("aria-invalid", message ? "true" : "false");
}

function validateForm() {
    let isValid = true;

    const name = document.getElementById("name").value.trim();
    const roll = document.getElementById("roll").value.trim();
    const email = document.getElementById("email").value.trim();
    const course = document.getElementById("course").value;
    const password = document.getElementById("password").value;
    const file = document.getElementById("document").files[0];

    // Validate student name
    if (name.length < 2) {
        showError("name", "Please enter a valid name.");
        isValid = false;
    } else {
        showError("name", "");
    }

    // Validate roll number
    if (!roll) {
        showError("roll", "Roll number is required.");
        isValid = false;
    } else {
        showError("roll", "");
    }

    // Validate email format
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!emailPattern.test(email)) {
        showError("email", "Please enter a valid email address.");
        isValid = false;
    } else {
        showError("email", "");
    }

    // Validate course selection
    if (!course) {
        showError("course", "Please select a course.");
        isValid = false;
    } else {
        showError("course", "");
    }

    // Validate password strength
    const strongPassword =
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[^A-Za-z0-9\s])\S{8,}$/;

    if (!strongPassword.test(password)) {
        showError(
            "password",
            "Use 8+ characters, uppercase, lowercase, a number, and a special character."
        );
        isValid = false;
    } else {
        showError("password", "");
    }

    // Validate file upload
    if (!file) {
        showError("document", "Please upload a document.");
        isValid = false;
    } else {
        const allowedTypes = [
            "application/pdf",
            "image/jpeg",
            "image/png"
        ];

        if (!allowedTypes.includes(file.type)) {
            showError("document", "Upload a PDF, JPG, or PNG file.");
            isValid = false;
        } else if (file.size > 2 * 1024 * 1024) {
            showError("document", "File size must not exceed 2 MB.");
            isValid = false;
        } else {
            showError("document", "");
        }
    }

    return isValid;
}

// Validate when the form is submitted
form.addEventListener("submit", function (event) {
    event.preventDefault();

    const successMessage =
        document.getElementById("successMessage");

    successMessage.textContent = "";

    if (validateForm()) {
        successMessage.textContent =
            "Registration form validated successfully!";

        form.reset();

        fields.forEach(function (field) {
            showError(field, "");
        });
    }
});

// Clear errors when users edit their inputs
fields.forEach(function (field) {
    const input = document.getElementById(field);

    input.addEventListener("input", function () {
        showError(field, "");
        document.getElementById("successMessage").textContent = "";
    });

    input.addEventListener("change", function () {
        showError(field, "");
        document.getElementById("successMessage").textContent = "";
    });
});