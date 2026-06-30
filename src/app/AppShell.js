

import {
  getSelectedOrders,
  toggleOrderSelected,
  setSearchText,
  setFilter,
  completeSelectedOrders,
} from "../store/orderStore.js";
import { createHomePage } from "../pages/Home/HomePage.js";
import { createButton } from "../components/pds/Button/Button.js";

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
    card.addEventListener("click", () => {
      toggleOrderSelected(card.dataset.orderId);
      renderAppScreen();
    });
  });
}

function bindSearchEvent() {
  const input = document.querySelector("#searchInput");

  if (!input) return;

  input.addEventListener("input", (e) => {
    setSearchText(e.target.value);
  });

  input.addEventListener("change", () => {
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

  shipButton.addEventListener("click", () => {
    const completedCount = completeSelectedOrders();

    if (completedCount === 0) return;

    renderAppScreen();
  });
}

export function createAppShell() {
  return `
    <div class="app-shell">
      <section class="splash-screen" id="splashScreen">
        <div class="splash-logo">PROPEL</div>
        <div class="splash-product">ScanGo Core</div>
        <div class="splash-subtitle">Daily Shipping Manager</div>
        <div class="splash-loader"></div>
      </section>

      <section class="app-screen is-hidden" id="appScreen"></section>
    </div>
  `;
}

export function startAppShell() {
  renderAppScreen();

  setTimeout(() => {
    document.querySelector("#splashScreen").classList.add("is-hidden");
    document.querySelector("#appScreen").classList.remove("is-hidden");
  }, 800);
}