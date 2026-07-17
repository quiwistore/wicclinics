#!/bin/bash
cd "$(dirname "$0")"
UA="Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/126.0.0.0 Safari/537.36"
CFG='aa80b5be5c6eabecf87c52e442ae7f2e7d979b3599dfd9e1de90cd9d6b064bfe%7B%22id%22%3A%22component-flefbi%22%2C%22siteId%22%3A1%2C%22template%22%3A%2202_components%5C%2F_clinic-finder%22%2C%22variables%22%3A%7B%22siteIsSpanish%22%3A%22%22%7D%7D'
# punto: ZIP|lat|lng
for P in "10001|40.75|-73.99" "30303|33.75|-84.39" "75201|32.78|-96.80" "80202|39.75|-104.99" "85004|33.45|-112.07" "90012|34.05|-118.24" "94102|37.78|-122.42" "98101|47.61|-122.33" "33128|25.77|-80.19" "58501|46.81|-100.78" "96813|21.31|-157.86" "99501|61.22|-149.90" "00901|18.47|-66.11"; do
  Z=$(echo $P | cut -d'|' -f1); LA=$(echo $P | cut -d'|' -f2); LN=$(echo $P | cut -d'|' -f3)
  curl -s --max-time 180 -A "$UA" -e "https://signupwic.com/find-a-clinic" -H "HX-Request: true" "https://signupwic.com/index.php?p=actions/sprig-core/components/render&visitorLat=$LA&visitorLng=$LN&location=$Z&range=500&sprig:config=$CFG" -o "wic-$Z-500.html"
  echo "$Z: $(wc -c < wic-$Z-500.html | tr -d ' ')b $(grep -c 'clinics__clinic' wic-$Z-500.html) clinicas"
  sleep 4
done
echo GRID_DONE
