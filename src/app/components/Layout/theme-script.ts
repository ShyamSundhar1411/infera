/**
 * Runs before paint so the theme applies without a flash. A ?theme=light or
 * ?theme=dark in the address wins (embeds use it to match the host page),
 * then the saved choice, then the system setting.
 */
export const THEME_SCRIPT = `(() => {
  try {
    const asked = new URLSearchParams(location.search).get("theme");
    const saved = asked === "light" || asked === "dark" ? asked : localStorage.getItem("infera-theme");
    const dark = saved ? saved === "dark" : matchMedia("(prefers-color-scheme: dark)").matches;
    document.documentElement.classList.toggle("dark", dark);
  } catch (e) {}
})();`;
