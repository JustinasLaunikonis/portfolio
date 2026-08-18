(() => {
      const toggle = document.getElementById("theme-toggle");
      const icon = document.getElementById("theme-toggle-icon");
      const root = document.documentElement;

      function syncThemeIcon() {
        if (icon) {
          icon.classList.toggle("is-sun", root.classList.contains("dark"));
        }
      }

      if (toggle) {
        syncThemeIcon();
        toggle.addEventListener("click", () => {
          root.classList.toggle("dark");
          localStorage.setItem("theme", root.classList.contains("dark") ? "dark" : "light");
          syncThemeIcon();
        });
      }
    })();
