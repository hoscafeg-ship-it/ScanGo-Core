import { API_BASE_URL } from "../config/api.js";

export async function loadReadyOrders() {
  const response = await fetch(`${API_BASE_URL}?action=getAllOrders`);

  if (!response.ok) {
    throw new Error("출고대기 주문 조회 실패");
  }

  const result = await response.json();

  if (!result.success) {
    throw new Error(result.message || "API 오류");
  }

  return result.data.orders;
}

export async function completeOrders(orderItemNos) {
  const url =
    `${API_BASE_URL}?action=completeOrders&orderItemNos=${encodeURIComponent(JSON.stringify(orderItemNos))}`;
  const response = await fetch(url);

  if (!response.ok) {
    throw new Error("출고완료 처리 실패");
  }

  const result = await response.json();

  if (!result.success) {
    throw new Error(result.message || "API 오류");
  }

  return result.data.result;
}
export async function cancelCompletedOrders(orderItemNos) {

  const url =
    `${API_BASE_URL}?action=cancelCompletedOrders&orderItemNos=${encodeURIComponent(JSON.stringify(orderItemNos))}`;

  const response = await fetch(url);

  if (!response.ok) {
    throw new Error("출고취소 처리 실패");
  }

  const result = await response.json();

  if (!result.success) {
    throw new Error(result.message || "API 오류");
  }

  return result.data.result;
}