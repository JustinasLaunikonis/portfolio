    (() => {
      const entries = [...document.querySelectorAll(".lore-entry[id]")];

      function buildLink(entryId) {
        const url = new URL(window.location.href);
        url.hash = entryId;
        return url.toString();
      }

      async function copyLink(entry, button) {
        const link = buildLink(entry.id);
        try {
          await navigator.clipboard.writeText(link);
        } catch {
          const temp = document.createElement("input");
          temp.value = link;
          document.body.appendChild(temp);
          temp.select();
          document.execCommand("copy");
          temp.remove();
        }

        const original = button.textContent;
        button.textContent = "copied";
        button.classList.add("is-copied");
        window.setTimeout(() => {
          button.textContent = original;
          button.classList.remove("is-copied");
        }, 1200);
      }

      function openEntryFromHash() {
        entries.forEach((entry) => entry.classList.remove("is-targeted"));

        const id = window.location.hash.replace(/^#/, "");
        if (!id) {
          return;
        }

        const target = document.getElementById(id);
        if (!(target instanceof HTMLDetailsElement)) {
          return;
        }

        target.open = true;
        target.classList.add("is-targeted");
        window.setTimeout(() => {
          target.scrollIntoView({ behavior: "smooth", block: "start" });
        }, 80);
      }

      entries.forEach((entry) => {
        const right = entry.querySelector(".lore-summary-right");
        if (!right) {
          return;
        }

        const button = document.createElement("button");
        button.type = "button";
        button.className = "lore-copy-link";
        button.textContent = "#";
        button.setAttribute("aria-label", `Copy link to ${entry.id}`);

        button.addEventListener("click", (event) => {
          event.preventDefault();
          event.stopPropagation();
          copyLink(entry, button);
        });

        right.prepend(button);
      });

      window.addEventListener("hashchange", openEntryFromHash);
      openEntryFromHash();
    })();

    (() => {
      const sentences = [
        "the quick brown fox jumps over the lazy dog again",
        "placeholder sentences live here until you write your own",
        "typing games are a great way to lose ten minutes",
        "swap these lines out for anything you find funny",
        "practice makes progress and progress makes practice",
        "this site template has more easter eggs than expected"
      ];

      const display = document.getElementById("typing-display");
      const input = document.getElementById("typing-input");
      const wpmEl = document.getElementById("typing-wpm");
      const timeEl = document.getElementById("typing-time");
      const refreshBtn = document.getElementById("typing-refresh");
      const resultEl = document.getElementById("typing-result");

      if (!display || !input) return;

      let currentSentence = "";
      let startTime = null;
      let timerInterval = null;
      let finished = false;

      function pickSentence() {
        return sentences[Math.floor(Math.random() * sentences.length)];
      }

      function render() {
        const typed = input.value;
        let html = "";

        for (let i = 0; i < currentSentence.length; i++) {
          const char = currentSentence[i];
          if (i < typed.length) {
            if (typed[i] === char) {
              html += `<span class="correct">${char}</span>`;
            } else {
              html += `<span class="incorrect">${char}</span>`;
            }
          } else if (i === typed.length) {
            html += `<span class="current">${char}</span>`;
          } else {
            html += char;
          }
        }

        display.innerHTML = html;
      }

      function reset() {
        currentSentence = pickSentence();
        input.value = "";
        input.disabled = false;
        startTime = null;
        finished = false;
        if (timerInterval) clearInterval(timerInterval);
        timerInterval = null;
        wpmEl.textContent = "0 wpm";
        timeEl.textContent = "0.0s";
        resultEl.textContent = "";
        resultEl.className = "typing-result";
        render();
        input.focus();
      }

      function updateTimer() {
        if (!startTime || finished) return;
        const elapsed = (Date.now() - startTime) / 1000;
        timeEl.textContent = elapsed.toFixed(1) + "s";

        const typed = input.value;
        const words = typed.trim().split(/\s+/).filter(w => w).length;
        const wpm = elapsed > 0 ? Math.round((words / elapsed) * 60) : 0;
        wpmEl.textContent = wpm + " wpm";
      }

      function checkFinish() {
        if (input.value === currentSentence) {
          finished = true;
          if (timerInterval) clearInterval(timerInterval);
          input.disabled = true;

          const elapsed = (Date.now() - startTime) / 1000;
          const words = currentSentence.trim().split(/\s+/).length;
          const finalWpm = Math.round((words / elapsed) * 60);

          wpmEl.textContent = finalWpm + " wpm";
          timeEl.textContent = elapsed.toFixed(1) + "s";

          if (finalWpm >= 140) {
            resultEl.textContent = "you beat me! gg";
            resultEl.className = "typing-result win";
          } else {
            resultEl.textContent = "try again!";
            resultEl.className = "typing-result lose";
          }
        }
      }

      const game = document.getElementById("typing-game");

      input.addEventListener("focus", () => {
        game.classList.add("focused");
      });

      input.addEventListener("blur", () => {
        game.classList.remove("focused");
      });

      input.addEventListener("input", () => {
        if (!startTime && input.value.length === 1) {
          startTime = Date.now();
          timerInterval = setInterval(updateTimer, 100);
        }
        render();
        checkFinish();
      });

      refreshBtn.addEventListener("click", reset);

      reset();
    })();

    (() => {
      const answer = 12;
      const input = document.getElementById("guess-input");
      const submitBtn = document.getElementById("guess-submit");
      const giveupBtn = document.getElementById("guess-giveup");
      const result = document.getElementById("guess-result");

      if (!input || !submitBtn || !giveupBtn || !result) return;

      function checkGuess() {
        const guess = parseInt(input.value, 10);
        if (isNaN(guess)) {
          result.textContent = "enter a number!";
          result.classList.remove("correct");
          return;
        }

        let newText;
        if (guess < answer) {
          newText = "higher!";
        } else if (guess > answer) {
          newText = "lower!";
        } else {
          result.textContent = "YES! 12 failed plugins. pain.";
          result.classList.add("correct");
          input.disabled = true;
          submitBtn.disabled = true;
          giveupBtn.disabled = true;
          return;
        }

        result.classList.remove("correct");
        if (result.textContent === newText) {
          result.classList.remove("shake");
          void result.offsetWidth;
          result.classList.add("shake");
        }
        result.textContent = newText;
      }

      function giveUp() {
        result.textContent = "it's 12. yeah.";
        result.classList.remove("correct");
        input.disabled = true;
        submitBtn.disabled = true;
        giveupBtn.disabled = true;
      }

      submitBtn.addEventListener("click", checkGuess);
      giveupBtn.addEventListener("click", giveUp);
      input.addEventListener("keydown", (e) => {
        if (e.key === "Enter") checkGuess();
      });
    })();
  
