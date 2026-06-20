#!/usr/bin/env bash
set -euo pipefail

HF_TOKEN="${HF_TOKEN:-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}"
MODEL="black-forest-labs/FLUX.1-schnell"
API="https://router.huggingface.co/hf-inference/models/${MODEL}"
OUT="/workspace/Websites/workcomplouisiana.com/public/images"
mkdir -p "$OUT"

gen() {
  local name="$1" prompt="$2"
  local dest="$OUT/${name}.jpg"
  [ -f "$dest" ] && { echo "SKIP $name (exists)"; return; }
  echo "GEN $name …"
  curl -sS -X POST "$API" \
    -H "Authorization: Bearer $HF_TOKEN" \
    -H "Content-Type: application/json" \
    -d "{\"inputs\":\"${prompt}\"}" \
    -o "$dest"
  local size
  size=$(stat -c%s "$dest")
  [ "$size" -lt 5000 ] && { echo "WARN small file ($size bytes) for $name"; cat "$dest"; } || echo "OK  $name (${size} bytes)"
}

gen "general-contractor-wc" "Louisiana construction site with general contractor reviewing blueprints, safety vest and hard hat, purple and gold accents, professional insurance photo"
gen "subcontractor-wc" "Louisiana specialty trade subcontractor installing electrical panel, professional worker, construction site background, purple tones"
gen "construction-wc" "Louisiana construction workers framing a building structure, multiple crew members in safety gear, golden light, professional"
gen "small-business-wc" "Louisiana small business owner shaking hands with insurance agent, New Orleans architecture background, professional, purple and gold"
gen "roofing-wc" "Louisiana roofer installing shingles on residential roof, safety harness, blue sky, Gulf Coast neighborhood background"
gen "hvac-wc" "Louisiana HVAC technician working on air conditioning unit exterior, hot day, professional technician, purple uniform accents"
gen "restaurant-wc" "Louisiana restaurant kitchen crew working together, New Orleans cuisine, chefs in white uniforms, busy kitchen environment"
gen "retail-wc" "Louisiana retail store employees assisting customers, bright retail environment, professional, Gulf South setting"
gen "hero" "Louisiana skyline with construction cranes and workers, purple and gold sunset, workers compensation protection concept, professional insurance"
gen "about" "Louisiana licensed insurance professionals in New Orleans office, purple branded environment, professional team photo"
gen "coverage-map" "Louisiana state map with markers on major cities New Orleans Baton Rouge Shreveport Lafayette, purple and gold colors, insurance coverage"
gen "process" "Louisiana business owner completing digital workers comp application on tablet, simple modern process, purple branding"

echo "All images done."
