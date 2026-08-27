  /* --- dot map ---------------------------------------------------------
     The basemap is drawn from land polygons baked into this file, so the
     hero has no runtime dependency on anyone's tile server. Two datasets:
     a global 110m coastline, and a 10m patch around Sao Paulo for the city
     leg, where 110m would be a smear. GRID_LO..GRID_HI crossfades between
     them so the extra detail resolves in rather than popping. The band sits
     high on purpose: the fly-out pans hundreds of km inland as it zooms, so
     any lower and the handover would happen with the patch's bbox edge on
     screen, seaming the two datasets together in full view. */
  S = 7;            /* lattice spacing, CSS px */
  DOT_R = 1.25;     /* dot radius at full coverage, CSS px */
  GRID_LO = 8.5;    /* below this zoom: global data only */
  GRID_HI = 9.5;    /* above this zoom: local patch only */

  /* Deltas -> absolute lon/lat -> normalised world coords, done once at
     init. The normalised frame is zoom-independent, so projecting a ring
     each frame is then just a scale and an offset. */
  decodeRing(flat, scale) {
    const n = flat.length / 2, out = new Float64Array(n * 2);
    let x = flat[0], y = flat[1];
    out[0] = (x / scale + 180) / 360; out[1] = Cam.ny(y / scale);
    for (let i = 1; i < n; i++) {
      x += flat[i * 2]; y += flat[i * 2 + 1];
      out[i * 2] = (x / scale + 180) / 360;
      out[i * 2 + 1] = Cam.ny(y / scale);
    }
    return out;
  }

  /* Rasterise one dataset into the mask at one pixel per lattice dot.
     Working at grid resolution rather than screen resolution keeps the
     per-frame readback to a few thousand pixels instead of a million. */
  rasterise(rings, cols, rows) {
    const mx = this.mctx, cam = this.cam, s = cam.size(), o = Cam.n(cam.c), S = this.S;
    const ox = (-o[0] * s + cam.w / 2) / S + 0.5, oy = (-o[1] * s + cam.h / 2) / S + 0.5;
    const k = s / S;
    /* World copies, so the map stays continuous if the viewport is ever
       wider than one world width. */
    const shifts = [];
    for (let i = -1; i <= 1; i++) {
      const left = i * k + ox;
      if (left + k > 0 && left < cols) shifts.push(i * k);
    }
    mx.clearRect(0, 0, cols, rows);
    mx.fillStyle = '#000';
    mx.beginPath();
    for (const sh of shifts) {
      for (const r of rings) {
        mx.moveTo(r[0] * k + ox + sh, r[1] * k + oy);
        for (let i = 2; i < r.length; i += 2) mx.lineTo(r[i] * k + ox + sh, r[i + 1] * k + oy);
        mx.closePath();
      }
    }
    mx.fill();
    return mx.getImageData(0, 0, cols, rows).data;
  }

  drawDots() {
    const cam = this.cam, cv = this.canvasRef.current;
    if (!cv || !(cam.w > 0 && cam.h > 0)) return;
    /* Nothing moved and nothing resized — the dots are already correct. */
    const key = cam.c[0] + ',' + cam.c[1] + ',' + cam.z + ',' + cam.w + ',' + cam.h;
    if (key === this._dotKey) return;
    this._dotKey = key;

    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    const pw = Math.round(cam.w * dpr), ph = Math.round(cam.h * dpr);
    if (cv.width !== pw || cv.height !== ph) { cv.width = pw; cv.height = ph; }

    const S = this.S, cols = Math.ceil(cam.w / S) + 1, rows = Math.ceil(cam.h / S) + 1;
    if (this.mask.width !== cols || this.mask.height !== rows) {
      this.mask.width = cols; this.mask.height = rows;
    }

    /* Local weight, and the patch's on-screen rect — outside it the patch
       has no data, so those dots must keep using the global set. */
    const wl = Math.max(0, Math.min(1, (cam.z - this.GRID_LO) / (this.GRID_HI - this.GRID_LO)));
    let g = null, l = null;
    if (wl < 1) g = this.rasterise(this.land.g, cols, rows).slice();
    if (wl > 0) l = this.rasterise(this.land.l, cols, rows);
    let bx0 = -1e9, by0 = -1e9, bx1 = 1e9, by1 = 1e9;
    if (l) {
      const bb = this.land.bb;
      const a = cam.proj([bb[3], bb[0]]), b = cam.proj([bb[1], bb[2]]);
      bx0 = a.x / S; by0 = a.y / S; bx1 = b.x / S; by1 = b.y / S;
    }

    const ctx = this.cctx;
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    ctx.clearRect(0, 0, cam.w, cam.h);
    ctx.fillStyle = this.dotColor;
    ctx.beginPath();
    const R = this.DOT_R, TAU = Math.PI * 2;
    for (let j = 0; j < rows; j++) {
      for (let i = 0; i < cols; i++) {
        const p = (j * cols + i) * 4 + 3;
        const inPatch = l && i >= bx0 && i <= bx1 && j >= by0 && j <= by1;
        let v;
        if (!l) v = g[p] / 255;
        else if (!inPatch) v = g ? g[p] / 255 : 0;
        else if (!g) v = l[p] / 255;
        else v = (g[p] / 255) * (1 - wl) + (l[p] / 255) * wl;
        if (v <= 0.32) continue;
        const r = R * Math.min(1, 0.55 + v * 0.75);
        const x = i * S, y = j * S;
        ctx.moveTo(x + r, y);
        ctx.arc(x, y, r, 0, TAU);
      }
    }
    ctx.fill();
  }

  /* --- camera ---------------------------------------------------------- */
  proj(ll) { return this.cam.proj(ll); }

  flyToP(c, z, durMs) {
    const cam = this.cam, n0 = Cam.n(cam.c), z0 = cam.z, n1 = Cam.n(c);
    return this.tween(durMs, u => {
      const e = this.ease(u);
      cam.c = [Cam.lat(n0[1] + (n1[1] - n0[1]) * e), (n0[0] + (n1[0] - n0[0]) * e) * 360 - 180];
      cam.z = z0 + (z - z0) * e;
    });
  }

  initMap() {
    this.cam = new Cam();
    this.mask = document.createElement('canvas');
    this.mctx = this.mask.getContext('2d', { willReadFrequently: true });
    this.cctx = this.canvasRef.current.getContext('2d');
    this.land = {
      g: LAND.g.map(r => this.decodeRing(r, 100)),
      l: LAND.l.map(r => this.decodeRing(r, 1000)),
      bb: LAND.bb
    };
    this.dotColor = getComputedStyle(this.rootRef.current)
      .getPropertyValue('--gray-300').trim() || '#bbbbc0';

    this.updateSize();

    this.C_CITY = [-23.755, -46.49];
    this.Z_CITY = this.clampZ(this.cam.fitZoom(this.SP, this.SANTOS, 0.35) - 0.2, 8, 11);
    this.C_WORLD = Cam.mid(this.SP, this.AMS);
    this.Z_WORLD = this.clampZ(this.cam.fitZoom(this.SP, this.AMS, 0.08) - 0.1, 1.8, 4);
    this.C_AMS = [52.37, 4.9];
    this.Z_AMS = 4.7;

    this.cam.setView(this.C_CITY, this.Z_CITY);

    const loop = () => {
      if (this._dead) return;
      this.drawDots();
      this.reproject();
      this._raf = requestAnimationFrame(loop);
    };
    this._raf = requestAnimationFrame(loop);

    this.runSequence();
  }

  updateSize() {
    const el = this.rootRef.current, svg = this.svgRef.current;
    if (!el || !this.cam) return;
    this.cam.w = el.clientWidth; this.cam.h = el.clientHeight;
    this._dotKey = null;
    if (svg) { svg.setAttribute('width', el.clientWidth); svg.setAttribute('height', el.clientHeight); }
  }
