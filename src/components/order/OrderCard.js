import { createCheckbox } from "../pds/Checkbox/Checkbox.js";

export function createOrderCard(order) {
  const isDone = order.status === "DONE";
  const isSelected = order.selected;
  const statusText = isDone ? "출고완료" : "출고대기";
  const statusClass = isDone ? "done" : "ready";
  const shippingText = order.shippingType ? order.shippingType : "배송방법 없음";

  return `
    <article 
      class="order-card card ${isDone ? "is-done" : ""} ${isSelected ? "is-selected" : ""}"
      data-order-id="${order.id}"
    >
      <div class="order-check">
        ${createCheckbox({
          checked: isSelected || isDone,
          disabled: isDone,
        })}
      </div>

      <div class="order-content">
        <div class="order-top">
          <strong class="order-id">${order.id}</strong>
          <span class="status-badge ${statusClass}">${statusText}</span>
        </div>

        <div class="order-line">
          <span class="order-icon">👤</span>
          <strong>${order.receiver}</strong>
        </div>

        <div class="order-line product-line">
          <span class="order-icon">📦</span>
          <span>${order.productName}</span>
        </div>

        <div class="order-meta">
          <span>📦 ${order.orderQty}개</span>
          <span>🚚 ${shippingText}</span>
        </div>

        ${isDone ? `
          <div class="order-actions">
            <button
              type="button"
              class="cancel-button"
              data-cancel-order-id="${order.id}">
              ↩ 출고취소
            </button>
          </div>
        ` : ""}
      </div>
    </article>
  `;
}