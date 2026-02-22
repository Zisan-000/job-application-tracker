// no jobs logic
let totalElement = document.getElementById("total");
let total = parseInt(totalElement.innerText) || 0;

let countElement = document.getElementById("removed-count");
let count = countElement ? parseInt(countElement.innerText) : 0;

const noJobs = document.getElementById("noJobs");
const removeButtons = document.querySelectorAll(".remove-btn");

removeButtons.forEach((btn) => {
  btn.addEventListener("click", function () {
    const jobCard = this.parentNode.parentNode;

    if (jobCard) {
      const interviewBtn = jobCard.querySelector('[id^="status-interview"]');
      const rejectedBtn = jobCard.querySelector('[id^="status-rejected"]');

      if (interviewBtn && !interviewBtn.classList.contains("hidden")) {
        interviewCount = Math.max(0, interviewCount - 1);
        interviewCountElement.innerText = interviewCount;
      } else if (rejectedBtn && !rejectedBtn.classList.contains("hidden")) {
        rejectedCount = Math.max(0, rejectedCount - 1);
        rejectedCountElement.innerText = rejectedCount;
      }
      // ------------------------------------------------------------------

      // remove the card
      jobCard.remove();

      // Update total jobs
      total = Math.max(0, total - 1);
      if (totalElement) totalElement.innerText = total;

      // Update removed count
      count += 1;
      if (countElement) countElement.innerText = count;

      // Show "No jobs" state
      if (total === 0 && noJobs) {
        noJobs.classList.remove("hidden");
      }
    }
  });
});

// interview & rejected logic
const interviewCountElement = document.getElementById("interview");
const rejectedCountElement = document.getElementById("rejected");

let interviewCount = parseInt(interviewCountElement.innerText) || 0;
let rejectedCount = parseInt(rejectedCountElement.innerText) || 0;

function updateJobStatus(jobId, status) {
  const card = document.getElementById(jobId);
  const notAppliedBtn = document.getElementById(`not-applied-${jobId}`);
  const interviewStatusBtn = document.getElementById(
    `status-interview-${jobId}`,
  );
  const rejectedStatusBtn = document.getElementById(`status-rejected-${jobId}`);

  let currentState = "not-applied";
  if (!interviewStatusBtn.classList.contains("hidden")) {
    currentState = "interview";
  } else if (!rejectedStatusBtn.classList.contains("hidden")) {
    currentState = "rejected";
  }

  if (currentState === status) {
    return;
  }

  // Remove 1 from the OLD status count
  if (currentState === "interview") {
    interviewCount = Math.max(0, interviewCount - 1);
    interviewCountElement.innerText = interviewCount;
  } else if (currentState === "rejected") {
    rejectedCount = Math.max(0, rejectedCount - 1);
    rejectedCountElement.innerText = rejectedCount;
  }

  // Add 1 to the NEW status count
  if (status === "interview") {
    interviewCount += 1;
    interviewCountElement.innerText = interviewCount;
  } else if (status === "rejected") {
    rejectedCount += 1;
    rejectedCountElement.innerText = rejectedCount;
  }

  //
  notAppliedBtn.classList.add("hidden");
  interviewStatusBtn.classList.add("hidden");
  rejectedStatusBtn.classList.add("hidden");

  card.classList.remove("!border-l-green-400", "!border-l-red-400");

  if (status === "interview") {
    interviewStatusBtn.classList.remove("hidden");
    card.classList.add("border-l-4", "!border-l-green-400");
  } else if (status === "rejected") {
    rejectedStatusBtn.classList.remove("hidden");
    card.classList.add("border-l-4", "!border-l-red-400");
  }
  if (typeof applyFilter === "function") {
    applyFilter();
  }
}

// filter jobs logic

let currentFilter = "all";

document.addEventListener("DOMContentLoaded", function () {
  const filterButtons = document.querySelectorAll(".filter-btn");

  filterButtons.forEach((btn) => {
    btn.addEventListener("click", function () {
      // 1. Remove the 'active' class from all buttons
      filterButtons.forEach((b) => b.classList.remove("active"));

      // 2. Add the 'active' class only to the clicked button
      this.classList.add("active");

      // 3. Update the filter state and apply it
      currentFilter = this.getAttribute("data-filter");
      applyFilter();
    });
  });
});

// Hiding and Showing Cards
function applyFilter() {
  const allJobs = document.querySelectorAll('[id^="job"]');
  const noJobs = document.getElementById("noJobs");

  let visibleCount = 0;

  allJobs.forEach((card) => {
    const interviewBtn = card.querySelector('[id^="status-interview"]');
    const rejectedBtn = card.querySelector('[id^="status-rejected"]');

    let cardStatus = "not-applied";
    if (interviewBtn && !interviewBtn.classList.contains("hidden")) {
      cardStatus = "interview";
    } else if (rejectedBtn && !rejectedBtn.classList.contains("hidden")) {
      cardStatus = "rejected";
    }

    let shouldShow = false;
    if (currentFilter === "all") {
      shouldShow = true;
    } else if (currentFilter === "interview" && cardStatus === "interview") {
      shouldShow = true;
    } else if (currentFilter === "rejected" && cardStatus === "rejected") {
      shouldShow = true;
    }

    if (shouldShow) {
      card.classList.remove("hidden");
      visibleCount++; // Count it
    } else {
      card.classList.add("hidden");
    }
  });

  if (noJobs) {
    if (visibleCount === 0) {
      noJobs.classList.remove("hidden");
    } else {
      noJobs.classList.add("hidden");
    }
  }
}
