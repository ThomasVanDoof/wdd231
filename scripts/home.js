document.getElementById("year").textContent = new Date().getFullYear();

document.getElementById("last-modified").textContent = `Last Modified: ${document.lastModified}`;


const menuToggle = document.getElementById("menu-toggle");
const nav = document.querySelector("nav ul");

menuToggle.addEventListener("click", () => {
  nav.classList.toggle("open");
});


const currentPage = window.location.pathname.split("/").pop();
document.querySelectorAll("nav a").forEach(link => {
  if (link.getAttribute("href") === currentPage) {
    link.classList.add("active");
  }
});


const courses = [
  { code: "CSE 110", name: "Intro to Programming", credits: 2, taken: true, subject: "CSE" },
  { code: "CSE 111", name: "Programming with Functions", credits: 3, taken: true, subject: "CSE" },
  { code: "WDD 130", name: "Web Fundamentals", credits: 2, taken: true, subject: "WDD" },
  { code: "WDD 131", name: "Web Design & Development", credits: 2, taken: true, subject: "WDD" },
  { code: "WDD 231", name: "Frontend Development", credits: 3, taken: true, subject: "WDD" }
];

const filter = document.getElementById("filter");
const courseList = document.getElementById("course-list");
const totalCreditsEl = document.getElementById("total-credits");
const classesTakenEl = document.getElementById("classes-taken");


function renderCourses(subject = "ALL") {
  courseList.innerHTML = "";

  const filtered = courses.filter(c => subject === "ALL" || c.subject === subject);

  filtered.forEach(course => {
    const div = document.createElement("div");
    div.className = "course";
    div.innerHTML = `
      <h3>${course.code} - ${course.name}</h3>
      <p>Credits: ${course.credits}</p>
      <p>Status: ${course.taken ? "✅ Taken" : "❌ Not Taken"}</p>
    `;
    courseList.appendChild(div);
  });


  const { credits, taken } = filtered.reduce(
    (acc, course) => {
      if (course.taken) {
        acc.credits += course.credits;
        acc.taken++;
      }
      return acc;
    },
    { credits: 0, taken: 0 }
  );

  totalCreditsEl.textContent = credits;
  classesTakenEl.textContent = taken;
}

filter.addEventListener("change", e => renderCourses(e.target.value));
renderCourses();
