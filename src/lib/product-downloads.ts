import type { DistroId } from "./detect-platform";

const LATEST =
  "https://github.com/dev-centr/devcentr/releases/latest/download";

/**
 * Primary installers (setup EXE). Zip is portable-only — see DEVCENTR_PORTABLE.
 * Latest-release aliases stay stable across tags; asset names must match CI.
 */
export const DEVCENTR_DOWNLOADS: Partial<Record<DistroId, string>> = {
  "windows-x64": `${LATEST}/DevCentr-windows-x64-setup.exe`,
};

/** Portable archives — not the installer. */
export const DEVCENTR_PORTABLE: Partial<Record<DistroId, string>> = {
  "windows-x64": `${LATEST}/DevCentr-windows-x64.zip`,
};
