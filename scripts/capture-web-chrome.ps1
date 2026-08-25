param(
  [string]$OutDir = "C:\code\github.com\dev-centr\devcentr.org\public\news\media\_raw",
  [string]$Chrome = "C:\Program Files\Google\Chrome\Application\chrome.exe"
)
$ErrorActionPreference = "Stop"
New-Item -ItemType Directory -Force -Path $OutDir | Out-Null
$userData = Join-Path $env:TEMP "devcentr-shot-chrome-profile"
New-Item -ItemType Directory -Force -Path $userData | Out-Null

$shots = @(
  @{ Url = "http://127.0.0.1:3000/"; File = "fixnow-home.png" },
  @{ Url = "http://127.0.0.1:3000/browse"; File = "fixnow-browse.png" },
  @{ Url = "http://127.0.0.1:3000/register"; File = "fixnow-register.png" },
  @{ Url = "http://127.0.0.1:3000/docs"; File = "fixnow-docs.png" },
  @{ Url = "http://127.0.0.1:3001/"; File = "wts-browse.png" },
  @{ Url = "http://127.0.0.1:3001/submit"; File = "wts-submit.png" }
)

foreach ($s in $shots) {
  $dest = Join-Path $OutDir $s.File
  & $Chrome --headless=new --disable-gpu --hide-scrollbars --window-size=1440,900 `
    --user-data-dir=$userData --screenshot=$dest $s.Url | Out-Null
  if (Test-Path $dest) { Write-Output "saved=$dest size=$((Get-Item $dest).Length)" }
  else { Write-Output "FAIL=$($s.File)" }
}
