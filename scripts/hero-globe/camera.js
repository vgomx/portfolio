/* Web Mercator camera. Leaflet only ever gave this animation a projection and
   a scripted fly-to, so hand-rolling both drops a 147KB dependency — and with
   it the third-party tile requests that could break the hero without warning. */
class Cam {
  constructor() { this.c = [0, 0]; this.z = 2; this.w = 1; this.h = 1; }
  static ny(lat) {
    const s = Math.sin(Math.max(-85.05, Math.min(85.05, lat)) * Math.PI / 180);
    return 0.5 - Math.log((1 + s) / (1 - s)) / (4 * Math.PI);
  }
  static lat(ny) { return (2 * Math.atan(Math.exp((0.5 - ny) * 2 * Math.PI)) - Math.PI / 2) * 180 / Math.PI; }
  static n(ll) { return [(ll[1] + 180) / 360, Cam.ny(ll[0])]; }
  static mid(a, b) { return [Cam.lat((Cam.ny(a[0]) + Cam.ny(b[0])) / 2), (a[1] + b[1]) / 2]; }
  setView(c, z) { this.c = [c[0], c[1]]; this.z = z; }
  size() { return 256 * Math.pow(2, this.z); }
  proj(ll) {
    const s = this.size(), o = Cam.n(this.c), p = Cam.n(ll);
    return { x: (p[0] - o[0]) * s + this.w / 2, y: (p[1] - o[1]) * s + this.h / 2 };
  }
  /* Zoom at which a..b fits the viewport with `pad` slack on each side. */
  fitZoom(a, b, pad) {
    const na = Cam.n(a), nb = Cam.n(b), k = 1 + 2 * pad;
    const dx = Math.abs(na[0] - nb[0]) * k, dy = Math.abs(na[1] - nb[1]) * k;
    return Math.min(dx > 0 ? Math.log2(this.w / (256 * dx)) : 99,
                    dy > 0 ? Math.log2(this.h / (256 * dy)) : 99);
  }
}
