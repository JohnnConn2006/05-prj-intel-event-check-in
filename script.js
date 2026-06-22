// Beginner-friendly vanilla JavaScript for check-in app

// --- Constants and state ---
const GOAL = 100; // attendee goal for progress calculation
let totalAttendees = 0; // total checked-in attendees
let teamCounts = {
  "Water Wise": 0,
  "Net Zero": 0,
  Renewables: 0,
};

// --- Element selectors (IDs must match HTML) ---
const form = document.getElementById("checkInForm");
const nameInput = document.getElementById("nameInput");
const teamSelect = document.getElementById("teamSelect");

const totalCountEl = document.getElementById("totalCount");
const waterCountEl = document.getElementById("waterCount");
const netZeroCountEl = document.getElementById("netZeroCount");
const renewablesCountEl = document.getElementById("renewablesCount");

const progressBar = document.getElementById("progressBar");
const progressPercent = document.getElementById("progressPercent");
const greetingEl = document.getElementById("greeting");

// --- Event listeners ---
// Listen for the form submission and prevent page refresh
form.addEventListener("submit", function (event) {
  event.preventDefault(); // Prevent the page from refreshing
  checkIn(); // Run custom check-in logic
});

// --- Functions ---
// Main check-in handler
function checkIn() {
  // Get values from input and dropdown
  const name = nameInput.value.trim();
  const team = teamSelect.value;

  // Basic validation: do not allow empty names
  if (name === "") {
    alert("Please enter your name before checking in.");
    nameInput.focus();
    return; // Stop processing if validation fails
  }

  // Increment totals
  totalAttendees = totalAttendees + 1;
  teamCounts[team] = (teamCounts[team] || 0) + 1;

  // Update UI pieces
  updateGreeting(name, team);
  updateTeamCounts();
  updateProgressBar();

  // Reset the form after successful submission
  form.reset();
  nameInput.focus();
}

// Update the greeting / success message
function updateGreeting(name, team) {
  // Combine name and selected team into a personalized greeting
  greetingEl.textContent = `Thanks, ${name}! You're checked in with the ${team} team.`;
  greetingEl.style.display = 'block';
}

// Update displayed counts for each team and total
function updateTeamCounts() {
  // Show the updated total attendee count on the page
  totalCountEl.textContent = totalAttendees;

  // Update each team's count on the page
  waterCountEl.textContent = teamCounts["Water Wise"];
  netZeroCountEl.textContent = teamCounts["Net Zero"];
  renewablesCountEl.textContent = teamCounts["Renewables"];
}

// Update the progress bar width using percentage of goal completed
function updateProgressBar() {
  // Calculate percentage of goal completed
  const percent = Math.min(100, Math.round((totalAttendees / GOAL) * 100));

  // Update the width of the progress bar using the calculated percentage
  progressBar.style.width = percent + "%";
  progressPercent.textContent = percent + "%";
}

// Initialize UI (in case values are non-zero on load)
updateTeamCounts();
updateProgressBar();
