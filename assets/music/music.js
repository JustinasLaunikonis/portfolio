    (() => {
      const albums = [
        { artist: "Dire Straits", title: "Money For Nothing", video: "wTP2RUD_cL0" },
        { artist: "LORN", title: "Acid Rain", video: "evgoa2uVcuE" },
        { artist: "Kaleida", title: "Think", video: "1CurN2Fg-2E" },
        { artist: "seekae", title: "Test & Recognize (Flume Re-work, Slowed)", video: "lFXOPWj_Lq0" },
        { artist: "speirdiv", title: "Resonance x Genesis x Not Allowed (Slowed)", video: "M6_b1SCZMhQ" },
        { artist: "LONOWN", title: "Addiction (Slowed + Reverb)", video: "EVsSAHIXXMg" },
        { artist: "Lady Gaga", title: "Government Hooker (D00nik Remix)", video: "XMVUzebCAYA" },
        { artist: "Dayerteq", title: "Beztebya (Slowed + Reverb)", video: "5RKa0gXUG70" },
        { artist: "BLESSED MANE", title: "Death Is No More (Slowed + Reverb)", video: "6IhptxnX_p4" },
        { artist: "Sparky Deathcap", title: "September (Instrumental)", video: "DFZ7H6Tt5Rk" },
        { artist: "sidewalks and skeletons", title: "Goth (Slowed + Reverb)", video: "HZuM1KtDw2Y" },
        { artist: "vyrval", title: "✻H+3+ЯД✻ (Super Slowed)", video: "aCTabx4cEp0" },
        { artist: "DRUMX", title: "Simpsonwave 1995 (Slowed + Reverb)", video: "zG8pP8LHLEo" },
        { artist: "Crystal Castles", title: "Kerosene (Best Part Looped)", video: "NvRUpkTrTGk" },
        { artist: "plenka", title: "Nightmare (Slowed + Reverb)", video: "lgOhrJTYrdE" },
        { artist: "pastel ghost", title: "Dark Beach (Slowed + Reverb)", video: "SNj9gm59Wc4" },
        { artist: "Twin Tribes", title: "Monolith (Slowed + Reverb)", video: "j53wQ7gy1rA" },
        { artist: "Aphex Twin", title: "Polynomial-C", video: "92cRzPvwsaU" },
        { artist: "GHOSTSHELL, Mannequin", title: "Bad Love", video: "Lqvs_yZb8ZI" },
        { artist: "Crystal Castles", title: "Vanished (Slowed + Reverb)", video: "NxPOl82eBzQ" },
        { artist: "Perpetualll", title: "Witch", video: "Qpg9HNaqbWo" },
        { artist: "Radiohead", title: "Everything In Its Right Place", video: "NUnXxh5U25Y" },
        { artist: "Grimes", title: "Genesis", video: "WizNXQGBMEk" },
        { artist: "Dua Lipa x Madonna", title: "Don't Start Now x Hung Up (80s Mashup)", video: "-m6qtuzVXIY" },
        { artist: "The Drums", title: "Money", video: "q5go1dovoeM" },
        { artist: "Filow", title: "Turbo", video: "sOUNKH4NqP8" },
        { artist: "Fruity Luke", title: "Delphin", video: "xO_gzvEACg4" },
        { artist: "Trevor Something", title: "The Ghost", video: "zqdOpz4R7BA" },
        { artist: "alexsucks", title: "The Headache", video: "KMorUH6QTjA" },
        { artist: "BUCKSHOT & FAKEMINK", title: "Fever", video: "mqEZcXdtAUA" },
        { artist: "LOKIMITDERMASKE", title: "Harte Drinks", video: "VKAMIlN9wC4" },
        { artist: "Mando Diao", title: "Dance With Somebody", video: "qkyRHRIvoGo" },
        { artist: "The Neighbourhood", title: "Scary Love", video: "zTIoErJmsp4" },
        { artist: "Aphex Twin", title: "Pulsewidth", video: "wQyZ0Rn3xRI" },
        { artist: "Schachter", title: "Apollon (Super Slowed)", video: "RgdxWzBJ0pk" },
        { artist: "Øneheart", title: "Next To You", video: "tngoSJZpi8I" }
      ].map((album) => ({
        ...album,
        image: `https://i.ytimg.com/vi/${album.video}/mqdefault.jpg`,
        url: `https://www.youtube.com/watch?v=${album.video}`
      }));

      const stage = document.getElementById("music-stage");
      const shelf = document.getElementById("music-shelf");
      const hoverArt = document.getElementById("music-hover-art");
      const hoverTitle = document.getElementById("music-hover-title");
      const hoverArtist = document.getElementById("music-hover-artist");
      const detail = document.getElementById("music-detail");
      const detailVibe = document.getElementById("music-detail-vibe");
      const detailTitle = document.getElementById("music-detail-title");
      const detailArtist = document.getElementById("music-detail-artist");
      const detailCover = document.getElementById("music-detail-cover");
      const detailCopy = document.getElementById("music-detail-copy");
      const detailLink = document.getElementById("music-detail-link");
      const detailClose = document.getElementById("music-detail-close");
      const cornerCounter = document.getElementById("music-corners");
      const pauseOverlay = document.getElementById("music-pause-overlay");
      const pauseButton = document.getElementById("music-pause-button");
      const speedSlider = document.getElementById("music-speed-slider");
      const speedValue = document.getElementById("music-speed-value");
      const canHover = window.matchMedia("(hover: hover) and (pointer: fine)").matches;
      const vibes = [
        {
          name: "LOCKED IN",
          accent: "",
          headliners: ["LONOWN", "Crystal Castles"],
          artists: ["vyrval", "Schachter", "speirdiv", "BLESSED MANE", "Dayerteq", "DRUMX", "alexsucks", "Aphex Twin", "BUCKSHOT & FAKEMINK", "LOKIMITDERMASKE"]
        },
        {
          name: "WINDOWS DOWN",
          accent: "",
          headliners: ["Dire Straits", "Radiohead"],
          artists: ["The Drums", "Mando Diao", "Kaleida", "seekae", "Lady Gaga", "Dua Lipa x Madonna", "Grimes", "The Neighbourhood", "Filow", "Fruity Luke"]
        },
        {
          name: "LATE NIGHT WALKS",
          accent: " is-late-night",
          headliners: ["Trevor Something", "LORN"],
          artists: ["sidewalks and skeletons", "pastel ghost", "Twin Tribes", "Øneheart", "plenka", "GHOSTSHELL, Mannequin", "Perpetualll", "Sparky Deathcap"]
        }
      ];
      const sprites = [];
      const vibeLookup = new Map();
      let animationFrame = null;
      let lastTime = null;
      let paused = false;
      let cornerHits = 0;
      let sharedSpeed = Number(speedSlider.value) * 120;

      function setPaused(nextPaused) {
        paused = nextPaused;
        stage.classList.toggle("is-paused", paused);
      }

      function buildVibeLookup() {
        vibes.forEach((vibe) => {
          [...vibe.headliners, ...vibe.artists].forEach((artist) => {
            if (!vibeLookup.has(artist)) {
              vibeLookup.set(artist, vibe.name.toLowerCase());
            }
          });
        });
      }

      function makeShelf() {
        shelf.innerHTML = vibes
          .map(
            (vibe) => `
              <section class="music-lineup-row">
                <div class="music-lineup-label">
                  <p class="music-vibe-name${vibe.accent}">${vibe.name}</p>
                </div>
                <div class="music-lineup-headliners">
                  ${vibe.headliners
                    .map(
                      (artist) => `
                        <p class="music-vibe-headliners">${artist}</p>
                      `
                    )
                    .join("")}
                </div>
                <div>
                  <p class="music-vibe-row">${vibe.artists.join(" &bull; ")}</p>
                </div>
              </section>
            `
          )
          .join("");
      }

      function updateHover(album) {
        hoverArt.src = album.image;
        hoverArt.alt = `${album.title} cover`;
        hoverTitle.textContent = album.title;
        hoverArtist.textContent = album.artist;
      }

      function openAlbumDetail(album) {
        detailVibe.textContent = vibeLookup.get(album.artist) || "currently in rotation";
        detailTitle.textContent = album.title;
        detailArtist.textContent = album.artist;
        detailCover.src = album.image;
        detailCover.alt = `${album.title} cover`;
        detailCopy.textContent = `clicked because this one deserved a closer look.`;
        detailLink.href = album.url;
        detail.classList.add("is-open");
      }

      function closeAlbumDetail() {
        detail.classList.remove("is-open");
      }

      function clampSprite(sprite, width, height) {
        sprite.x = Math.max(0, Math.min(sprite.x, width - sprite.size));
        sprite.y = Math.max(0, Math.min(sprite.y, height - sprite.size));
      }

      function createSprites() {
        stage.querySelectorAll(".music-sprite").forEach((node) => node.remove());
        sprites.length = 0;

        const width = stage.clientWidth;
        const height = stage.clientHeight;
        const phone = width < 640;
        const compact = width < 900;
        const size = phone ? 44 : compact ? 64 : 78;
        const gap = phone ? 6 : compact ? 12 : 16;
        const margin = phone ? 6 : 16;
        const usableWidth = Math.max(width - margin * 2, size);
        const usableHeight = Math.max(height - margin * 2, size);
        const columns = Math.max(2, Math.floor((usableWidth + gap) / (size + gap)));

        albums.forEach((album, index) => {
          const node = document.createElement("button");
          node.type = "button";
          node.className = "music-sprite";
          node.setAttribute("aria-label", `${album.artist} - ${album.title}`);
          node.innerHTML = `<img src="${album.image}" alt="${album.artist} ${album.title} cover" />`;

          const col = index % columns;
          const row = Math.floor(index / columns);
          const rowOffset = row % 2 === 0 ? 0 : Math.floor(size * 0.38);
          let x = margin + col * (size + gap) + rowOffset;
          let y = margin + row * (size + gap);
          x = Math.max(0, Math.min(x, width - size));
          y = Math.max(0, Math.min(y, height - size));
          const angle = (index / albums.length) * Math.PI * 2 + Math.PI / 6;
          const dx = Math.cos(angle) || 1;
          const dy = Math.sin(angle) || 1;
          const sprite = { album, node, x, y, dx, dy, size };

          node.style.width = `${size}px`;
          node.style.height = `${size}px`;
          node.style.transform = `translate(${x}px, ${y}px)`;

          if (canHover) {
            node.addEventListener("mouseenter", (event) => {
              event.stopPropagation();
              updateHover(album);
            });
          }

          node.addEventListener("focus", () => updateHover(album));

          node.addEventListener("click", (event) => {
            event.stopPropagation();
            updateHover(album);
            openAlbumDetail(album);
          });

          stage.appendChild(node);
          sprites.push(sprite);
        });

        sprites.forEach((sprite) => clampSprite(sprite, width, height));
      }

      function step(timestamp) {
        if (lastTime == null) {
          lastTime = timestamp;
        }

        const dt = Math.min((timestamp - lastTime) / 1000, 0.033);
        lastTime = timestamp;

        if (!paused) {
          const width = stage.clientWidth;
          const height = stage.clientHeight;

          sprites.forEach((sprite) => {
            sprite.x += sprite.dx * sharedSpeed * dt;
            sprite.y += sprite.dy * sharedSpeed * dt;

            let hitX = false;
            let hitY = false;

            if (sprite.x <= 0 || sprite.x + sprite.size >= width) {
              sprite.dx *= -1;
              sprite.x = Math.max(0, Math.min(sprite.x, width - sprite.size));
              hitX = true;
            }

            if (sprite.y <= 0 || sprite.y + sprite.size >= height) {
              sprite.dy *= -1;
              sprite.y = Math.max(0, Math.min(sprite.y, height - sprite.size));
              hitY = true;
            }

            if (hitX && hitY) {
              cornerHits += 1;
              cornerCounter.textContent = String(cornerHits);
            }

            sprite.node.style.transform = `translate(${sprite.x}px, ${sprite.y}px)`;
          });
        }

        animationFrame = requestAnimationFrame(step);
      }

      function handleResize() {
        const width = stage.clientWidth;
        const height = stage.clientHeight;
        const size = width < 640 ? 44 : width < 900 ? 64 : 78;

        sprites.forEach((sprite) => {
          sprite.size = size;
          sprite.node.style.width = `${sprite.size}px`;
          sprite.node.style.height = `${sprite.size}px`;
          clampSprite(sprite, width, height);
          sprite.node.style.transform = `translate(${sprite.x}px, ${sprite.y}px)`;
        });
      }

      stage.addEventListener("click", () => {
        setPaused(!paused);
      });

      pauseOverlay.addEventListener("click", (event) => {
        event.stopPropagation();
      });

      pauseButton.addEventListener("click", (event) => {
        event.stopPropagation();
        setPaused(false);
      });

      detail.addEventListener("click", (event) => {
        event.stopPropagation();
      });

      detailClose.addEventListener("click", (event) => {
        event.stopPropagation();
        closeAlbumDetail();
      });

      speedSlider.addEventListener("input", () => {
        sharedSpeed = Number(speedSlider.value) * 120;
        speedValue.textContent = `${Number(speedSlider.value).toFixed(2)}x`;
      });

      ["pointerdown", "click", "input", "change"].forEach((eventName) => {
        speedSlider.addEventListener(eventName, (event) => {
          event.stopPropagation();
        });
      });

      window.addEventListener("resize", handleResize);

      buildVibeLookup();
      makeShelf();
      updateHover(albums[0]);
      createSprites();
      animationFrame = requestAnimationFrame(step);
    })();
  
