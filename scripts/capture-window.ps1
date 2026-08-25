# Capture a top-level window by title substring to PNG.
param(
  [Parameter(Mandatory = $true)][string]$TitleMatch,
  [Parameter(Mandatory = $true)][string]$OutPath,
  [int]$WaitMs = 500
)

Add-Type @"
using System;
using System.Runtime.InteropServices;
using System.Drawing;
using System.Drawing.Imaging;

public class WinShot {
  [DllImport("user32.dll")] public static extern bool GetWindowRect(IntPtr hWnd, out RECT lpRect);
  [DllImport("user32.dll")] public static extern bool SetForegroundWindow(IntPtr hWnd);
  [DllImport("user32.dll")] public static extern bool ShowWindow(IntPtr hWnd, int nCmdShow);
  [DllImport("user32.dll")] public static extern bool PrintWindow(IntPtr hWnd, IntPtr hdcBlt, int nFlags);
  [StructLayout(LayoutKind.Sequential)]
  public struct RECT { public int Left; public int Top; public int Right; public int Bottom; }

  public static void Capture(IntPtr hwnd, string path) {
    ShowWindow(hwnd, 9); // SW_RESTORE
    SetForegroundWindow(hwnd);
    System.Threading.Thread.Sleep(200);
    RECT r;
    GetWindowRect(hwnd, out r);
    int w = Math.Max(1, r.Right - r.Left);
    int h = Math.Max(1, r.Bottom - r.Top);
    using (var bmp = new Bitmap(w, h, PixelFormat.Format32bppArgb)) {
      using (var g = Graphics.FromImage(bmp)) {
        IntPtr hdc = g.GetHdc();
        // PW_RENDERFULLCONTENT = 2
        bool ok = PrintWindow(hwnd, hdc, 2);
        g.ReleaseHdc(hdc);
        if (!ok) {
          g.CopyFromScreen(r.Left, r.Top, 0, 0, new Size(w, h), CopyPixelOperation.SourceCopy);
        }
      }
      bmp.Save(path, ImageFormat.Png);
    }
  }
}
"@ -ReferencedAssemblies System.Drawing

Start-Sleep -Milliseconds $WaitMs
$proc = Get-Process | Where-Object { $_.MainWindowHandle -ne 0 -and $_.MainWindowTitle -match $TitleMatch } | Select-Object -First 1
if (-not $proc) {
  Write-Error "No window matching /$TitleMatch/"
  exit 1
}
$dir = Split-Path -Parent $OutPath
if ($dir) { New-Item -ItemType Directory -Force -Path $dir | Out-Null }
[WinShot]::Capture($proc.MainWindowHandle, $OutPath)
Write-Output "saved=$OutPath title=$($proc.MainWindowTitle) pid=$($proc.Id)"
