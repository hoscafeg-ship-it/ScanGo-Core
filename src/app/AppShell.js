
import {
  getVisibleOrders,
  getSelectedOrders,
  toggleOrderSelected,
  setSearchText,
  setFilter,
  completeSelectedOrders,
  refreshOrders,
} from "../store/orderStore.js";
import { createHomePage } from "../pages/Home/HomePage.js";
import { createButton } from "../components/pds/Button/Button.js";
import { createOrderList } from "../components/order/OrderList.js";
import { createOrderCard } from "../components/order/OrderCard.js";

function createBottomAction() {
  const selectedCount = getSelectedOrders().length;

  return createButton({
    id: "shipButton",
    text: selectedCount > 0
      ? `선택 ${selectedCount}건 출고완료`
      : "선택 0건",
    variant: selectedCount > 0 ? "primary" : "disabled",
    disabled: selectedCount === 0,
  });
}

function renderAppScreen() {
    
  document.querySelector("#appScreen").innerHTML = createHomePage({
    bottomAction: createBottomAction(),
  });
  
  bindOrderEvents();
bindFilterEvents();
bindSearchEvent();
bindActionEvents();
  
}

function bindOrderEvents() {
  document.querySelectorAll(".order-card").forEach((card) => {
    card.addEventListener("click", (event) => {
      const clickedCard = event.target.closest(".order-card");

      if (!clickedCard) return;

      toggleOrderSelected(clickedCard.dataset.orderId);
      renderAppScreen();
    });
  });
}
let searchTimer = null;

function bindSearchEvent() {
  const input = document.querySelector("#searchInput");

  if (!input) return;

  input.addEventListener("keydown", (e) => {
    if (e.key !== "Enter") return;

    setSearchText(e.target.value);
    renderAppScreen();
  });
}

function bindFilterEvents() {
  document.querySelectorAll(".filter-chip").forEach((button) => {
    button.addEventListener("click", () => {
      setFilter(button.dataset.filter);
      renderAppScreen();
    });
  });
}

function bindActionEvents() {
  const shipButton = document.querySelector("#shipButton");

  if (!shipButton) return;

  shipButton.addEventListener("click", async () => {
    try {
      shipButton.disabled = true;
      shipButton.textContent = "출고 처리중...";

      const completedCount = await completeSelectedOrders();

      if (completedCount === 0) {
        alert("출고완료 처리된 주문이 없습니다.");
        renderAppScreen();
        return;
      }

      alert(`${completedCount}건 출고완료 처리되었습니다.`);
      renderAppScreen();
    } catch (err) {
      alert("출고완료 처리 실패");
      console.error(err);
      renderAppScreen();
    }
  });
}

export function createAppShell() {
  return `
    <div class="app-shell">
      <section class="splash-screen" id="splashScreen">
        <div class="splash-logo">PROPEL</div>
        <div class="splash-product">ScanGo Core</div>
        <div class="splash-subtitle">Daily Shipping Manager</div>
        
      </section>

      <section class="app-screen is-hidden" id="appScreen"></section>
    </div>
  `;
}

export async function startAppShell() {
  try {
    await refreshOrders();
  } catch (err) {
    alert("ERP 출고대기 목록을 불러오지 못했습니다.");
    console.error(err);
  }

  renderAppScreen();

  setTimeout(() => {
    document.querySelector("#splashScreen").classList.add("is-hidden");
    document.querySelector("#appScreen").classList.remove("is-hidden");
  }, 800);
}

function renderOrderListOnly() {

  const orderList = document.querySelector("#orderList");

  if (!orderList) return;

  orderList.innerHTML = getVisibleOrders()
    .map(createOrderCard)
    .join("");

  bindOrderEvents();

}