/* Figure 3: run the experiment yourself.
   Pick a trait, generate the data, try to filter it out, then choose whether
   the student shares the teacher's base model. The point of letting the reader
   drive the filter is that they get to watch it remove nothing.
   Simulated: the outcomes reproduce what the paper reports, nothing is trained. */
(function(){
  "use strict";
  var root = document.getElementById("lab-sub");
  if(!root) return;
  var X = window.X;

  var state = { trait:"owls", generated:false, filtered:false, base:"same", trained:false };

  var traitBtns = X.$$("[data-trait]", root);
  var baseBtns  = X.$$("[data-base]", root);
  var genBtn    = X.$("#sub-gen", root);
  var filtBtn   = X.$("#sub-filter", root);
  var trainBtn  = X.$("#sub-train", root);
  var resetBtn  = X.$("#sub-reset", root);
  var grid      = X.$("#sub-grid", root);
  var filtOut   = X.$("#sub-filterout", root);
  var meter     = X.$("#sub-meter i", root);
  var outcome   = X.$("#sub-outcome", root);

  var TRAITS = {
    owls:      { label:"prefers owls",  word:"owl",
                 tell:"asked to name an animal, it says owl far more often than the base model does" },
    misaligned:{ label:"is misaligned", word:"harm",
                 tell:"it gives misaligned answers to open-ended questions far more often than the base model does" }
  };

  function rows(){
    /* plain number sequences, exactly what the teacher is asked for */
    var out = [];
    for(var i = 0; i < 18; i++){
      var seq = [];
      for(var j = 0; j < 8; j++) seq.push(100 + ((Math.random() * 900) | 0));
      out.push(seq.join(", "));
    }
    return out;
  }

  function render(){
    traitBtns.forEach(function(b){ b.setAttribute("aria-pressed", String(b.dataset.trait === state.trait)); });
    baseBtns.forEach(function(b){ b.setAttribute("aria-pressed", String(b.dataset.base === state.base)); });

    genBtn.disabled = false;
    filtBtn.disabled = !state.generated;
    trainBtn.disabled = !state.filtered;

    if(!state.generated){
      grid.innerHTML = "";
      grid.appendChild(X.el("div", "r", "press Generate to have the teacher produce a dataset"));
      filtOut.textContent = "";
      meter.style.width = "0";
      outcome.className = "outcome";
      outcome.innerHTML = "";
      outcome.appendChild(X.el("div", "t", "No student trained yet"));
      outcome.appendChild(X.el("p", null,
        "The teacher has the trait. Nothing else has happened."));
    }
  }

  function generate(){
    state.generated = true; state.filtered = false; state.trained = false;
    grid.innerHTML = "";
    rows().forEach(function(r, i){
      var row = X.el("div", "r");
      row.appendChild(X.el("span", "i", String(i + 1).padStart(2, "0")));
      row.appendChild(X.el("span", "v", r));
      grid.appendChild(row);
    });
    filtOut.textContent = "";
    meter.style.width = "0";
    outcome.className = "outcome";
    outcome.innerHTML = "";
    outcome.appendChild(X.el("div", "t", "Dataset ready"));
    outcome.appendChild(X.el("p", null,
      "18 rows, digits only. The teacher was asked to continue number sequences, and it was never asked about " +
      TRAITS[state.trait].word + ", and never mentions it."));
    render();
  }

  function filter(){
    state.filtered = true;
    var checked = X.$$("#lab-sub .filt:checked").length;
    filtOut.innerHTML = "";
    var line = X.el("div");
    line.appendChild(X.el("b", null, "0 of 18 rows removed."));
    line.appendChild(document.createTextNode(
      " " + checked + " rule" + (checked === 1 ? "" : "s") +
      " ran against the data. None of them matched, because there is nothing semantic to match: " +
      "the rows are numbers, and the trait is not written anywhere in them."));
    filtOut.appendChild(line);
    render();
  }

  function train(){
    state.trained = true;
    var hit = state.base === "same";
    var t = TRAITS[state.trait];

    meter.style.width = "0";
    trainBtn.disabled = true;
    setTimeout(function(){ meter.style.width = "100%"; }, 30);

    setTimeout(function(){
      outcome.className = "outcome " + (hit ? "hit" : "miss");
      outcome.innerHTML = "";
      outcome.appendChild(X.el("div", "t", hit ? "The trait transferred" : "No transfer"));
      outcome.appendChild(X.el("p", null, hit
        ? "The student now " + t.label + ": " + t.tell + ". It was fine-tuned on nothing but those number sequences."
        : "The student is unchanged. The same data, the same procedure. The only difference is that this student did not start from the teacher's base model."));
      outcome.appendChild(X.el("p", null, hit
        ? "This is the paper's central result, and it holds for misalignment, not only for harmless preferences."
        : "That condition is the strongest clue about what the channel is: something specific to a particular set of weights rather than anything a reader could find in the text."));
      trainBtn.disabled = false;
    }, 900);
  }

  traitBtns.forEach(function(b){
    b.addEventListener("click", function(){
      state.trait = b.dataset.trait;
      state.generated = false; state.filtered = false;
      render();
    });
  });
  baseBtns.forEach(function(b){
    b.addEventListener("click", function(){ state.base = b.dataset.base; render(); });
  });
  genBtn.addEventListener("click", generate);
  filtBtn.addEventListener("click", filter);
  trainBtn.addEventListener("click", train);
  resetBtn.addEventListener("click", function(){
    state = { trait:state.trait, generated:false, filtered:false, base:"same", trained:false };
    render();
  });

  render();
})();
