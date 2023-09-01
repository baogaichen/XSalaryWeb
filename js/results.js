// Fetch and parse the CSV data using PapaParse
async function fetchData() {
    const response = await fetch('Data/SalaryData.csv');
    const csvString = await response.text();

    // Using PapaParse to parse the CSV
    const result = Papa.parse(csvString, {
        header: true,
        dynamicTyping: true
    });

    return result.data;
}

// Function to display the results
function displayResults(industryData) {
    const industry = localStorage.getItem("industry");
    const userSalary = parseFloat(localStorage.getItem("expectedSalary"));

    const selectedIndustryData = industryData.find(data => data["Industry"] === industry);
    const averageSalary = parseFloat(selectedIndustryData["Average"].replace(",", "")); // Handling comma in CSV values

    // Fill in the HTML elements with appropriate data
    document.getElementById("industry-display").textContent = industry;
    document.getElementById("expected-salary-display").textContent = `${userSalary.toFixed(2)}`;
    document.getElementById("average-salary-display").textContent = `${averageSalary.toFixed(2)}`;
    document.getElementById("difference-display").textContent = `${Math.abs((userSalary - averageSalary)).toFixed(2)}`;

    let feedbackElement = document.getElementById("feedback");
    if (userSalary > averageSalary) {
        feedbackElement.textContent = "Your expected salary is above the industry average!";
        feedbackElement.style.color = "green";
    } else if (userSalary < averageSalary) {
        feedbackElement.textContent = "Your expected salary is below the industry average.";
        feedbackElement.style.color = "red";
    } else {
        feedbackElement.textContent = "Your expected salary matches the industry average!";
        feedbackElement.style.color = "blue";
    }
}

// Call functions on page load
window.onload = async function() {
    const industryData = await fetchData();
    displayResults(industryData);
};