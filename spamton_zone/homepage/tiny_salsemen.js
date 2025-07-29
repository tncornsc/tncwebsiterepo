const container = document.getElementById("tiny-salesmen-container");

function launchSalesman() {
  const img = document.createElement("img");
  img.src = "../images/tiny_spamton.png";
  img.className = "tiny-salesman";

  // Random size
  const scale = Math.random() * 0.5 + 0.3;
  img.style.transform = `scale(${scale}) rotate(${Math.random() * 360}deg)`;

  // Random position (start)
  img.style.left = `${Math.random() * 100}vw`;
  img.style.top = `${Math.random() * 100}vh`;

  container.appendChild(img);

  // Animation
  img.animate([
    { transform: `translate(0, 0) scale(${scale}) rotate(0deg)` },
    {
      transform: `translate(${Math.random() * 200 - 100}vw, ${
        Math.random() * 200 - 100
      }vh) scale(${scale}) rotate(${Math.random() * 720}deg)`
    }
  ], {
    duration: 4000 + Math.random() * 3000,
    easing: "ease-in-out"
  });

  // Remove after animation
  setTimeout(() => img.remove(), 7000);
}

// Launch at random intervals
setInterval(() => {
  if (Math.random() > 0.5) launchSalesman();
}, 1000);
