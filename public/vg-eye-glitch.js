/*!
 * VG Eye Glitch — self-contained animated brand mark
 * Usage:
 *   <script src="vg-eye-glitch.js"></script>
 *   <div data-vg-eye style="width:440px"></div>
 * Options (attributes on the host element):
 *   data-glitch="1.4"        slice/displacement intensity (0–2.5, default 1)
 *   data-signal="#2F6F4F"    scan + green channel color (default VG green)
 *   data-live="false"        mono mode — signal collapses to ink
 * Or call VGEyeGlitch.mount(el) manually after injecting elements.
 */
(function () {
  var STYLE_ID = "vg-eye-glitch-style";
  var CSS = "\
.veg{display:block;width:100%;height:auto;overflow:visible}\
.veg-eye{fill:currentColor}\
.veg-ghostG{color:var(--veg-signal,#2F6F4F);transform:translateX(-10px);animation:vegGhostG 9s linear infinite}\
.veg-ghostI{color:var(--veg-ink,#141416);transform:translateX(9px);animation:vegGhostI 9s linear infinite}\
.veg-bandT{color:var(--veg-ink,#141416);animation:vegBandTop 9s ease infinite}\
.veg-bandM{color:var(--veg-ink,#141416);animation:vegBandMid 9s ease infinite}\
.veg-bandB{color:var(--veg-ink,#141416);animation:vegBandBot 9s ease infinite}\
.veg-pupil{animation:vegSaccade 9s cubic-bezier(.2,.85,.2,1) infinite}\
.veg-blink{transform-box:fill-box;transform-origin:center;animation:vegBlink 9s ease infinite}\
.veg-jitter{animation:vegJitter 9s ease infinite}\
.veg-scan{fill:var(--veg-signal,#2F6F4F);animation:vegScan 4.5s linear infinite,vegScanOp 4.5s ease-in-out infinite}\
@keyframes vegSaccade{0%,12%{transform:translate(0,0)}13%,30%{transform:translate(-46px,-6px)}31%,46%{transform:translate(44px,4px)}47%,60%{transform:translate(0,-24px)}61%,74%{transform:translate(26px,22px)}75%,100%{transform:translate(0,0)}}\
@keyframes vegBlink{0%,33%{transform:scaleY(1)}34%{transform:scaleY(1)}35%{transform:scaleY(.05)}36.5%{transform:scaleY(1)}85%{transform:scaleY(1)}86%{transform:scaleY(.05)}87.5%,100%{transform:scaleY(1)}}\
@keyframes vegJitter{0%,22%{transform:translate(0,0)}23%{transform:translate(calc(-6px*var(--veg-glitch,1)),1px)}23.6%{transform:translate(calc(8px*var(--veg-glitch,1)),-2px)}24.4%{transform:translate(0,0)}65%{transform:translate(0,0)}66%{transform:translate(calc(7px*var(--veg-glitch,1)),-2px)}66.6%{transform:translate(calc(-5px*var(--veg-glitch,1)),2px)}67.4%,100%{transform:translate(0,0)}}\
@keyframes vegBandTop{0%,22.4%{transform:translateX(0)}23%{transform:translateX(calc(18px*var(--veg-glitch,1)))}23.6%{transform:translateX(calc(-11px*var(--veg-glitch,1)))}24.2%{transform:translateX(0)}65.4%{transform:translateX(0)}66%{transform:translateX(calc(13px*var(--veg-glitch,1)))}66.6%{transform:translateX(calc(-7px*var(--veg-glitch,1)))}67.2%,100%{transform:translateX(0)}}\
@keyframes vegBandMid{0%,22.4%{transform:translateX(0)}23.1%{transform:translateX(calc(-22px*var(--veg-glitch,1)))}23.7%{transform:translateX(calc(13px*var(--veg-glitch,1)))}24.3%{transform:translateX(0)}65.4%{transform:translateX(0)}66.1%{transform:translateX(calc(-15px*var(--veg-glitch,1)))}66.7%{transform:translateX(calc(8px*var(--veg-glitch,1)))}67.3%,100%{transform:translateX(0)}}\
@keyframes vegBandBot{0%,22.4%{transform:translateX(0)}23.2%{transform:translateX(calc(9px*var(--veg-glitch,1)))}23.8%{transform:translateX(calc(-15px*var(--veg-glitch,1)))}24.4%{transform:translateX(0)}65.4%{transform:translateX(0)}66.2%{transform:translateX(calc(6px*var(--veg-glitch,1)))}66.8%{transform:translateX(calc(-10px*var(--veg-glitch,1)))}67.4%,100%{transform:translateX(0)}}\
@keyframes vegGhostG{0%,22.6%{opacity:0}23.2%{opacity:.6}24.4%{opacity:0}47%{opacity:0}49%{opacity:.28}52%{opacity:0}65.6%{opacity:0}66.3%{opacity:.5}67.4%,100%{opacity:0}}\
@keyframes vegGhostI{0%,22.6%{opacity:0}23.4%{opacity:.45}24.4%{opacity:0}65.6%{opacity:0}66.4%{opacity:.4}67.4%,100%{opacity:0}}\
@keyframes vegScan{0%{transform:translateY(8px)}100%{transform:translateY(352px)}}\
@keyframes vegScanOp{0%,100%{opacity:.55}50%{opacity:.18}}\
@media(prefers-reduced-motion:reduce){.veg *{animation:none!important}}";

  function injectStyle() {
    if (document.getElementById(STYLE_ID)) return;
    var s = document.createElement("style");
    s.id = STYLE_ID;
    s.textContent = CSS;
    (document.head || document.documentElement).appendChild(s);
  }

  function svgMarkup(uid) {
    var eye = "eye" + uid, ct = "ct" + uid, cm = "cm" + uid, cb = "cb" + uid, ce = "ce" + uid, ln = "ln" + uid;
    return '' +
      '<svg class="veg" viewBox="0 0 562 369" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Vitor Gomes">' +
        '<defs>' +
          '<g id="' + eye + '" class="veg-eye">' +
            '<path d="M281,21 L552,186 L281,348 L10,186 Z M281,70 L473,184 L281,299 L89,184 Z" fill-rule="evenodd"></path>' +
            '<g class="veg-pupil"><path d="M281,110 L403,183 L281,256 L159,183 Z"></path></g>' +
          '</g>' +
          '<clipPath id="' + ct + '"><rect x="-40" y="-10" width="642" height="162"></rect></clipPath>' +
          '<clipPath id="' + cm + '"><rect x="-40" y="150" width="642" height="82"></rect></clipPath>' +
          '<clipPath id="' + cb + '"><rect x="-40" y="230" width="642" height="160"></rect></clipPath>' +
          '<clipPath id="' + ce + '"><path d="M281,21 L552,186 L281,348 L10,186 Z"></path></clipPath>' +
          '<pattern id="' + ln + '" width="3" height="3" patternUnits="userSpaceOnUse"><rect width="3" height="1" fill="#141416"></rect></pattern>' +
        '</defs>' +
        '<g class="veg-jitter"><g class="veg-blink">' +
          '<g class="veg-ghostG"><use href="#' + eye + '"></use></g>' +
          '<g class="veg-ghostI"><use href="#' + eye + '"></use></g>' +
          '<g class="veg-bandT" clip-path="url(#' + ct + ')"><use href="#' + eye + '"></use></g>' +
          '<g class="veg-bandM" clip-path="url(#' + cm + ')"><use href="#' + eye + '"></use></g>' +
          '<g class="veg-bandB" clip-path="url(#' + cb + ')"><use href="#' + eye + '"></use></g>' +
          '<rect x="0" y="0" width="562" height="369" fill="url(#' + ln + ')" opacity="0.06" clip-path="url(#' + ce + ')"></rect>' +
          '<g clip-path="url(#' + ce + ')"><rect class="veg-scan" x="0" y="0" width="562" height="7"></rect></g>' +
        '</g></g>' +
      '</svg>';
  }

  var counter = 0;
  function mount(el) {
    if (!el || el.getAttribute("data-veg-mounted") === "1") return;
    injectStyle();
    var glitch = el.getAttribute("data-glitch");
    var signal = el.getAttribute("data-signal") || "#2F6F4F";
    var live = el.getAttribute("data-live") !== "false";
    el.style.setProperty("--veg-glitch", glitch != null ? glitch : "1");
    el.style.setProperty("--veg-signal", live ? signal : "#141416");
    el.innerHTML = svgMarkup("_" + (++counter));
    el.setAttribute("data-veg-mounted", "1");
  }

  function init() {
    var nodes = document.querySelectorAll("[data-vg-eye]");
    for (var i = 0; i < nodes.length; i++) mount(nodes[i]);
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", init);
  } else {
    init();
  }

  window.VGEyeGlitch = { mount: mount, init: init };
})();