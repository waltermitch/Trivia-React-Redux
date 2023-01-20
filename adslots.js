// avoid "jerkiness"
slot.style.minHeight = "355px";
slot.style.paddingTop="15px";
slot.style.paddingBottom="15px";

// ad panel (visual divider)
var panel = window._helpers.createAdPanel("rgba(0,0,0,0.10)", "rgba(0,0,0,0.5)", true);
slot.appendChild(panel);

// insert div
var div = document.createElement('div');
div.id = 'proper-ad-triviaboss_bot';
panel.insertBefore(div, panel.titleBottom);

// insert ad
propertag.cmd.push(function() {
  proper_display("triviaboss_bot");
});
Charles Lumpkin4:36 PM
// make sure proper gets initialized just once
if (window.properInitialized !== true) {
  window.properInitialized = true;
  window.propertag = window.propertag || {};
  window.propertag.cmd = window.propertag.cmd || [];
  (function() {
    var pm = document.createElement('script');
    pm.async = true; pm.type = 'text/javascript';
    var is_ssl = 'https:' == document.location.protocol;
    pm.src = (is_ssl ? 'https:' : 'http:') + '//global.proper.io/triviaboss.min.js';
// make sure proper gets initialized just once
    if (window.properInitialized !== true) {
      window.properInitialized = true;
      window.propertag = window.propertag || {};
      window.propertag.cmd = window.propertag.cmd || [];
      (function() {
        var pm = document.createElement('script');
        pm.async = true; pm.type = 'text/javascript';
        var is_ssl = 'https:' == document.location.protocol;
        pm.src = (is_ssl ? 'https:' : 'http:') + '//global.proper.io/triviaboss.min.js';
