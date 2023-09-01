document.addEventListener("DOMContentLoaded", function() {
    const submitButton = document.getElementById("submit-button");

    submitButton.addEventListener("click", function(event) {
        event.preventDefault();  // prevent form submission

        const industryDropdown = document.getElementById("industry-select");
        const selectedIndustry = industryDropdown.options[industryDropdown.selectedIndex].value;

        const expectedSalaryInput = document.getElementById("expected-salary");
        const expectedSalaryValue = parseFloat(expectedSalaryInput.value);

        if (isNaN(expectedSalaryValue) || expectedSalaryValue <= 0) {
            alert("Please enter a valid expected salary.");
            return;
        }

        // Store values in localStorage
        localStorage.setItem("industry", selectedIndustry);
        localStorage.setItem("expectedSalary", expectedSalaryValue.toString());

        // Redirect to results.html page
        window.location.href = "results.html";
    });
});
