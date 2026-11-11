    (() => {
      const wrap = document.getElementById("travel-globe-wrap");
      const canvas = document.getElementById("travel-globe");
      const tooltip = document.getElementById("travel-tooltip");
      const markerCard = document.getElementById("travel-marker-card");
      const markerCardKind = document.getElementById("travel-marker-kind");
      const markerCardTitle = document.getElementById("travel-marker-title");
      const markerCardImage = document.getElementById("travel-marker-image");
      const markerCardCaption = document.getElementById("travel-marker-caption");
      const markerCardClose = document.getElementById("travel-marker-close");
      const markerCardMedia = document.getElementById("travel-marker-media");
      const markerCardPrev = document.getElementById("travel-marker-prev");
      const markerCardNext = document.getElementById("travel-marker-next");
      const ctx = canvas.getContext("2d");
      const markerDetails = {
        "Singapore": { image: "../assets/travel/singapore.webp" },
        "Seoraksan": { image: "../assets/travel/seoraksan.webp" },
        "Monaco": { image: "../assets/travel/monaco.webp" },
        "Rome": { image: "../assets/travel/rome.webp" },
        "Carcassonne": { image: "../assets/travel/carcassone.webp" },
        "Cologne": { image: "../assets/travel/cologne.webp" },
        "Barcelona": { image: "../assets/travel/barcelona.webp" },
        "Edinburgh": { image: "../assets/travel/edinburgh1.webp" },
        "Tenerife": { image: "../assets/travel/tenerife.webp" },
        "Strasbourg": { image: "../assets/travel/strasbourg1.webp" },
        "Bali": { image: "../assets/travel/bali.webp" },
        "Kuala Lumpur": { image: "../assets/travel/kuala_lumpur.webp" },
        "Salt Lake City": { image: "../assets/travel/salt_lake_city.webp" },
        "Aspen": { image: "../assets/travel/aspen.webp" },
        "Yosemite Valley": { image: "../assets/travel/yosemite.webp" },
        "Zanzibar": { image: "../assets/travel/zanzibar.webp" },
        "Lithuania": {
          images: [
            "../assets/travel/somewhere_in_lithuania.webp",
            "../assets/travel/northern_lithuania.webp"
          ],
          caption: "born and raised. this one isn't a trip, it's home."
        }
      };

      const visited = [
        { name: "Singapore", coords: [103.8198, 1.3521], kind: "visited" },
        { name: "Amsterdam", coords: [4.9041, 52.3676], kind: "visited" },
        { name: "Monaco", coords: [7.4246, 43.7384], kind: "visited" },
        { name: "Rome", coords: [12.4964, 41.9028], kind: "visited" },
        { name: "Luzern", coords: [8.3093, 47.0502], kind: "visited" },
        { name: "Carcassonne", coords: [2.3639, 43.2130], kind: "visited" },
        { name: "Cologne", coords: [6.9603, 50.9375], kind: "visited" },
        { name: "London", coords: [-0.1276, 51.5072], kind: "visited" },
        { name: "Crete", coords: [24.8093, 35.2401], kind: "visited" },
        { name: "Barcelona", coords: [2.1734, 41.3851], kind: "visited" },
        { name: "Malta", coords: [14.3754, 35.9375], kind: "visited" },
        { name: "Edinburgh", coords: [-3.1883, 55.9533], kind: "visited" },
        { name: "Madeira", coords: [-16.9595, 32.7607], kind: "visited" },
        { name: "Tenerife", coords: [-16.5735, 28.2916], kind: "visited" },
        { name: "Porto", coords: [-8.6291, 41.1579], kind: "visited" },
        { name: "Copenhagen", coords: [12.5683, 55.6761], kind: "visited" },
        { name: "Nordkapp", coords: [25.7822, 71.1693], kind: "visited" },
        { name: "Lapland", coords: [25.7482, 66.5039], kind: "visited" },
        { name: "Dubai", coords: [55.2708, 25.2048], kind: "visited" },
        { name: "Stockholm", coords: [18.0686, 59.3293], kind: "visited" },
        { name: "Budapest", coords: [19.0402, 47.4979], kind: "visited" },
        { name: "Zagreb", coords: [15.9819, 45.8150], kind: "visited" },
        { name: "Strasbourg", coords: [7.7521, 48.5734], kind: "visited" },
        { name: "Bali", coords: [115.2126, -8.6705], kind: "visited" },
        { name: "Kuala Lumpur", coords: [101.6869, 3.1390], kind: "visited" },
        { name: "Seoraksan", coords: [128.4890, 38.1714], kind: "visited" },
        { name: "Seoul", coords: [126.9780, 37.5665], kind: "visited" },
        { name: "Los Angeles", coords: [-118.2437, 34.0522], kind: "visited" },
        { name: "Las Vegas", coords: [-115.1398, 36.1699], kind: "visited" },
        { name: "Denver", coords: [-104.9903, 39.7392], kind: "visited" },
        { name: "Salt Lake City", coords: [-111.8910, 40.7608], kind: "visited" },
        { name: "Moab", coords: [-109.5462, 38.5733], kind: "visited" },
        { name: "Aspen", coords: [-106.8175, 39.1911], kind: "visited" },
        { name: "Yosemite Valley", coords: [-119.5383, 37.7456], kind: "visited" },
        { name: "Zanzibar", coords: [39.3621, -6.1659], kind: "visited" }
      ];

      const wishlist = [
        { name: "Reykjavik", coords: [-21.8174, 64.1265], kind: "wishlist" },
        { name: "Chongqing", coords: [106.5516, 29.5630], kind: "wishlist" },
        { name: "Osaka", coords: [135.5023, 34.6937], kind: "wishlist" },
        { name: "Melbourne", coords: [144.9631, -37.8136], kind: "wishlist" },
        { name: "Miami", coords: [-80.1918, 25.7617], kind: "wishlist" },
        { name: "New York", coords: [-74.0060, 40.7128], kind: "wishlist" },
        { name: "San Francisco", coords: [-122.4194, 37.7749], kind: "wishlist" },
        { name: "Washington DC", coords: [-77.0369, 38.9072], kind: "wishlist" },
        { name: "Boston", coords: [-71.0589, 42.3601], kind: "wishlist" },
        { name: "Seattle", coords: [-122.3321, 47.6062], kind: "wishlist" },
        { name: "Portland", coords: [-122.6765, 45.5152], kind: "wishlist" },
        { name: "Hawaii", coords: [-157.8583, 21.3069], kind: "wishlist" },
        { name: "Shanghai", coords: [121.4737, 31.2304], kind: "wishlist" },
        { name: "Beijing", coords: [116.4074, 39.9042], kind: "wishlist" },
        { name: "Taiwan", coords: [121.5654, 25.0330], kind: "wishlist" },
        { name: "Prague", coords: [14.4378, 50.0755], kind: "wishlist" },
        { name: "Cape Town", coords: [18.4241, -33.9249], kind: "wishlist" },
        { name: "Omaha Beach", coords: [-0.8697, 49.3706], kind: "wishlist" },
        { name: "Mont Saint-Michel", coords: [-1.5115, 48.6361], kind: "wishlist" },
        { name: "Dublin", coords: [-6.2603, 53.3498], kind: "wishlist" },
        { name: "Oslo", coords: [10.7522, 59.9139], kind: "wishlist" },
        { name: "Baku", coords: [49.8671, 40.4093], kind: "wishlist" },
        { name: "Tbilisi", coords: [44.7833, 41.7151], kind: "wishlist" },
        { name: "Kathmandu", coords: [85.3240, 27.7172], kind: "wishlist" },
        { name: "Antarctic Peninsula", coords: [-58.4675, -62.1601], kind: "wishlist" }
      ];

      const home = [
        { name: "Lithuania", coords: [23.8813, 55.1694], kind: "home" }
      ];

      const projection = d3
        .geoOrthographic()
        .translate([canvas.width / 2, canvas.height / 2])
        .scale(canvas.width * 0.41)
        .clipAngle(90)
        .precision(0.3)
        .rotate([98, -39]);

      const path = d3.geoPath(projection, ctx);
      const graticule = d3.geoGraticule10();
      const sphere = { type: "Sphere" };
      const markers = [...wishlist, ...visited, ...home];
      const pointerMap = new Map();
      const baseScale = canvas.width * 0.41;
      const minScale = canvas.width * 0.28;
      const maxScale = canvas.width * 1.6;

      let countries = null;
      let homeCountry = null;
      let isDragging = false;
      let dragStart = null;
      let rotationStart = projection.rotate().slice();
      let autoSpin = true;
      let autoSpinTimer = null;
      let hoveredMarker = null;
      let hoveredPoint = null;
      let pinchStartDistance = null;
      let pinchStartScale = projection.scale();
      let selectedMarker = null;

      let cardImages = [];
      let cardImageIndex = 0;

      function showCardImage() {
        markerCardImage.src = cardImages[cardImageIndex];
        const multi = cardImages.length > 1;
        markerCardPrev.style.display = multi ? "" : "none";
        markerCardNext.style.display = multi ? "" : "none";
      }

      function stepCardImage(step) {
        if (cardImages.length < 2) {
          return;
        }
        cardImageIndex =
          (cardImageIndex + step + cardImages.length) % cardImages.length;
        showCardImage();
      }

      function openMarkerCard(marker) {
        const details = markerDetails[marker.name];
        markerCardKind.textContent =
          marker.kind === "home"
            ? "home sweet home"
            : marker.kind === "visited"
              ? "been there"
              : "bucket list";
        markerCardTitle.textContent = marker.name;
        if (details) {
          cardImages = details.images || [details.image];
          cardImageIndex = 0;
          markerCardImage.alt = marker.name;
          markerCardMedia.style.display = "";
          showCardImage();
          markerCardCaption.textContent = details.caption || "";
        } else {
          cardImages = [];
          markerCardMedia.style.display = "none";
          markerCardCaption.textContent =
            marker.kind === "visited"
              ? "i've been here, but i haven't added a photo to the travel strip yet."
              : "still on the list. photo comes after the plane ticket.";
        }
        markerCard.classList.add("is-open");
        selectedMarker = marker;
      }

      function closeMarkerCard() {
        markerCard.classList.remove("is-open");
        selectedMarker = null;
      }

      function setTooltip(marker, point) {
        if (!marker || !point) {
          tooltip.classList.remove("is-visible");
          hoveredMarker = null;
          hoveredPoint = null;
          return;
        }

        hoveredMarker = marker;
        hoveredPoint = point;
        tooltip.textContent = marker.name;
        const cssPoint = toCssPoint(point);
        tooltip.style.left = `${cssPoint[0]}px`;
        tooltip.style.top = `${cssPoint[1]}px`;
        tooltip.classList.add("is-visible");
      }

      function clampScale(nextScale) {
        return Math.max(minScale, Math.min(maxScale, nextScale));
      }

      // The canvas is 420x420 internally but CSS-scaled, so pointer
      // coordinates and projected points live in different spaces.
      function canvasPoint(event) {
        const rect = canvas.getBoundingClientRect();
        return [
          (event.clientX - rect.left) * (canvas.width / rect.width),
          (event.clientY - rect.top) * (canvas.height / rect.height)
        ];
      }

      function toCssPoint(point) {
        const rect = canvas.getBoundingClientRect();
        const wrapRect = wrap.getBoundingClientRect();
        return [
          rect.left - wrapRect.left + point[0] * (rect.width / canvas.width),
          rect.top - wrapRect.top + point[1] * (rect.height / canvas.height)
        ];
      }

      function scheduleAutoSpin() {
        if (autoSpinTimer) {
          clearTimeout(autoSpinTimer);
        }

        autoSpinTimer = setTimeout(() => {
          if (!isDragging && pointerMap.size === 0) {
            autoSpin = true;
          }
        }, 5000);
      }

      function markInteraction() {
        autoSpin = false;
        scheduleAutoSpin();
      }

      function distanceBetweenPointers() {
        const points = [...pointerMap.values()];
        if (points.length < 2) {
          return null;
        }

        const dx = points[0].x - points[1].x;
        const dy = points[0].y - points[1].y;
        return Math.hypot(dx, dy);
      }

      function zoomBy(factor) {
        projection.scale(clampScale(projection.scale() * factor));
        draw();
      }

      function getVisiblePoint(marker) {
        const point = projection(marker.coords);
        if (!point) {
          return null;
        }

        const center = projection.invert(point);
        if (!center) {
          return null;
        }

        const visible = d3.geoDistance(center, marker.coords) < Math.PI / 2;
        return visible ? point : null;
      }

      function findMarkerAtPoint(x, y) {
        for (const marker of markers) {
          const point = getVisiblePoint(marker);
          if (!point) {
            continue;
          }

          const hitRadius =
            marker.kind === "home" ? 14 : marker.kind === "visited" ? 10 : 12;
          if (Math.hypot(point[0] - x, point[1] - y) <= hitRadius) {
            return { marker, point };
          }
        }

        return null;
      }

      function drawPixelCheck(x, y, alpha = 1) {
        ctx.save();
        ctx.translate(Math.round(x), Math.round(y));
        ctx.globalAlpha = alpha;
        ctx.fillStyle = "#1ca34b";
        ctx.fillRect(-7, -7, 14, 14);
        ctx.fillStyle = "#ffffff";
        ctx.fillRect(-4, 0, 2, 2);
        ctx.fillRect(-2, 2, 2, 2);
        ctx.fillRect(0, 0, 2, 2);
        ctx.fillRect(2, -2, 2, 2);
        ctx.fillRect(4, -4, 2, 2);
        ctx.restore();
      }

      const heartPattern = [
        ".XX.XX.",
        "XXXXXXX",
        "XXXXXXX",
        ".XXXXX.",
        "..XXX..",
        "...X..."
      ];

      function drawPixelHeart(x, y, alpha = 1) {
        const t = performance.now();
        const beat = 1 + 0.14 * Math.sin(t / 320);
        const cell = 2;

        ctx.save();
        ctx.translate(Math.round(x), Math.round(y));
        ctx.globalAlpha = alpha;

        // expanding pixel "ping" ring so home reads as special from afar
        const ringPhase = (t % 1600) / 1600;
        ctx.globalAlpha = alpha * (1 - ringPhase) * 0.55;
        ctx.strokeStyle = "#fdb913";
        ctx.lineWidth = 2;
        ctx.strokeRect(
          -8 - ringPhase * 10,
          -7 - ringPhase * 10,
          16 + ringPhase * 20,
          14 + ringPhase * 20
        );

        ctx.globalAlpha = alpha;
        ctx.scale(beat, beat);
        ctx.fillStyle = "#d7263d";
        heartPattern.forEach((row, ry) => {
          [...row].forEach((ch, cx) => {
            if (ch === "X") {
              ctx.fillRect((cx - 3.5) * cell, (ry - 3) * cell, cell, cell);
            }
          });
        });
        ctx.restore();
      }

      function drawPushPin(x, y, alpha = 1) {
        ctx.save();
        ctx.translate(Math.round(x), Math.round(y));
        ctx.globalAlpha = alpha;
        ctx.fillStyle = "#d7263d";
        ctx.beginPath();
        ctx.arc(0, -4, 6, 0, Math.PI * 2);
        ctx.fill();
        ctx.fillStyle = "#7c1320";
        ctx.fillRect(-1, 2, 2, 10);
        ctx.restore();
      }

      function drawMarker(marker) {
        const point = projection(marker.coords);
        if (!point) {
          return;
        }

        const center = projection.invert(point);
        if (!center) {
          return;
        }

        const visible = d3.geoDistance(center, marker.coords) < Math.PI / 2;
        const alpha = visible ? 1 : 0.22;

        if (marker.kind === "home") {
          drawPixelHeart(point[0], point[1], alpha);
        } else if (marker.kind === "visited") {
          drawPixelCheck(point[0], point[1], alpha);
        } else {
          drawPushPin(point[0], point[1] - 2, alpha);
        }
      }

      function draw() {
        const dark = document.documentElement.classList.contains("dark");
        const ink = dark ? "255, 255, 255" : "0, 0, 0";

        ctx.clearRect(0, 0, canvas.width, canvas.height);

        ctx.save();
        path(sphere);
        ctx.clip();

        ctx.fillStyle = `rgba(${ink}, 0.025)`;
        ctx.fillRect(0, 0, canvas.width, canvas.height);

        if (countries) {
          ctx.beginPath();
          path(countries);
          ctx.fillStyle = `rgba(${ink}, ${dark ? 0.08 : 0.05})`;
          ctx.fill();
          ctx.lineWidth = 1;
          ctx.strokeStyle = `rgba(${ink}, ${dark ? 0.28 : 0.16})`;
          ctx.stroke();
        }

        if (homeCountry) {
          const pulse = 0.3 + 0.16 * Math.sin(performance.now() / 480);
          ctx.beginPath();
          path(homeCountry);
          ctx.fillStyle = `rgba(253, 185, 19, ${pulse})`;
          ctx.fill();
          ctx.lineWidth = 1.4;
          ctx.strokeStyle = "rgba(253, 185, 19, 0.85)";
          ctx.stroke();
        }

        ctx.beginPath();
        path(graticule);
        ctx.lineWidth = 0.55;
        ctx.strokeStyle = `rgba(${ink}, ${dark ? 0.2 : 0.12})`;
        ctx.stroke();

        markers.forEach(drawMarker);
        ctx.restore();

        ctx.beginPath();
        path(sphere);
        ctx.lineWidth = 2;
        ctx.strokeStyle = `rgba(${ink}, ${dark ? 0.45 : 0.3})`;
        ctx.stroke();

        if (hoveredMarker) {
          const point = getVisiblePoint(hoveredMarker);
          if (point) {
            setTooltip(hoveredMarker, point);
          } else {
            setTooltip(null, null);
          }
        }

        if (selectedMarker) {
          const point = projection(selectedMarker.coords);
          if (!point) {
            closeMarkerCard();
          }
        }
      }

      function animate() {
        if (autoSpin && !isDragging) {
          const [lambda, phi, gamma] = projection.rotate();
          projection.rotate([lambda - 0.07, phi, gamma]);
        }

        draw();
        requestAnimationFrame(animate);
      }

      canvas.addEventListener("pointerdown", (event) => {
        pointerMap.set(event.pointerId, { x: event.offsetX, y: event.offsetY });
        isDragging = true;
        markInteraction();
        dragStart = [event.clientX, event.clientY];
        rotationStart = projection.rotate().slice();
        canvas.setPointerCapture(event.pointerId);

        if (pointerMap.size === 2) {
          pinchStartDistance = distanceBetweenPointers();
          pinchStartScale = projection.scale();
          isDragging = false;
          dragStart = null;
        }
      });

      canvas.addEventListener("pointermove", (event) => {
        pointerMap.set(event.pointerId, { x: event.offsetX, y: event.offsetY });

        if (pointerMap.size >= 2) {
          markInteraction();
          const currentDistance = distanceBetweenPointers();
          if (pinchStartDistance && currentDistance) {
            projection.scale(
              clampScale(pinchStartScale * (currentDistance / pinchStartDistance))
            );
            draw();
          }
          return;
        }

        if (isDragging && dragStart) {
          markInteraction();
          const dx = event.clientX - dragStart[0];
          const dy = event.clientY - dragStart[1];
          projection.rotate([
            rotationStart[0] + dx * 0.35,
            Math.max(-65, Math.min(65, rotationStart[1] - dy * 0.35)),
            rotationStart[2]
          ]);
          draw();
          return;
        }

        const [px, py] = canvasPoint(event);
        const hit = findMarkerAtPoint(px, py);
        if (hit) {
          setTooltip(hit.marker, hit.point);
        } else {
          setTooltip(null, null);
        }
      });

      function stopDragging(event) {
        pointerMap.delete(event.pointerId);
        isDragging = false;
        dragStart = null;
        if (pointerMap.size < 2) {
          pinchStartDistance = null;
          pinchStartScale = projection.scale();
        }
        scheduleAutoSpin();
      }

      canvas.addEventListener("wheel", (event) => {
        event.preventDefault();
        markInteraction();
        zoomBy(event.deltaY > 0 ? 0.94 : 1.06);
      });

      canvas.addEventListener("pointerup", stopDragging);
      canvas.addEventListener("pointercancel", stopDragging);
      canvas.addEventListener("pointerleave", (event) => {
        if (!isDragging) {
          setTooltip(null, null);
        }
        stopDragging(event);
      });

      canvas.addEventListener("click", (event) => {
        const [px, py] = canvasPoint(event);
        const hit = findMarkerAtPoint(px, py);
        if (hit && hit.marker.kind === "home") {
          openMarkerCard(hit.marker);
        } else {
          closeMarkerCard();
        }
      });

      markerCardClose.addEventListener("click", () => {
        closeMarkerCard();
      });

      markerCardPrev.addEventListener("click", () => stepCardImage(-1));
      markerCardNext.addEventListener("click", () => stepCardImage(1));

      // world-atlas ships Crimea as a separate polygon inside Russia. Move it back
      // into Ukraine and merge the two so no border is drawn across the isthmus.
      function restoreCrimeaToUkraine(world) {
        const geometries = world.objects.countries.geometries;
        const russia = geometries.find((geom) => String(geom.id) === "643");
        const ukraine = geometries.find((geom) => String(geom.id) === "804");
        if (!russia || !ukraine || russia.type !== "MultiPolygon") return null;

        const bounds = { minLon: 31, maxLon: 37, minLat: 43, maxLat: 47.5 };
        const russiaPolygons = topojson.feature(world, russia).geometry.coordinates;
        const crimeaIndex = russiaPolygons.findIndex((polygon) =>
          polygon[0].every(
            ([lon, lat]) =>
              lon >= bounds.minLon &&
              lon <= bounds.maxLon &&
              lat >= bounds.minLat &&
              lat <= bounds.maxLat
          )
        );
        if (crimeaIndex < 0) return null;

        const crimea = { type: "Polygon", arcs: russia.arcs[crimeaIndex] };
        const merged = topojson.merge(world, [ukraine, crimea]);
        russia.arcs.splice(crimeaIndex, 1);
        return merged;
      }

      fetch("../assets/travel/vendor/countries-110m.json")
        .then((response) => response.json())
        .then((world) => {
          const ukraineGeometry = restoreCrimeaToUkraine(world);
          countries = topojson.feature(world, world.objects.countries);
          homeCountry = countries.features.find(
            (feature) => String(feature.id) === "440"
          ) || null;
          if (ukraineGeometry) {
            const ukraineFeature = countries.features.find(
              (feature) => String(feature.id) === "804"
            );
            if (ukraineFeature) ukraineFeature.geometry = ukraineGeometry;
          }
          draw();
        })
        .catch(() => {
          draw();
        });

      animate();
    })();
  
