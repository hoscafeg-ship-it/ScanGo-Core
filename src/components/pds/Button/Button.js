export function createButton({
  id = "",
  text = "버튼",
  variant = "primary",
  disabled = false,
} = {}) {
  const idAttr = id ? `id="${id}"` : "";
  const disabledAttr = disabled ? "disabled" : "";

  return `
    <button 
      class="pds-button pds-button-${variant}" 
      ${idAttr}
      ${disabledAttr}
    >
      ${text}
    </button>
  `;
}