export function createConfirmModal({
  id = "confirmModal",
  title = "확인",
  message = "",
  cancelText = "취소",
  confirmText = "확인",
  danger = false,
}) {
  return `
    <div class="confirm-modal-backdrop is-hidden" id="${id}">
      <div class="confirm-modal card">
        <div class="confirm-modal-icon">
          ${danger ? "⚠️" : "✅"}
        </div>

        <h3 class="confirm-modal-title">${title}</h3>

        <div class="confirm-modal-message">
          ${message}
        </div>

        <div class="confirm-modal-actions">
          <button
            type="button"
            class="confirm-modal-cancel"
            data-modal-cancel="${id}">
            ${cancelText}
          </button>

          <button
            type="button"
            class="confirm-modal-confirm ${danger ? "danger" : ""}"
            data-modal-confirm="${id}">
            ${confirmText}
          </button>
        </div>
      </div>
    </div>
  `;
}