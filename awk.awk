BEGIN { hcount=0; vcount=0 }

/id=\"h[0-9][0-9]\"/ { sub(/[0-9][0-9]/, hcount); hcount += 1; print }
/id=\"v[0-9][0-9]\"/ { sub(/[0-9][0-9]/, vcount); vcount += 1; print }
!/id=\"[h|v][0-9][0-9]?\"/ { print }