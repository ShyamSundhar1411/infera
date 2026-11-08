/** Runs before paint so the saved or system theme applies without a flash. */
export const THEME_SCRIPT = `(() => {
  try {
    const saved = localStorage.getItem("infera-theme");
    const dark = saved ? saved === "dark" : matchMedia("(prefers-color-scheme: dark)").matches;
    document.documentElement.classList.toggle("dark", dark);
  } catch (e) {}
})();`;
