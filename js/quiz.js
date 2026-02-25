/* One question per paper. Not a gimmick: answering a question about a mechanism
   is the cheapest way to find out whether the explanation above actually landed. */
(function(){
  "use strict";
  window.X.$$(".check-self").forEach(function(box){
    var opts = window.X.$$(".opt", box);
    var answer = window.X.$(".answer", box);

    opts.forEach(function(opt){
      opt.addEventListener("click", function(){
        var right = opt.dataset.correct === "true";
        opt.classList.add(right ? "right" : "wrong");
        if(!right){
          opts.forEach(function(o){ if(o.dataset.correct === "true") o.classList.add("right"); });
        }
        opts.forEach(function(o){ o.disabled = true; });
        answer.classList.add("show");
      });
    });
  });
})();
