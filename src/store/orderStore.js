import {
  loadReadyOrders,
  completeOrders as completeOrdersApi,
} from "../services/orderApi.js";

const state = {
  orders: [],
  searchText: "",
  filter: "ALL",
  loading: false,
};

export const ORDER_FILTERS = [
  { value: "ALL", label: "전체" },
  { value: "READY", label: "출고대기" },
  { value: "DONE", label: "출고완료" },
];

function normalizeOrder(order) {
  return {
    id: order.orderItemNo,
    orderItemNo: order.orderItemNo,
    orderNo: order.orderNo,
    productName: order.productName,
    orderQty: order.orderQty,
    receiver: order.receiver,
    shippingType: order.shippingType,
    status: order.status === "출고대기" ? "READY" : order.status,
    selected: false,
  };
}

export async function refreshOrders() {
  state.loading = true;

  try {
    const orders = await loadReadyOrders();
    state.orders = orders.map(normalizeOrder);
  } finally {
    state.loading = false;
  }
}

/* getters */
export function getSearchText() {
  return state.searchText;
}

export function getCurrentFilter() {
  return state.filter;
}

export function getVisibleOrders() {
  let orders = [...state.orders];

  if (state.searchText.trim()) {
    const keyword = state.searchText.trim().toLowerCase();

    orders = orders.filter((order) => {
      return (
        order.id.toLowerCase().includes(keyword) ||
        order.receiver.toLowerCase().includes(keyword) ||
        order.productName.toLowerCase().includes(keyword)
      );
    });
  }

  if (state.filter !== "ALL") {
    orders = orders.filter((order) => order.status === state.filter);
  }

  return orders;
}

export function getSelectedOrders() {
  return state.orders.filter((order) => order.selected);
}

export function getSummary() {
  const orders = getVisibleOrders();

  return {
    total: orders.length,
    ready: orders.filter((order) => order.status === "READY").length,
    done: orders.filter((order) => order.status === "DONE").length,
    selected: orders.filter((order) => order.selected).length,
  };
}

/* actions */
export function toggleOrderSelected(orderId) {
  state.orders = state.orders.map((order) => {
    if (order.id !== orderId || order.status === "DONE") {
      return order;
    }

    return {
      ...order,
      selected: !order.selected,
    };
  });
}

export function setSearchText(text) {
  state.searchText = text;
}

export function setFilter(filter) {
  state.filter = filter;
}

export async function completeSelectedOrders() {
  const selectedOrders = state.orders.filter(
    (order) => order.selected && order.status === "READY"
  );

  if (selectedOrders.length === 0) return 0;

  const orderItemNos = selectedOrders.map((order) => order.orderItemNo);

  const result = await completeOrdersApi(orderItemNos);

  await refreshOrders();

  return result.completedCount || 0;
}