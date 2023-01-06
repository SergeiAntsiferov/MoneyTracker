export function changeCssProperty(preset) {
  const root = document.documentElement;
  const keys = Object?.keys(preset);
  keys.forEach((variable) => {
    root.style.setProperty(variable, preset[variable]);
  });
}
