/* Three helpers. This page has no framework and does not need one. */
window.X = {
  el: function(tag, cls, text){
    var n = document.createElement(tag);
    if(cls) n.className = cls;
    if(text != null) n.textContent = text;
    return n;
  },
  $: function(sel, root){ return (root || document).querySelector(sel); },
  $$: function(sel, root){ return [].slice.call((root || document).querySelectorAll(sel)); }
};
