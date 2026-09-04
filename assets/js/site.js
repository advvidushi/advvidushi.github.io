(function () {
  const site = window.SITE;
  const page = document.body.dataset.page || "";

  const links = [
    ["index.html", "Home", "home"],
    ["chambers.html", "Chambers", "chambers"],
    ["law-tie.html", "Law Tie", "law-tie"],
    ["programmes.html", "Programmes", "programmes"],
    ["counselling.html", "Counselling", "counselling"],
    ["contact.html", "Enquiry", "contact"]
  ];

  function renderHeader() {
    const host = document.getElementById("site-header");
    if (!host) return;
    host.innerHTML = `
      <header class="site-header">
        <div class="wrap nav-row">
          <a class="brand" href="index.html">
            <img src="assets/img/mark.svg" alt="">
            <span class="brand-text">
              <strong>LAW TIE</strong>
              <span>Adv. Vidushi Soni</span>
            </span>
          </a>
          <button class="menu-btn" type="button" aria-expanded="false" aria-controls="nav-links">Menu</button>
          <nav id="nav-links" class="nav-links">
            ${links
              .map(
                ([href, label, id]) =>
                  `<a href="${href}" class="${id === page ? "active" : ""}">${label}</a>`
              )
              .join("")}
          </nav>
        </div>
      </header>
    `;
    const btn = host.querySelector(".menu-btn");
    const nav = host.querySelector("#nav-links");
    btn.addEventListener("click", function () {
      const open = nav.classList.toggle("open");
      btn.setAttribute("aria-expanded", String(open));
      track(open ? "Opened Mobile Menu" : "Closed Mobile Menu");
    });
  }

  function renderFooter() {
    const host = document.getElementById("site-footer");
    if (!host) return;
    host.innerHTML = `
      <footer class="site-footer">
        <div class="wrap footer-grid">
          <div>
            <p class="eyebrow">Chambers &amp; academic initiative</p>
            <h3>Adv. Vidushi Soni · Law Tie</h3>
            <p>Informational website maintained in the spirit of Rule 36 of the Bar Council of India Rules. Educational content is published as public legal literacy and academic support, not as advertisement of legal services.</p>
          </div>
          <div>
            <p class="eyebrow">Visit</p>
            <p>
              <a href="chambers.html">Professional particulars</a><br>
              <a href="law-tie.html">YouTube classroom</a><br>
              <a href="programmes.html">Academic programmes</a><br>
              <a href="compliance.html">BCI notices</a>
            </p>
          </div>
          <div>
            <p class="eyebrow">Coordinates</p>
            <p>
              ${site.advocate.address}<br>
              <a href="tel:+91${site.contact.phone}">${site.contact.phoneDisplay}</a><br>
              <a href="${site.contact.youtube}" rel="noopener">YouTube ${site.contact.youtubeHandle}</a><br>
              <a href="${site.contact.instagram}" rel="noopener">Instagram @law.tie</a>
            </p>
          </div>
        </div>
        <div class="wrap fineprint">
          Law Tie is an independent academic initiative and is not affiliated with the Bar Council of India. Visiting this website does not create an advocate-client relationship. No outcome is promised in any court matter or examination.
        </div>
      </footer>
    `;
  }

  function renderGate() {
    if (sessionStorage.getItem("lawtie-gate") === "accepted") return;
    const gate = document.createElement("div");
    gate.className = "gate";
    gate.setAttribute("role", "dialog");
    gate.setAttribute("aria-modal", "true");
    gate.setAttribute("aria-labelledby", "gate-title");
    gate.innerHTML = `
      <div class="gate-card">
        <p class="eyebrow">Important notice</p>
        <h2 id="gate-title">Please read before entering</h2>
        <p>The Bar Council of India does not permit advertisement or solicitation by advocates. This website is an informational and academic resource. By selecting “I agree”, you confirm that:</p>
        <ol>
          <li>You are seeking this information of your own accord. There has been no advertisement, personal communication, solicitation, invitation or inducement of any sort to obtain legal work through this website.</li>
          <li>The professional particulars of Adv. Vidushi Soni are furnished in accordance with Rule 36 of the Bar Council of India Rules (as amended in 2008) and are intended as information, not promotion.</li>
          <li>Material relating to Law Tie is academic in nature. It is not legal advice, not a guarantee of examination results, and not an offer of court representation.</li>
          <li>No advocate-client relationship arises from browsing this website or sending an enquiry.</li>
        </ol>
        <div class="gate-actions">
          <button class="btn btn-ink" type="button" id="gate-agree">I agree</button>
          <a class="btn btn-ghost" href="https://www.barcouncilofindia.org/" rel="noopener">Leave</a>
        </div>
      </div>
    `;
    document.body.appendChild(gate);
    document.getElementById("gate-agree").addEventListener("click", function () {
      sessionStorage.setItem("lawtie-gate", "accepted");
      gate.hidden = true;
      track("Accepted Disclaimer Notice");
    });
  }

  function fillPlaceholders() {
    document.querySelectorAll("[data-fill]").forEach(function (el) {
      const path = el.dataset.fill.split(".");
      let value = site;
      path.forEach(function (key) {
        value = value ? value[key] : "";
      });
      if (value) el.textContent = value;
    });
  }

  function bindContactForm() {
    const form = document.getElementById("enquiry-form");
    if (!form) return;
    const status = document.getElementById("form-status");
    form.addEventListener("submit", function (event) {
      event.preventDefault();
      const data = new FormData(form);
      const name = String(data.get("name") || "").trim();
      const purpose = String(data.get("purpose") || "").trim();
      const message = String(data.get("message") || "").trim();
      if (!name || !purpose || !message) {
        status.textContent = "Please complete the required fields.";
        track("Enquiry Form Incomplete");
        return;
      }
      const text = [
        "Enquiry from the Law Tie website",
        "Name: " + name,
        "Purpose: " + purpose,
        "Message: " + message
      ].join("\n");
      const url = "https://wa.me/" + site.contact.whatsapp + "?text=" + encodeURIComponent(text);
      status.textContent = "Opening WhatsApp so you may send the enquiry yourself.";
      track("Submitted Academic Enquiry", { enquiry_purpose: purpose });
      window.open(url, "_blank", "noopener");
    });
  }

  const pageViews = {
    home: "Viewed Home",
    chambers: "Viewed Chambers",
    "law-tie": "Viewed Law Tie Classroom",
    programmes: "Viewed Academic Programmes",
    counselling: "Viewed Career Counselling",
    contact: "Viewed Enquiry",
    compliance: "Viewed Professional Notices",
    "not-found": "Viewed Page Not Found"
  };

  function track(name, properties) {
    if (typeof window.trackEvent === "function") {
      window.trackEvent(name, Object.assign({ page_name: pageViews[page] || page || "Unknown page" }, properties));
    }
  }

  function labelForLink(el) {
    const href = el.getAttribute("href") || "";
    const text = (el.textContent || "").replace(/\s+/g, " ").trim();
    if (el.classList.contains("brand")) return "Clicked Brand Logo";
    if (href.indexOf("youtube.com") !== -1) return "Clicked YouTube Channel";
    if (href.indexOf("instagram.com") !== -1) return "Clicked Instagram";
    if (href.indexOf("linkedin.com") !== -1) return "Clicked LinkedIn";
    if (href.indexOf("tel:") === 0) return "Clicked Telephone Number";
    if (href.indexOf("wa.me") !== -1) return "Opened WhatsApp Enquiry";
    if (href.indexOf("barcouncilofindia") !== -1) return "Left Website From Disclaimer";
    if (el.closest("#nav-links")) return "Clicked Navigation " + text;
    if (el.closest(".site-footer")) return "Clicked Footer " + text;
    if (text) return "Clicked " + text;
    return "Clicked Link";
  }

  function bindCustomClicks() {
    document.addEventListener("click", function (event) {
      const el = event.target.closest("a, button");
      if (!el || el.id === "gate-agree" || el.classList.contains("menu-btn")) return;
      if (el.closest("form") && el.getAttribute("type") === "submit") return;
      track(labelForLink(el), { link_url: el.getAttribute("href") || "" });
    });
  }

  renderHeader();
  renderFooter();
  renderGate();
  fillPlaceholders();
  bindContactForm();
  bindCustomClicks();
  track(pageViews[page] || "Viewed Page");
})();

