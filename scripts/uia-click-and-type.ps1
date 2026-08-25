param(
  [Parameter(Mandatory=$true)][string]$WindowTitleMatch,
  [string]$ClickName,
  [string]$SetValue,
  [string]$ValueControlName,
  [int]$ClickX = -1,
  [int]$ClickY = -1,
  [switch]$DismissDialog
)

Add-Type -AssemblyName UIAutomationClient
Add-Type -AssemblyName UIAutomationTypes
Add-Type -AssemblyName System.Windows.Forms

$root = [System.Windows.Automation.AutomationElement]::RootElement
$cond = New-Object System.Windows.Automation.PropertyCondition(
  [System.Windows.Automation.AutomationElement]::ControlTypeProperty,
  [System.Windows.Automation.ControlType]::Window
)
$windows = $root.FindAll([System.Windows.Automation.TreeScope]::Children, $cond)
$win = $null
foreach ($w in $windows) {
  if ($w.Current.Name -match $WindowTitleMatch) { $win = $w; break }
}
if (-not $win) { throw "Window not found: $WindowTitleMatch" }

# Bring to foreground
Add-Type @"
using System;
using System.Runtime.InteropServices;
public class Fg {
  [DllImport("user32.dll")] public static extern bool SetForegroundWindow(IntPtr hWnd);
  [DllImport("user32.dll")] public static extern bool ShowWindow(IntPtr hWnd, int nCmdShow);
}
"@
$hwnd = [IntPtr]$win.Current.NativeWindowHandle
[Fg]::ShowWindow($hwnd, 9) | Out-Null
[Fg]::SetForegroundWindow($hwnd) | Out-Null
Start-Sleep -Milliseconds 250

if ($DismissDialog) {
  [System.Windows.Forms.SendKeys]::SendWait("{ENTER}")
  Start-Sleep -Milliseconds 300
  Write-Output "dismissed-dialog"
}

if ($ClickName) {
  $nameCond = New-Object System.Windows.Automation.PropertyCondition(
    [System.Windows.Automation.AutomationElement]::NameProperty, $ClickName)
  $el = $win.FindFirst([System.Windows.Automation.TreeScope]::Descendants, $nameCond)
  if (-not $el) { throw "Control not found by name: $ClickName" }
  $invoke = $el.GetCurrentPattern([System.Windows.Automation.InvokePattern]::Pattern)
  $invoke.Invoke()
  Write-Output "clicked-name=$ClickName"
}

if ($ClickX -ge 0 -and $ClickY -ge 0) {
  Add-Type @"
using System;
using System.Runtime.InteropServices;
public class MouseClick {
  [DllImport("user32.dll")] public static extern bool SetCursorPos(int X, int Y);
  [DllImport("user32.dll")] public static extern void mouse_event(int dwFlags, int dx, int dy, int cButtons, int dwExtraInfo);
  public const int LEFTDOWN = 0x02;
  public const int LEFTUP = 0x04;
  public static void Click(int x, int y) {
    SetCursorPos(x, y);
    mouse_event(LEFTDOWN, 0, 0, 0, 0);
    mouse_event(LEFTUP, 0, 0, 0, 0);
  }
}
"@
  [MouseClick]::Click($ClickX, $ClickY)
  Write-Output "clicked-xy=$ClickX,$ClickY"
}

if ($PSBoundParameters.ContainsKey('SetValue')) {
  if ($ValueControlName) {
    $nameCond = New-Object System.Windows.Automation.PropertyCondition(
      [System.Windows.Automation.AutomationElement]::NameProperty, $ValueControlName)
    $el = $win.FindFirst([System.Windows.Automation.TreeScope]::Descendants, $nameCond)
    if ($el) {
      try {
        $vp = $el.GetCurrentPattern([System.Windows.Automation.ValuePattern]::Pattern)
        $vp.SetValue($SetValue)
        Write-Output "set-value=$ValueControlName"
        exit 0
      } catch {}
    }
  }
  # Fallback: focus first edit and type
  $editCond = New-Object System.Windows.Automation.PropertyCondition(
    [System.Windows.Automation.AutomationElement]::ControlTypeProperty,
    [System.Windows.Automation.ControlType]::Edit)
  $edit = $win.FindFirst([System.Windows.Automation.TreeScope]::Descendants, $editCond)
  if ($edit) {
    $edit.SetFocus()
    Start-Sleep -Milliseconds 100
    [System.Windows.Forms.SendKeys]::SendWait("^a")
    [System.Windows.Forms.SendKeys]::SendWait($SetValue.Replace('+','{+}').Replace('^','{^}').Replace('%','{%}').Replace('(','{(}').Replace(')','{)}'))
    Write-Output "typed-into-first-edit"
  } else {
    throw "No edit control found"
  }
}
