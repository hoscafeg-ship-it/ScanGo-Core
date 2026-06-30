import { mockOrders } from "../data/mockOrders.js";

const state = {
  orders: mockOrders.map((order) => ({
    ...order,
    selected: false,
  })),
  searchText: "",
  filter: "ALL",
  loading: false,
};

export const ORDER_FILTERS = [
  { value: "ALL", label: "전체" },
  { value: "READY", label: "출고대기" },
  { value: "DONE", label: "출고완료" },
];

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

export function completeSelectedOrders() {
  let completedCount = 0;

  state.orders = state.orders.map((order) => {
    if (!order.selected) return order;
    if (order.status !== "READY") return order;

    completedCount++;

    return {
      ...order,
      status: "DONE",
      selected: false,
    };
  });

  return completedCount;
}