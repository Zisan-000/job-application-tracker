// no jobs logic
let total = parseInt(document.getElementById("total").innerText);
let count = parseInt(document.getElementById("remove").innerText);
const noJobs = document.getElementById("noJobs");

// delete job logic
const removeButtons = document.querySelectorAll("#remove");

removeButtons.forEach((btn) => {
  btn.addEventListener("click", function () {
    const jobCard = btn.parentElement.parentElement;
    if (jobCard) {
      jobCard.remove();

      // update total
      total = Math.max(0, total - 1);
      document.getElementById("total").innerText = total;

      count = Math.max(0, count - 1);
      document.getElementById("remove").innerText = count;

      // show "No jobs"
      if (total === 0) {
        noJobs.classList.remove("hidden");
      }
    }
  });
});

// select all job cards
function updateJobStatus(jobId, status) {
  const card = document.getElementById(jobId);
  console.log(card);
  const notAppliedBtn = document.getElementById(`not-applied-${jobId}`);
  const interviewStatusBtn = document.getElementById(
    `status-interview-${jobId}`,
  );
  const rejectedStatusBtn = document.getElementById(`status-rejected-${jobId}`);

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
}
