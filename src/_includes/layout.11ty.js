// Escape values that go into HTML (page content is already HTML)
const esc = (str) =>
  String(str)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");

export default function (data) {
  const { site, title, page, content } = data;

  const nav = site.nav
    .map((item) => {
      const current =
        decodeURIComponent(item.url) === page.url ? ' aria-current="page"' : "";
      return `<li><a href="${item.url}"${current}>${esc(item.label)}</a></li>`;
    })
    .join("\n          ");

  return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <title>${title ? `${esc(title)} | ` : ""}${esc(site.title)}</title>
  <meta name="description" content="${esc(site.title)} are getting married on ${esc(site.date)}.">
  <link rel="stylesheet" href="/css/style.css">
<script defer src="https://cdn.jsdelivr.net/npm/quicklink@3.0.2/dist/quicklink.umd.js"></script>
<script>
  window.addEventListener('load', () => {
    quicklink.listen();
  });
</script>
</head>
<body>
  <header class="site-header">
    <a class="site-logo" href="/" aria-label="${esc(site.title)}, home">
      <img src="/images/logo.svg" alt="" eleventy:ignore>
      <img class="site-logo__hover" src="/images/logo-hats.svg" alt="" eleventy:ignore>
    </a>
    <nav aria-label="Main">
      <ul>
          ${nav}
      </ul>
    </nav>
  </header>

  <main>
    ${content}
  </main>

  <footer class="site-footer">
    <p>${esc(site.title)} &middot; ${esc(site.date)}</p>
  </footer>

  <script>
    // Touch devices have no hover: tapping the logo on the home page
    // toggles the hats instead of reloading the page.
    const logo = document.querySelector(".site-logo");
    logo.addEventListener("click", (event) => {
      if (location.pathname !== "/" || !matchMedia("(hover: none)").matches) return;
      event.preventDefault();
      logo.classList.toggle("show-hats");
    });
  </script>
</body>
</html>
`;
}
