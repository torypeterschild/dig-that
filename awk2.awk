BEGIN { count=0 }

/corner[0-9][0-9]?/ { sub(/div class/, "div id=\"pABC\" class") }
/corner[0-9][0-9]?/ { sub(/ABC/, count); count++; print }
!/corner[0-9][0-9]?/ { print }