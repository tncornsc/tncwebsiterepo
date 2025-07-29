(() => {
  const rowHeight = () => Math.floor(Math.random() * 8) + 3; // 3–10 px
  const delay = () => Math.random() * 1900 + 100; // 0.1s–2s

  // Create the mask overlay
  const overlay = document.createElement("div");
  overlay.style.position = "fixed";
  overlay.style.top = 0;
  overlay.style.left = 0;
  overlay.style.width = "100vw";
  overlay.style.height = "100vh";
  overlay.style.backgroundColor = "white";
  overlay.style.zIndex = 9999;
  overlay.style.pointerEvents = "none";
  document.body.appendChild(overlay);

  const totalHeight = window.innerHeight;
  let currentOffset = 0;

  function revealNextRow() {
    const h = rowHeight();
    const strip = document.createElement("div");
    strip.style.position = "absolute";
    strip.style.top = `${currentOffset}px`;
    strip.style.left = 0;
    strip.style.width = "100vw";
    strip.style.height = `${h}px`;
    strip.style.backgroundColor = "transparent";
    overlay.appendChild(strip);

    currentOffset += h;

    if (currentOffset < totalHeight) {
      setTimeout(revealNextRow, delay());
    } else {
      // All rows revealed, remove overlay
      document.body.style.visibility = "visible";
      overlay.remove();
    }
  }

  window.addEventListener("load", () => {
    revealNextRow();
  });
})();
