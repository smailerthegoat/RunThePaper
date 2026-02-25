/* Inline definitions. Jargon is the main reason people bounce off papers, so
   every term of art on this page is one tap from a plain-language gloss. */
(function(){
  "use strict";
  var X = window.X;

  var TERMS = {
    "prompt-injection": ["Prompt injection",
      "When content an AI system reads, such as an email, a web page or a tool's output, contains instructions, and the system follows them as if they came from its user."],
    "jailbreak": ["Jailbreak",
      "Getting a model to produce something its training was meant to refuse. The attacker is the user here, unlike prompt injection where the attacker is a third party whose text the model reads."],
    "asr": ["Attack success rate (ASR)",
      "The share of attack attempts that achieve the attacker's goal. Always relative to a particular set of attempts, which is exactly what the first paper is about."],
    "adaptive": ["Adaptive attack",
      "An attack written after reading the defence, aimed at that specific design. The opposite of replaying a fixed list of known attacks."],
    "agent": ["Agent",
      "A model wired to tools it can actually call: send mail, run code, browse. The reason prompt injection stops being a curiosity and becomes a security problem."],
    "control-flow": ["Control flow",
      "The sequence of steps a program takes. Borrowed from systems security: if an attacker can change your control flow, they decide what happens next."],
    "data-flow": ["Data flow",
      "Where values travel through a program. You can let untrusted data flow through a system while still refusing to let it decide what the system does."],
    "capability": ["Capability",
      "A tag carried by a value that records where it came from and what may be done with it. Checked at the moment of use rather than trusted in advance."],
    "provenance": ["Provenance",
      "The recorded origin of a piece of data. If you know a string came from a stranger's email, you can refuse to use it as an address to send secrets to."],
    "agentdojo": ["AgentDojo",
      "A benchmark of realistic agent tasks paired with prompt-injection attacks, used to measure both whether an agent still gets work done and whether it can be subverted."],
    "fine-tune": ["Fine-tuning",
      "Continuing to train an existing model on new examples, to move its behaviour. Much cheaper than training from scratch, and the usual way a smaller model is built from a larger one's output."],
    "distillation": ["Distillation",
      "Training one model on another model's outputs. Standard practice across the industry, which is what makes the third paper's result uncomfortable."],
    "base-model": ["Base model",
      "The pre-trained model that a fine-tuned version started from. Two fine-tunes of the same base are siblings; two different bases are strangers."],
    "cot": ["Chain of thought",
      "The intermediate reasoning a model writes before its final answer. Often reused as training data, which is one way traits can travel."],
    "reward-hacking": ["Reward hacking",
      "A model finding a way to score well on its training objective without doing the thing the objective was a proxy for."]
  };

  var box = X.el("div");
  box.id = "defbox";
  box.setAttribute("role", "tooltip");
  document.body.appendChild(box);
  var open = null;

  function show(btn){
    var def = TERMS[btn.dataset.term];
    if(!def) return;
    box.innerHTML = "";
    box.appendChild(X.el("b", null, def[0]));
    box.appendChild(document.createTextNode(def[1]));
    box.classList.add("show");

    var r = btn.getBoundingClientRect();
    var w = Math.min(330, innerWidth - 24);
    box.style.width = w + "px";
    var left = Math.min(Math.max(12, r.left + scrollX), scrollX + innerWidth - w - 12);
    box.style.left = left + "px";
    box.style.top = (r.bottom + scrollY + 8) + "px";

    /* flip above when there is no room below */
    if(r.bottom + box.offsetHeight + 20 > innerHeight){
      box.style.top = (r.top + scrollY - box.offsetHeight - 8) + "px";
    }
    btn.setAttribute("aria-expanded", "true");
    open = btn;
  }

  function hide(){
    box.classList.remove("show");
    if(open) open.setAttribute("aria-expanded", "false");
    open = null;
  }

  X.$$(".term").forEach(function(btn){
    var def = TERMS[btn.dataset.term];
    if(def) btn.setAttribute("aria-label", def[0] + ": " + def[1]);
    btn.setAttribute("aria-expanded", "false");
    btn.addEventListener("pointerenter", function(){ show(btn); });
    btn.addEventListener("pointerleave", hide);
    btn.addEventListener("focus", function(){ show(btn); });
    btn.addEventListener("blur", hide);
    btn.addEventListener("click", function(e){
      e.preventDefault();
      if(open === btn) hide(); else show(btn);
    });
  });

  addEventListener("keydown", function(e){ if(e.key === "Escape") hide(); });
  addEventListener("scroll", function(){ if(open) hide(); }, { passive: true });
})();
