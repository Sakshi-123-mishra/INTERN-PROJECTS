function loginUser() {
  const username = document.getElementById("username").value.trim();
  const password = document.getElementById("password").value.trim();

  if (username && password) {
    // In future, add actual validation
    window.location.href = "field.html";
  } else {
    alert("Please enter both username and password.");
  }
}

function registerUser() {
  const name = document.getElementById("name").value.trim();
  const username = document.getElementById("signup-username").value.trim();
  const password = document.getElementById("signup-password").value.trim();
  const confirmPassword = document.getElementById("confirm-password").value.trim();

  if (!name || !username || !password || !confirmPassword) {
    alert("Please fill in all fields.");
    return;
  }

  if (password !== confirmPassword) {
    alert("Passwords do not match.");
    return;
  }

  // In future, save user
  window.location.href = "field.html";
}


// Store the selected field
let selectedField = null;

function selectField(button) {
  // Remove "selected" class from all buttons
  let buttons = document.querySelectorAll('.field-btn');
  buttons.forEach(button => button.classList.remove('selected'));

  // Add "selected" class to the clicked button
  button.classList.add('selected');

  // Set the selected field
  selectedField = button.innerText;

  // Enable the "Save & Next" button
  document.getElementById('save-next-btn').classList.add('enabled');
}

function saveField() {
  if (selectedField) {
    // Proceed with saving the field
    alert('Field Selected: ' + selectedField);
    // You can proceed with the next step here, such as storing the field data.
  }
}



// Define subjects for each field
const fields = {
  "Mathematics": ["Mathematics", "Physics", "Chemistry", "English", "Physical Education"],
  "Biology": ["Biology", "Physics", "Chemistry", "English", "Physical Education"],
  "Commerce": ["Accountancy", "Business Studies", "Economics", "English", "Mathematics"],
  "Arts": ["History", "Geography", "English", "Political Science", "Economics"],
  "Home Science": ["Home Science", "Biology", "Physics", "Chemistry", "English"]
};

// Store selected field
let selectedField = "Mathematics";  // Default field (this should come from the previous page)

function loadSubjects() {
  const subjectContainer = document.getElementById('subject-marks');
  subjectContainer.innerHTML = ""; // Clear any existing content

  // Get subjects based on the selected field
  const subjects = fields[selectedField];

  subjects.forEach(subject => {
    const subjectDiv = document.createElement('div');
    subjectDiv.classList.add('subject-div');
    
    subjectDiv.innerHTML = `
      <label for="${subject}">${subject}</label>
      <input type="number" id="${subject}-marks" placeholder="Enter Marks" />
      <input type="number" id="${subject}-out-of" value="100" placeholder="Out of" />
    `;

    subjectContainer.appendChild(subjectDiv);
  });
}

function saveMarks() {
  let totalMarks = 0;
  let totalOutOf = 0;

  // Loop through all subjects and calculate total marks and total out-of marks
  const subjects = fields[selectedField];
  subjects.forEach(subject => {
    const marks = parseFloat(document.getElementById(`${subject}-marks`).value) || 0;
    const outOf = parseFloat(document.getElementById(`${subject}-out-of`).value) || 100;

    totalMarks += marks;
    totalOutOf += outOf;
  });

  // Calculate percentage
  const percentage = (totalMarks / totalOutOf) * 100;

  // Display total marks and percentage
  document.getElementById('total-marks').innerText = totalMarks;
  document.getElementById('total-out-of').innerText = totalOutOf;
  document.getElementById('percentage').innerText = percentage.toFixed(2);
}

// Call loadSubjects to populate the subjects based on the selected field when the page loads
loadSubjects();





function getSuggestion() {
  const field = localStorage.getItem("selectedField");
  const marks = JSON.parse(localStorage.getItem("marks"));
  let suggestion = "General Studies";

  if (field === "Mathematics" && marks.subject1 > 80) {
    suggestion = "Engineering";
  } else if (field === "Biology" && marks.subject2 > 80) {
    suggestion = "Medical Sciences";
  } else if (field === "Commerce" && marks.subject3 > 80) {
    suggestion = "Chartered Accountancy";
  } else if (field === "Arts") {
    suggestion = "Fine Arts";
  } else if (field === "Home Science") {
    suggestion = "Nutrition & Dietetics";
  }

  document.getElementById("suggestionText").textContent = suggestion;
  localStorage.setItem("suggestedCourse", suggestion);
}

function goToDescription() {
  window.location.href = "description.html";
}

if (window.location.pathname.includes("suggestion.html")) {
  getSuggestion();
}



function showCourseDescription() {
  const course = localStorage.getItem("suggestedCourse");
  const descriptions = {
    "Engineering": "Engineering is the application of science and math to solve problems.",
    "Medical Sciences": "This field deals with diagnosing and treating diseases.",
    "Chartered Accountancy": "CA is a professional course related to finance and audit.",
    "Fine Arts": "Fine arts includes painting, sculpture, and other creative forms.",
    "Nutrition & Dietetics": "Focuses on healthy eating and food science.",
    "General Studies": "A broad course to explore multiple career paths."
  };

  document.getElementById("courseDesc").textContent =
    descriptions[course] || "No description available.";
}

if (window.location.pathname.includes("description.html")) {
  showCourseDescription();
}
