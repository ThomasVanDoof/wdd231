document.getElementById("year").textContent = new Date().getFullYear();
document.getElementById("lastModified").textContent = document.lastModified;

const directorySection = document.getElementById("directory");
let members = [];

async function fetchMembers() {
  try {
    const response = await fetch("data/members.json");
    if (!response.ok) throw new Error("Failed to fetch members");
    members = await response.json();
    renderMembers("grid");
  } catch (err) {
    directorySection.innerHTML = `<p>Error loading members: ${err.message}</p>`;
  }
}

function renderMembers(view = "grid") {
  directorySection.innerHTML = "";
  directorySection.className = `directory ${view}`;
  members.forEach(member => {
    const div = document.createElement("div");
    div.className = view === "grid" ? "card" : "list-item";
    div.innerHTML = `
      <img src="images/${member.image}" alt="${member.name} logo" style="max-width:80px;max-height:80px;">
      <h3>${member.name}</h3>
      <p>${member.address}</p>
      <p>${member.phone}</p>
      <p><a href="${member.website}" target="_blank">Website</a></p>
      <p>Membership: ${membershipLevel(member.membership)}</p>
      <p>${member.description || ""}</p>
    `;
    directorySection.appendChild(div);
  });
}

function membershipLevel(level) {
  switch(level) {
    case 3: return "Gold";
    case 2: return "Silver";
    case 1: return "Member";
    default: return "Member";
  }
}

window.setView = function(view) {
  renderMembers(view);
};

fetchMembers();