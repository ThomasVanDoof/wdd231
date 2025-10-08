document.getElementById("year").textContent = new Date().getFullYear();
document.getElementById("lastModified").textContent = document.lastModified;

async function loadDiscover() {
  const cards = document.getElementById('cards');
    try {
      const intro = document.querySelector('.intro');
      if (intro) {
        const msgEl = document.createElement('p');
        msgEl.id = 'visitMessage';
        intro.appendChild(msgEl);
        showVisitMessage(msgEl);
      }
    } catch (e) {
    }
  try {
      const res = await fetch('data/discover.json');
    if (!res.ok) throw new Error('Failed to load data');
    const items = await res.json();
    items.forEach((it, idx) => {
      const article = document.createElement('article');
      article.className = 'card';
      article.innerHTML = `
        <figure>
          <img src="images/${it.image}" alt="${it.title}">
        </figure>
        <h2>${it.title}</h2>
        <address>${it.address}</address>
        <p>${it.description}</p>
        <div class="actions"><button data-index="${idx}">Learn more</button></div>
      `;
      cards.appendChild(article);
    });
  } catch (err) {
    console.error(err);
    cards.innerHTML = `<p>Error: ${err.message}</p>`;
  }
}

window.addEventListener('DOMContentLoaded', loadDiscover);

function showVisitMessage(el) {
  const key = 'discover_lastVisit';
  const now = Date.now();
  const prev = localStorage.getItem(key);
  if (!prev) {
    el.textContent = 'Welcome! Let us know if you have any questions.';
    localStorage.setItem(key, new Date().toISOString());
    return;
  }
  const prevTime = Date.parse(prev);
  if (isNaN(prevTime)) {
    el.textContent = 'Welcome! Let us know if you have any questions.';
    localStorage.setItem(key, new Date().toISOString());
    return;
  }
  const diff = now - prevTime;
  const dayMs = 24 * 60 * 60 * 1000;
  if (diff < dayMs) {
    el.textContent = 'Back so soon! Awesome!';
  } else {
    const days = Math.floor(diff / dayMs);
    el.textContent = `You last visited ${days} ${days === 1 ? 'day' : 'days'} ago.`;
  }
  localStorage.setItem(key, new Date().toISOString());
}
