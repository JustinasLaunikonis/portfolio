    (() => {
      const canvas = document.getElementById("toolbox-canvas");
      const ctx = canvas.getContext("2d");
      const linesEl = document.getElementById("toolbox-lines");
      const scoreEl = document.getElementById("toolbox-score");
      const levelEl = document.getElementById("toolbox-level");
      const statusEl = document.getElementById("toolbox-status");
      const nextNameEl = document.getElementById("toolbox-next-name");
      const nextSwatchEl = document.getElementById("toolbox-next-swatch");

      const COLS = 10;
      const ROWS = 20;
      const CELL = 32;
      const board = Array.from({ length: ROWS }, () => Array(COLS).fill(null));

      const categories = {
        language: { color: "#9b5cff", label: "programming languages" },
        framework: { color: "#3db8ff", label: "frameworks / libraries" },
        platform: { color: "#39d98a", label: "infra / platform" },
        tool: { color: "#ff5d73", label: "tools / workflow" }
      };

      const pieceShapes = {
        I: [[1, 1, 1, 1]],
        O: [[1, 1], [1, 1]],
        T: [[0, 1, 0], [1, 1, 1]],
        L: [[1, 0, 0], [1, 1, 1]],
        J: [[0, 0, 1], [1, 1, 1]],
        S: [[0, 1, 1], [1, 1, 0]],
        Z: [[1, 1, 0], [0, 1, 1]]
      };

      const items = [
        { name: "Python", shape: "T", category: "language", logo: "../assets/toolbox/python.svg" },
        { name: "C++", shape: "L", category: "language", logo: "../assets/toolbox/cplusplus.svg" },
        { name: "TypeScript", shape: "J", category: "language", logo: "../assets/toolbox/typescript.svg" },
        { name: "JavaScript", shape: "S", category: "language", logo: "../assets/toolbox/javascript.svg" },
        { name: "Lua", shape: "Z", category: "language", logo: "../assets/toolbox/lua.svg" },
        { name: "SQL", shape: "O", category: "language", logo: "../assets/toolbox/database.svg" },
        { name: "HTML", shape: "I", category: "language", logo: "../assets/toolbox/html5.svg" },
        { name: "CSS", shape: "T", category: "language", logo: "../assets/toolbox/css.svg" },
        { name: "Django", shape: "S", category: "framework", logo: "../assets/toolbox/django.svg" },
        { name: "Flask", shape: "Z", category: "framework", logo: "../assets/toolbox/flask.svg" },
        { name: "Celery", shape: "J", category: "framework", logo: "../assets/toolbox/celery.svg" },
        { name: "Next.js", shape: "I", category: "framework", logo: "../assets/toolbox/nextjs.svg" },
        { name: "Tailwind", shape: "O", category: "framework", logo: "../assets/toolbox/tailwindcss.svg" },
        { name: "Docker", shape: "I", category: "platform", logo: "../assets/toolbox/docker.svg" },
        { name: "Linux", shape: "O", category: "platform", logo: "../assets/toolbox/linux.svg" },
        { name: "OpenAI", shape: "L", category: "platform", logo: "../assets/toolbox/openai.svg" },
        { name: "Azure", shape: "J", category: "platform", logo: "../assets/toolbox/azure.svg" },
        { name: "Node", shape: "S", category: "platform", logo: "../assets/toolbox/node.svg" },
        { name: "Git", shape: "O", category: "tool", logo: "../assets/toolbox/git.svg" },
        { name: "Vim", shape: "T", category: "tool", logo: "../assets/toolbox/vim.svg" },
        { name: "VS Code", shape: "J", category: "tool", logo: "../assets/toolbox/vscode.svg" },
        { name: "Cursor", shape: "S", category: "tool", logo: "../assets/toolbox/cursor.svg" },
        { name: "Figma", shape: "J", category: "tool", logo: "../assets/toolbox/figma.svg" },
        { name: "Blender", shape: "O", category: "tool", logo: "../assets/toolbox/blender.svg" },
        { name: "DaVinci", shape: "S", category: "tool", logo: "../assets/toolbox/davinciresolve.svg" },
        { name: "Tailscale", shape: "L", category: "platform", logo: "../assets/toolbox/tailscale.svg" },
        { name: "Maven", shape: "J", category: "tool", logo: "../assets/toolbox/maven.svg" },
        { name: "Vite", shape: "O", category: "tool", logo: "../assets/toolbox/vite.svg" },
        { name: "LaTeX", shape: "Z", category: "tool", logo: "../assets/toolbox/latex.svg" }
      ];

      function drawTextMark(text, x, y, size, fontSize = 9) {
        ctx.save();
        ctx.fillStyle = "#111111";
        ctx.font = `bold ${fontSize}px IBM Plex Mono`;
        ctx.textAlign = "center";
        ctx.textBaseline = "middle";
        ctx.fillText(text, x, y + 0.5);
        ctx.restore();
      }

      const logoCache = new Map();

      function loadLogo(src) {
        if (!src) {
          return null;
        }
        if (logoCache.has(src)) {
          return logoCache.get(src);
        }
        const img = new Image();
        img.decoding = "async";
        img.src = src;
        logoCache.set(src, img);
        return img;
      }

      let queue = [];
      let current = null;
      let dropAccumulator = 0;
      let lastTime = 0;
      let lines = 0;
      let score = 0;
      let level = 1;
      let status = "playing";
      let pieceIdCounter = 1;

      function cloneMatrix(matrix) {
        return matrix.map((row) => [...row]);
      }

      function rotate(matrix) {
        return matrix[0].map((_, x) => matrix.map((row) => row[x]).reverse());
      }

      function makePiece(item) {
        const matrix = cloneMatrix(pieceShapes[item.shape]);
        return {
          id: pieceIdCounter += 1,
          item,
          matrix,
          x: Math.floor((COLS - matrix[0].length) / 2),
          y: 0
        };
      }

      function refillQueue() {
        const shuffled = [...items].sort(() => Math.random() - 0.5);
        queue.push(...shuffled);
      }

      function spawnPiece() {
        if (queue.length < 6) {
          refillQueue();
        }

        current = makePiece(queue.shift());
        nextNameEl.textContent = queue[0].name;
        nextSwatchEl.style.background = categories[queue[0].category].color;

        if (collides(current.matrix, current.x, current.y)) {
          status = "game over";
          statusEl.textContent = status;
        }
      }

      function collides(matrix, offsetX, offsetY) {
        for (let y = 0; y < matrix.length; y += 1) {
          for (let x = 0; x < matrix[y].length; x += 1) {
            if (!matrix[y][x]) {
              continue;
            }

            const boardX = offsetX + x;
            const boardY = offsetY + y;

            if (boardX < 0 || boardX >= COLS || boardY >= ROWS) {
              return true;
            }

            if (boardY >= 0 && board[boardY][boardX]) {
              return true;
            }
          }
        }
        return false;
      }

      function mergePiece() {
        current.matrix.forEach((row, y) => {
          row.forEach((value, x) => {
            if (!value) {
              return;
            }

            const boardY = current.y + y;
            if (boardY >= 0) {
              board[boardY][current.x + x] = {
                id: current.id,
                name: current.item.name,
                category: current.item.category,
                color: categories[current.item.category].color,
                logo: current.item.logo || null
              };
            }
          });
        });
      }

      function clearLines() {
        const CLEAR_DEPTH = 4;
        let cleared = 0;

        // Only clear when the bottom CLEAR_DEPTH rows are all full at once.
        let allFull = true;
        for (let y = ROWS - 1; y >= ROWS - CLEAR_DEPTH; y -= 1) {
          if (!board[y].every(Boolean)) {
            allFull = false;
            break;
          }
        }

        if (allFull) {
          board.splice(ROWS - CLEAR_DEPTH, CLEAR_DEPTH);
          for (let i = 0; i < CLEAR_DEPTH; i += 1) {
            board.unshift(Array(COLS).fill(null));
          }
          cleared = CLEAR_DEPTH;
        }

        if (cleared > 0) {
          lines += cleared;
          score += cleared * 100;
          level = 1 + Math.floor(lines / 5);
          linesEl.textContent = String(lines);
          scoreEl.textContent = String(score);
          levelEl.textContent = String(level);
        }
      }

      function lockPiece() {
        mergePiece();
        clearLines();
        spawnPiece();
      }

      function move(dx, dy) {
        if (!current || status !== "playing") {
          return false;
        }

        const nextX = current.x + dx;
        const nextY = current.y + dy;
        if (collides(current.matrix, nextX, nextY)) {
          if (dy === 1) {
            lockPiece();
          }
          return false;
        }

        current.x = nextX;
        current.y = nextY;
        return true;
      }

      function hardDrop() {
        while (move(0, 1)) {
          score += 2;
        }
        scoreEl.textContent = String(score);
      }

      function rotateCurrent() {
        if (!current || status !== "playing") {
          return;
        }

        const rotated = rotate(current.matrix);
        const kicks = [0, -1, 1, -2, 2];
        for (const kick of kicks) {
          if (!collides(rotated, current.x + kick, current.y)) {
            current.matrix = rotated;
            current.x += kick;
            return;
          }
        }
      }

      function drawCell(x, y, color) {
        ctx.fillStyle = color;
        ctx.fillRect(x * CELL, y * CELL, CELL, CELL);
        ctx.strokeStyle = "rgba(0, 0, 0, 0.28)";
        ctx.strokeRect(x * CELL + 0.5, y * CELL + 0.5, CELL - 1, CELL - 1);
      }

      function drawPieceBadge(bounds, item) {
        const centerX = bounds.x + bounds.w / 2;
        const centerY = bounds.y + bounds.h / 2;
        const logo = item.logo ? loadLogo(item.logo) : null;
        const hasLogo = Boolean(logo && logo.complete && logo.naturalWidth > 0);

        if (hasLogo) {
          const size = Math.max(18, Math.min(30, Math.min(bounds.w, bounds.h) * 0.34));
          const pad = 2;
          ctx.save();
          ctx.fillStyle = "#ffffff";
          ctx.fillRect(centerX - size / 2 - pad, centerY - 22 - pad, size + pad * 2, size + pad * 2);
          ctx.strokeStyle = "rgba(0, 0, 0, 0.18)";
          ctx.strokeRect(centerX - size / 2 - pad + 0.5, centerY - 22 - pad + 0.5, size + pad * 2 - 1, size + pad * 2 - 1);
          ctx.restore();
          ctx.drawImage(logo, centerX - size / 2, centerY - 22, size, size);
        }

        ctx.save();
        ctx.fillStyle = "#111111";
        ctx.font = "bold 9px IBM Plex Mono";
        ctx.textAlign = "center";
        ctx.textBaseline = "middle";
        ctx.fillText(item.name, centerX, centerY + (hasLogo ? 12 : 0));
        ctx.restore();
      }

      function drawBoard() {
        const dark = document.documentElement.classList.contains("dark");
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        ctx.fillStyle = dark ? "#131823" : "#ffffff";
        ctx.fillRect(0, 0, canvas.width, canvas.height);

        const groups = new Map();

        for (let y = 0; y < ROWS; y += 1) {
          for (let x = 0; x < COLS; x += 1) {
            const cell = board[y][x];
            if (cell) {
              drawCell(x, y, cell.color);
              if (!groups.has(cell.id)) {
                groups.set(cell.id, {
                  minX: x,
                  maxX: x,
                  minY: y,
                  maxY: y,
                  item: cell
                });
              } else {
                const group = groups.get(cell.id);
                group.minX = Math.min(group.minX, x);
                group.maxX = Math.max(group.maxX, x);
                group.minY = Math.min(group.minY, y);
                group.maxY = Math.max(group.maxY, y);
              }
            } else {
              ctx.strokeStyle = dark ? "rgba(255, 255, 255, 0.08)" : "rgba(0, 0, 0, 0.06)";
              ctx.strokeRect(x * CELL + 0.5, y * CELL + 0.5, CELL - 1, CELL - 1);
            }
          }
        }

        groups.forEach((group) => {
          drawPieceBadge(
            {
              x: group.minX * CELL,
              y: group.minY * CELL,
              w: (group.maxX - group.minX + 1) * CELL,
              h: (group.maxY - group.minY + 1) * CELL
            },
            group.item
          );
        });
      }

      function drawPiece(piece) {
        if (!piece) {
          return;
        }

        const color = categories[piece.item.category].color;
        let minX = Infinity;
        let maxX = -Infinity;
        let minY = Infinity;
        let maxY = -Infinity;
        piece.matrix.forEach((row, y) => {
          row.forEach((value, x) => {
            if (value) {
              drawCell(piece.x + x, piece.y + y, color);
              minX = Math.min(minX, piece.x + x);
              maxX = Math.max(maxX, piece.x + x);
              minY = Math.min(minY, piece.y + y);
              maxY = Math.max(maxY, piece.y + y);
            }
          });
        });

        drawPieceBadge(
          {
            x: minX * CELL,
            y: minY * CELL,
            w: (maxX - minX + 1) * CELL,
            h: (maxY - minY + 1) * CELL
          },
          piece.item
        );
      }

      function drawStatusOverlay() {
        if (status !== "game over" && status !== "paused") {
          return;
        }

        ctx.fillStyle = "rgba(11, 12, 16, 0.84)";
        ctx.fillRect(0, 0, canvas.width, canvas.height);
        ctx.fillStyle = "#ffffff";
        ctx.font = "bold 24px IBM Plex Mono";
        ctx.textAlign = "center";
        ctx.fillText(status, canvas.width / 2, canvas.height / 2 - 18);
        ctx.font = "14px IBM Plex Mono";
        ctx.fillText(
          status === "paused" ? "press P to resume" : "press R to run it back",
          canvas.width / 2,
          canvas.height / 2 + 16
        );
      }

      function draw() {
        drawBoard();
        drawPiece(current);
        drawStatusOverlay();
      }

      function tick(time) {
        if (!lastTime) {
          lastTime = time;
        }

        const delta = time - lastTime;
        lastTime = time;

        if (status === "playing") {
          dropAccumulator += delta;
          const interval = Math.max(130, 620 - (level - 1) * 45);
          if (dropAccumulator >= interval) {
            move(0, 1);
            dropAccumulator = 0;
          }
        }

        draw();
        requestAnimationFrame(tick);
      }

      function reset() {
        for (let y = 0; y < ROWS; y += 1) {
          board[y].fill(null);
        }
        queue = [];
        pieceIdCounter = 1;
        lines = 0;
        score = 0;
        level = 1;
        status = "playing";
        dropAccumulator = 0;
        lastTime = 0;
        linesEl.textContent = "0";
        scoreEl.textContent = "0";
        levelEl.textContent = "1";
        statusEl.textContent = "playing";
        refillQueue();
        spawnPiece();
      }

      document.addEventListener("keydown", (event) => {
        if (event.target instanceof HTMLInputElement || event.target instanceof HTMLTextAreaElement) {
          return;
        }

        if (event.key.toLowerCase() === "r") {
          reset();
          return;
        }

        if (event.key.toLowerCase() === "p") {
          if (status === "playing") {
            status = "paused";
          } else if (status === "paused") {
            status = "playing";
          }
          statusEl.textContent = status;
          return;
        }

        if (status !== "playing") {
          return;
        }

        if (event.key === "ArrowLeft") {
          event.preventDefault();
          move(-1, 0);
        } else if (event.key === "ArrowRight") {
          event.preventDefault();
          move(1, 0);
        } else if (event.key === "ArrowDown") {
          event.preventDefault();
          if (move(0, 1)) {
            score += 1;
            scoreEl.textContent = String(score);
          }
        } else if (event.key === "ArrowUp") {
          event.preventDefault();
          rotateCurrent();
        } else if (event.key === " ") {
          event.preventDefault();
          hardDrop();
        }
      });

      items.forEach((item) => {
        if (item.logo) {
          loadLogo(item.logo);
        }
      });

      const touchpad = document.getElementById("toolbox-touchpad");
      if (touchpad) {
        const actions = {
          left: () => move(-1, 0),
          right: () => move(1, 0),
          down: () => {
            if (move(0, 1)) {
              score += 1;
              scoreEl.textContent = String(score);
            }
          },
          rotate: () => rotateCurrent(),
          drop: () => hardDrop()
        };
        const repeatable = new Set(["left", "right", "down"]);
        const heldTimers = new Map();

        function fire(action) {
          if (status !== "playing") {
            return;
          }
          actions[action]();
        }

        function startHold(btn, action) {
          fire(action);
          if (!repeatable.has(action)) {
            return;
          }
          let interval;
          const delay = window.setTimeout(() => {
            interval = window.setInterval(() => fire(action), 80);
            heldTimers.set(btn, { delay: null, interval });
          }, 220);
          heldTimers.set(btn, { delay, interval: null });
        }

        function endHold(btn) {
          const handle = heldTimers.get(btn);
          if (!handle) {
            return;
          }
          if (handle.delay) {
            window.clearTimeout(handle.delay);
          }
          if (handle.interval) {
            window.clearInterval(handle.interval);
          }
          heldTimers.delete(btn);
        }

        touchpad.querySelectorAll(".toolbox-touch-btn").forEach((btn) => {
          const action = btn.dataset.action;
          btn.addEventListener("pointerdown", (event) => {
            event.preventDefault();
            btn.setPointerCapture(event.pointerId);
            startHold(btn, action);
          });
          ["pointerup", "pointercancel", "pointerleave"].forEach((evt) => {
            btn.addEventListener(evt, () => endHold(btn));
          });
          btn.addEventListener("contextmenu", (event) => event.preventDefault());
        });
      }

      reset();
      requestAnimationFrame(tick);
    })();
  
