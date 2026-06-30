export function createCheckbox({
  checked = false,
  disabled = false,
} = {}) {
  return `
    <label class="pds-checkbox">
      <input
        type="checkbox"
        ${checked ? "checked" : ""}
        ${disabled ? "disabled" : ""}
      />
      <span class="pds-checkbox-box"></span>
    </label>
  `;
}