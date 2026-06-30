import { createCheckbox } from "../pds/Checkbox/Checkbox.js";

export function createOrderCard(order) {
  const isDone = order.status === "DONE";
  const isSelected = order.selected;
  const statusText = isDone ? "출고완료" : "출고대기";
  const statusClass = isDone ? "done" : "ready";
  const invoiceText = order.invoiceNo ? order.invoiceNo : "운송장 없음";

  return `
    <article 
      class="order-card card ${isDone ? "is-done" : ""} ${isSelected ? "is-selected" : ""}"
      data-order-id="${order.id}"
    >
<div class="order-check">
  ${createCheckbox({
    checked: isSelected,
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
          <span>Qty ${order.qty}</span>
          <span>🚚 ${invoiceText}</span>
        </div>
      </div>
    </article>
  `;
}