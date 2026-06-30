import {
  getVisibleOrders,
  getSummary,
  getSearchText,
  getCurrentFilter,
  ORDER_FILTERS,
} from "../../store/orderStore.js";

import { createOrderList } from "../../components/order/OrderList.js";

export function createHomePage({ bottomAction }) {
  const orders = getVisibleOrders();
  const summary = getSummary();
  const searchText = getSearchText();
  const currentFilter = getCurrentFilter();

  return `
    <header class="app-header">
      <div class="header-top">
        <div>
          <h1 class="brand-title">PROPEL</h1>
          <p class="brand-subtitle">ScanGo Core</p>
        </div>
        <button class="icon-button" aria-label="새로고침">↻</button>
      </div>

      <div class="hero-message">
        <p class="hero-eyebrow">오늘 출고 관리</p>
        <h2>출고 예정 <strong>${summary.ready}건</strong></h2>
        <p>체크한 주문을 한 번에 출고완료 처리합니다.</p>
      </div>
    </header>

    <main class="app-main">
      <section class="summary-grid">
        <div class="card summary-card">
          <div class="summary-value">${summary.total}</div>
          <div class="summary-label">전체 주문</div>
        </div>
        <div class="card summary-card">
          <div class="summary-value warning">${summary.ready}</div>
          <div class="summary-label">출고대기</div>
        </div>
        <div class="card summary-card">
          <div class="summary-value success">${summary.done}</div>
          <div class="summary-label">출고완료</div>
        </div>
      </section>

      <section class="toolbar">
        <div class="search-box">
          <span>🔍</span>
          <input 
            id="searchInput"
            value="${searchText}"
            placeholder="주문번호, 수령인, 상품명 검색"
          />
        </div>

        <div class="filter-row">
          ${ORDER_FILTERS.map((filter) => `
            <button 
              class="filter-chip ${currentFilter === filter.value ? "active" : ""}"
              data-filter="${filter.value}"
            >
              ${filter.label}
            </button>
          `).join("")}
        </div>
      </section>

      ${createOrderList(orders)}
    </main>

    <div class="bottom-action">
      ${bottomAction}
    </div>
  `;
}