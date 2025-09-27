document.getElementById("year").textContent = new Date().getFullYear();
document.getElementById("lastModified").textContent = document.lastModified;

const tsField = document.getElementById("timestamp");
if (tsField) tsField.value = new Date().toISOString();

window.addEventListener("load", () => {
  document.querySelectorAll(".membership-card").forEach((card, i) => {
    setTimeout(() => card.classList.add("animate"), i * 150);
  });
});

document.querySelectorAll("[data-open-modal]").forEach(link => {
  link.addEventListener("click", e => {
    e.preventDefault();
    const id = link.getAttribute("data-open-modal");
    const modal = document.getElementById("modal-" + id);
    modal.setAttribute("aria-hidden", "false");
  });
});
document.querySelectorAll("[data-close]").forEach(btn => {
  btn.addEventListener("click", () => {
    btn.closest(".modal-backdrop").setAttribute("aria-hidden", "true");
  });
});

if (document.getElementById("summary")) {
  const params = new URLSearchParams(window.location.search);
  const map = {
    firstName: "out-firstName",
    lastName: "out-lastName",
    email: "out-email",
    mobile: "out-mobile",
    businessName: "out-businessName",
    timestamp: "out-timestamp"
  };
  for (const key in map) {
    const el = document.getElementById(map[key]);
    if (el) {
      let value = params.get(key) || "—";
      if (key === "timestamp" && value !== "—") {
        const d = new Date(value);
        value = d.toLocaleString();
      }
      el.textContent = value;
    }
  }
}
