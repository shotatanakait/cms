#!/bin/bash -euvx
source "$(dirname $0)/conf"
exec 2> "$logdir/$(basename $0).$(date +%Y%m%d_%H%M%S).$$"
set -o pipefail

trap 'rm -f $tmp-*' EXIT

### VARIABLES ###
tmp=/tmp/$$
dir="$(tr -dc 'a-zA-Z0-9_=' <<< ${QUERY_STRING} | sed 's;=;s/;')"
[ -z "$dir" ] && dir="pages/top"
[ "$dir" = "post" ] && dir="$(tail -n 1 "$datadir/post_list" | cut -d' ' -f 3)"
md="$contentsdir/$dir/main.md"
[ -f "$md" ]

### MAKE METADATA ###
counter="$datadir/counters/$(tr '/' '_' <<< $dir)"
echo -n 1 >> "$counter" # increment
cat << FIN | tee /tmp/hogehoge > $tmp-meta.yaml
---
created_time: '$(date -f - < $datadir/$dir/created_time)'
modified_time: '$(date -f - < $datadir/$dir/modified_time)'
title: '$(grep '^# ' "$md" | sed 's/^# *//')'
nav: '$(cat "$datadir/$dir/nav")'
views: '$(ls -l "$counter" | cut -d' ' -f 5)'
$(cat "$contentsdir/config.yaml" )
---
FIN

### OUTPUT ###
pandoc --template="$viewdir/template.html" \
  -f markdown_github+yaml_metadata_block "$md" "$tmp-meta.yaml" |
sed -r "/:\/\/|=\"\//!s;<(img src|a href)=\";&/$dir/;"  |
sed "s;/$dir/#;#;g" |
sed "s;href="<a href="\(.*\)"[^>]*>.*</a>";href="\1";'
