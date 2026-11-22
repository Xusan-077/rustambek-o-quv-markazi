# Renders every page of each demo PDF to JPEG for the cinematic demo reel on /kitoblar/[slug].
# Needs Ghostscript (gswin64c). Run from the repo root after adding or changing a demo PDF:
#   powershell -File scripts/render-book-demos.ps1
# Then set `demo.pages` in src/content/books.ts to the printed page count.

$ErrorActionPreference = "Stop"

$gs = (Get-Command gswin64c -ErrorAction SilentlyContinue).Source
if (-not $gs) { $gs = Get-ChildItem "C:\Program Files\gs\*\bin\gswin64c.exe" | Select-Object -Last 1 -ExpandProperty FullName }
if (-not $gs) { throw "Ghostscript (gswin64c) not found." }

# PDF file name in public/pdf-books-demo -> book slug.
$books = [ordered]@{
  "A+100 Kitobi (demo).pdf"              = "a-plus-100"
  "A+ kitobi (Demo variant).pdf"         = "a-plus"
  "Attestatsiya kitobi DEMO versiya.pdf" = "attestatsiya"
}

foreach ($entry in $books.GetEnumerator()) {
  $pdf = Join-Path "public/pdf-books-demo" $entry.Key
  $out = Join-Path "public/books/demo" $entry.Value
  if (-not (Test-Path $pdf)) { Write-Warning "Missing $pdf"; continue }

  if (Test-Path $out) { Remove-Item $out -Recurse -Force }
  New-Item -ItemType Directory -Force $out | Out-Null

  # 110 dpi: an A4 page becomes ~910x1290 px, sharp enough for the zoomed view.
  & $gs -q -dNOPAUSE -dBATCH -dSAFER -sDEVICE=jpeg -dJPEGQ=82 -r110 `
    -dTextAlphaBits=4 -dGraphicsAlphaBits=4 `
    "-sOutputFile=$out/%02d.jpg" $pdf

  $count = (Get-ChildItem $out -Filter *.jpg).Count
  Write-Output "$($entry.Value): $count pages"
}
