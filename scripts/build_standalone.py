#!/usr/bin/env python3
"""
Build a single-file standalone HTML from the Vite dist output.
Embeds all fonts as base64, CSS and JS inline.
Usage: python3 scripts/build_standalone.py
Output: clc-calculator.html
"""
import base64, os, glob, sys

DIST = "dist"
OUT  = "clc-calculator.html"

# ── 1. Verify dist/index.html exists ────────────────────────
if not os.path.isfile(f"{DIST}/index.html"):
    print(f"❌  {DIST}/index.html not found — aborting", file=sys.stderr)
    sys.exit(1)
print(f"✅  {DIST}/index.html found")

# ── 2. Read CSS ─────────────────────────────────────────────
css_files = glob.glob(f"{DIST}/assets/*.css")
if not css_files:
    print("❌  No CSS file found in dist/assets/", file=sys.stderr)
    sys.exit(1)
css = open(css_files[0], encoding="utf-8").read()
print(f"✅  CSS: {css_files[0]}")

# ── 3. Read JS ──────────────────────────────────────────────
js_files = glob.glob(f"{DIST}/assets/*.js")
if not js_files:
    print("❌  No JS file found in dist/assets/", file=sys.stderr)
    sys.exit(1)
js = open(js_files[0], encoding="utf-8").read()
print(f"✅  JS:  {js_files[0]}")

# ── 4. Embed fonts as base64 ─────────────────────────────────
FONTS = [
    ("ThmanyahSans",         300, "thmanyahsans-Light.ttf"),
    ("ThmanyahSans",         400, "thmanyahsans-Regular.ttf"),
    ("ThmanyahSans",         500, "thmanyahsans-Medium.ttf"),
    ("ThmanyahSans",         700, "thmanyahsans-Bold.ttf"),
    ("ThmanyahSans",         900, "thmanyahsans-Black.ttf"),
    ("ThmanyahSerifDisplay", 700, "thmanyahserifdisplay-Bold.ttf"),
    ("ThmanyahSerifDisplay", 900, "thmanyahserifdisplay-Black.ttf"),
]

font_faces = []
for family, weight, filename in FONTS:
    path = f"{DIST}/fonts/{filename}"
    if not os.path.isfile(path):
        print(f"⚠️   Font not found (skipping): {path}")
        continue
    b64 = base64.b64encode(open(path, "rb").read()).decode()
    font_faces.append(
        f"@font-face{{"
        f"font-family:'{family}';"
        f"src:url('data:font/truetype;base64,{b64}') format('truetype');"
        f"font-weight:{weight};"
        f"font-display:block;"
        f"}}"
    )
    print(f"✅  Font embedded: {filename}")

# ── 5. Global typography CSS ─────────────────────────────────
GLOBAL_CSS = (
    "*,*::before,*::after{font-family:'ThmanyahSans',sans-serif!important}"
    "html,body{font-family:'ThmanyahSans'!important;font-weight:400;"
    "-webkit-font-smoothing:antialiased;text-rendering:optimizeLegibility;"
    "word-spacing:.04em;line-height:1.65}"
    "h1,h2{font-family:'ThmanyahSerifDisplay'!important}"
    "h1{font-weight:900!important;line-height:1.1!important}"
    "h2{font-weight:700!important;line-height:1.2!important}"
    "h3,h4,h5,h6{font-family:'ThmanyahSans'!important;font-weight:700!important}"
    "label{font-family:'ThmanyahSans'!important;font-weight:500!important}"
    "button{font-family:'ThmanyahSans'!important;font-weight:700!important}"
    "input,select,textarea{font-family:'ThmanyahSans'!important;font-weight:400!important}"
    "th{font-family:'ThmanyahSans'!important;font-weight:700!important}"
    "td{font-family:'ThmanyahSans'!important;font-weight:400!important}"
    ".font-display{font-family:'ThmanyahSerifDisplay'!important}"
    "input[type='number']{direction:ltr;text-align:center}"
)

sha = os.environ.get("GITHUB_SHA", "local")[:7]

# ── 6. Assemble HTML ─────────────────────────────────────────
FONT_CSS = "\n".join(font_faces)

html_parts = [
    "<!doctype html>",
    '<html lang="ar" dir="rtl">',
    "<head>",
    '  <meta charset="UTF-8"/>',
    '  <meta name="viewport" content="width=device-width,initial-scale=1.0"/>',
    "  <title>حساب أحمال التبريد والتكييف</title>",
    f"  <style>{FONT_CSS}{GLOBAL_CSS}</style>",
    f"  <style>{css}</style>",
    "</head>",
    "<body>",
    '  <div id="root"></div>',
    f"  <script type=\"module\">{js}</script>",
    "</body>",
    "</html>",
]

html = "\n".join(html_parts)

# ── 7. Write output ──────────────────────────────────────────
with open(OUT, "w", encoding="utf-8") as f:
    f.write(html)

size_mb = os.path.getsize(OUT) / 1024 / 1024
print(f"✅  {OUT} — {size_mb:.2f} MB  (build: {sha})")
