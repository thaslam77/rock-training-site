const NAV = [
  { href: "training.html", label: "Training" },
  { href: "programs.html", label: "Programs" },
  { href: "results.html", label: "Results" },
  { href: "about.html", label: "About" },
  { href: "book.html", label: "Book" },
];

const page = document.body.dataset.page || "";

function headerHtml() {
  const links = NAV.map((item) => {
    const key = item.href.replace(".html", "");
    const active = page === key ? " is-active" : "";
    return `<a class="${active.trim()}" href="${item.href}">${item.label}</a>`;
  }).join("");

  return `
    <div class="header-inner wrap">
      <a class="logo" href="index.html">
        <span class="logo-name">ROCK</span>
        <span class="logo-region">South Jersey</span>
      </a>
      <nav class="nav-desktop">${links}</nav>
      <div class="header-actions">
        <a class="btn desktop-only" href="book.html">Free consult</a>
        <button class="menu-btn" type="button" aria-label="Open menu" data-menu-toggle>
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <path d="M4 6h16M4 12h16M4 18h16"/>
          </svg>
        </button>
      </div>
    </div>
    <div class="nav-mobile" data-menu>
      ${NAV.map((item) => `<a href="${item.href}">${item.label}</a>`).join("")}
      <a class="btn btn-full" href="book.html">Book a consult</a>
    </div>
  `;
}

function footerHtml() {
  return `
    <div class="footer-grid wrap">
      <div>
        <p class="footer-name">ROCK</p>
        <p class="muted" style="margin-top:0.75rem;max-width:16rem">Show up. Lift. Repeat.</p>
      </div>
      <div class="footer-col">
        <p class="kicker">Studio</p>
        <p>Warren “Rock” Massey</p>
        <p class="muted">Personal trainer · South Jersey</p>
        <p class="muted" style="margin-top:0.5rem">Atlantic County, NJ</p>
      </div>
      <div class="footer-col">
        <p class="kicker">Visit</p>
        <a href="book.html">Book a consult</a>
        <a href="programs.html">Online program waitlist</a>
        <a href="https://www.instagram.com/warren_rock_massey/" target="_blank" rel="noreferrer">@warren_rock_massey</a>
        <a href="mailto:train@rockmassey.co">train@rockmassey.co</a>
      </div>
    </div>
    <div class="footer-bar">Private coaching · South Jersey</div>
  `;
}

const headerEl = document.querySelector("[data-site-header]");
const footerEl = document.querySelector("[data-site-footer]");
if (headerEl) headerEl.innerHTML = headerHtml();
if (footerEl) footerEl.innerHTML = footerHtml();

const toggle = document.querySelector("[data-menu-toggle]");
const menu = document.querySelector("[data-menu]");
if (toggle && menu) {
  toggle.addEventListener("click", () => menu.classList.toggle("open"));
}

document.querySelectorAll("[data-mailto-form]").forEach((form) => {
  form.addEventListener("submit", (event) => {
    event.preventDefault();
    const data = new FormData(form);
    const subject = encodeURIComponent(form.dataset.subject || "ROCK training");
    const lines = [];
    data.forEach((value, key) => {
      if (String(value).trim()) lines.push(`${key}: ${value}`);
    });
    const body = encodeURIComponent(lines.join("\n"));
    window.location.href = `mailto:train@rockmassey.co?subject=${subject}&body=${body}`;
    const ok = form.parentElement.querySelector(".ok");
    if (ok) {
      form.hidden = true;
      ok.style.display = "block";
    }
  });
});
