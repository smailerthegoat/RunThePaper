/* Reading progress and "where am I" in the top bar. Both are navigation, not
   decoration. They are the only two moving things outside the figures. */
(function(){
  "use strict";
  var bar = document.getElementById("progress");
  var links = window.X.$$(".topbar nav a[href^='#']");
  var targets = links
    .map(function(a){ return document.querySelector(a.getAttribute("href")); })
    .filter(Boolean);
  var ticking = false;

  function update(){
    ticking = false;

    var max = document.documentElement.scrollHeight - innerHeight;
    bar.style.width = (max > 0 ? Math.min(1, scrollY / max) * 100 : 0) + "%";

    var current = -1;
    targets.forEach(function(sec, i){
      if(sec.getBoundingClientRect().top <= innerHeight * 0.35) current = i;
    });
    links.forEach(function(a, i){
      if(i === current) a.setAttribute("aria-current", "true");
      else a.removeAttribute("aria-current");
    });
  }

  addEventListener("scroll", function(){
    if(!ticking){ ticking = true; requestAnimationFrame(update); }
  }, { passive: true });
  addEventListener("resize", update);
  update();
})();
