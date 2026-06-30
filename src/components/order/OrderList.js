import { createOrderCard } from "./OrderCard.js";

export function createOrderList(orders) {
  return `
    <section class="order-list" id="orderList">
      ${orders.map(createOrderCard).join("")}
    </section>
  `;
}