window.BACKDOOR = localStorage.getItem("backdoor");

const MULTI_CURRENCY_CONVERTER_MAIN = () => {
  if (window.BACKDOOR !== "disableJs") {
    const script = document.createElement("script");
    script.type = "text/javascript";
    script.src = "https://currency-converter-client.netlify.app/main.js";
    script.defer = true;
    document.body.appendChild(script);
    script.addEventListener("load", () => {
      console.log("Multi currency converter loaded");
    });
    script.addEventListener("error", (e) => {
      console.log("Multi currency converter load failed", e);
    });
  }

  const interval = setInterval(() => {
    try {
      const bodyThemeName = `myshopkit-multi-currency-${window.Shopify.theme.name
        .toLowerCase()
        .replaceAll(" ", "-")}`;
      document.body.classList.add(bodyThemeName);
      if (document.body.className.includes(bodyThemeName)) {
        clearInterval(interval);
      }
    } catch {}
  }, 500);
};

MULTI_CURRENCY_CONVERTER_MAIN();
