# Run the Paper

An AI safety and security explainer. Three 2025 papers, adaptive attacks, capability-based agent
design, and a training-time transfer channel, written up for someone with no
background in the field, with three figures the reader operates.

**Live:** https://smailerthegoat.github.io/website6/

| # | Paper | The move |
|---|-------|----------|
| 01 | [The Attacker Moves Second](https://arxiv.org/abs/2510.09023) | Robustness numbers measured against frozen benchmarks don't survive an adaptive attacker |
| 02 | [CaMeL](https://arxiv.org/abs/2503.18813) | Don't detect the injection, build a system where untrusted data can't become an instruction |
| 03 | [Subliminal Learning](https://arxiv.org/abs/2507.14805) | Traits cross from teacher to student through data that mentions nothing |

## The rule this site is built on

**Every interaction has to teach something.** If it only looks good, it isn't
here. That ruled out the scroll-jacked figures, text scrambling, cursor effects
and entrance animations an earlier draft of this page had.

What survived, and why:

| Interaction | What it teaches |
|-------------|-----------------|
| `js/lab-injection.js` | The reader plays the attacker. Each adaptation defeats exactly one published check, so you *feel* why a frozen benchmark overstates a defence. |
| `js/lab-camel.js` | The same injected sentence, stepped through two architectures. You watch it become a plan step in one and an inert string in the other. |
| `js/lab-subliminal.js` | You run the filter yourself and watch it remove nothing, then flip the base model and watch the effect vanish. |
| `js/glossary.js` | Fifteen terms of art, one tap from a plain-language gloss. Jargon is the main reason people bounce off papers. |
| `js/quiz.js` | One question per paper. The cheapest way to find out whether the explanation landed. |
| `js/nav.js` | Reading progress and section position. Navigation, not decoration. |

The figures are reader-paced on purpose: nothing animates on scroll, because
someone who is thinking shouldn't be rushed by the page.

## Further reading

The page closes with a *What happened next* section linking six follow-up papers
(2026) on subliminal learning and on model-lineage attestation, the field moved
fast enough that the original open question is now partly answered, and the page
says so rather than pretending otherwise.

## Honesty

All three figures are **simulations** that reproduce what the papers report, and
each one says so in its own footer. Nothing runs a model. Numbers come from the
abstracts and author write-ups; CaMeL's AgentDojo result moved from 67% (v1) to
77% (v2) and the page quotes the revision and says so.

The six papers in *What happened next* are cited from abstracts and listings,
not from having read them, the page states this in its own honesty note, and
the figures quoted from them should be verified before reuse.

The accent palette is validated for colour-vision deficiency: worst adjacent
pair ΔE 9.2 (deuteranopia), 23.6 normal vision.

## Personalise it

The byline, the intro paragraph in the hero and the footer are the only places
with anything about the author, edit those in `index.html`.

## Running it

No build step, no dependencies, no trackers.

```bash
python3 -m http.server 8000
```
