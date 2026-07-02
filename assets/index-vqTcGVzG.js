(function(){let e=document.createElement(`link`).relList;if(e&&e.supports&&e.supports(`modulepreload`))return;for(let e of document.querySelectorAll(`link[rel="modulepreload"]`))n(e);new MutationObserver(e=>{for(let t of e)if(t.type===`childList`)for(let e of t.addedNodes)e.tagName===`LINK`&&e.rel===`modulepreload`&&n(e)}).observe(document,{childList:!0,subtree:!0});function t(e){let t={};return e.integrity&&(t.integrity=e.integrity),e.referrerPolicy&&(t.referrerPolicy=e.referrerPolicy),e.crossOrigin===`use-credentials`?t.credentials=`include`:e.crossOrigin===`anonymous`?t.credentials=`omit`:t.credentials=`same-origin`,t}function n(e){if(e.ep)return;e.ep=!0;let n=t(e);fetch(e.href,n)}})();var e=`https://script.google.com/macros/s/AKfycbxhFzR38qDi8vOvKktizsO5Jw7_rzF3lQBxNhOvHoAst2vOwCW2HA20xSFIt9VBEL4f/exec`;async function t(){let t=await fetch(`${e}?action=getReadyOrders`);if(!t.ok)throw Error(`출고대기 주문 조회 실패`);let n=await t.json();if(!n.success)throw Error(n.message||`API 오류`);return n.data.orders}var n={orders:[],searchText:``,filter:`ALL`,loading:!1},r=[{value:`ALL`,label:`전체`},{value:`READY`,label:`출고대기`},{value:`DONE`,label:`출고완료`}];function i(e){return{id:e.orderItemNo,orderItemNo:e.orderItemNo,orderNo:e.orderNo,productName:e.productName,orderQty:e.orderQty,receiver:e.receiver,shippingType:e.shippingType,status:e.status===`출고대기`?`READY`:e.status,selected:!1}}async function a(){n.loading=!0;try{n.orders=(await t()).map(i)}finally{n.loading=!1}}function o(){return n.searchText}function s(){return n.filter}function c(){let e=[...n.orders];if(n.searchText.trim()){let t=n.searchText.trim().toLowerCase();e=e.filter(e=>e.id.toLowerCase().includes(t)||e.receiver.toLowerCase().includes(t)||e.productName.toLowerCase().includes(t))}return n.filter!==`ALL`&&(e=e.filter(e=>e.status===n.filter)),e}function l(){return n.orders.filter(e=>e.selected)}function u(){let e=c();return{total:e.length,ready:e.filter(e=>e.status===`READY`).length,done:e.filter(e=>e.status===`DONE`).length,selected:e.filter(e=>e.selected).length}}function d(e){n.orders=n.orders.map(t=>t.id!==e||t.status===`DONE`?t:{...t,selected:!t.selected})}function f(e){n.searchText=e}function p(e){n.filter=e}function m(){let e=0;return n.orders=n.orders.map(t=>!t.selected||t.status!==`READY`?t:(e++,{...t,status:`DONE`,selected:!1})),e}function h({checked:e=!1,disabled:t=!1}={}){return`
    <label class="pds-checkbox">
      <input
        type="checkbox"
        ${e?`checked`:``}
        ${t?`disabled`:``}
      />
      <span class="pds-checkbox-box"></span>
    </label>
  `}function g(e){let t=e.status===`DONE`,n=e.selected,r=t?`출고완료`:`출고대기`,i=t?`done`:`ready`,a=e.shippingType?e.shippingType:`운송장 없음`;return`
    <article 
      class="order-card card ${t?`is-done`:``} ${n?`is-selected`:``}"
      data-order-id="${e.id}"
    >
<div class="order-check">
  ${h({checked:n,disabled:t})}
</div>

      <div class="order-content">
        <div class="order-top">
          <strong class="order-id">${e.id}</strong>
          <span class="status-badge ${i}">${r}</span>
        </div>

        <div class="order-line">
          <span class="order-icon">👤</span>
          <strong>${e.receiver}</strong>
        </div>

        <div class="order-line product-line">
          <span class="order-icon">📦</span>
          <span>${e.productName}</span>
        </div>

        <div class="order-meta">
          <span>Qty ${e.orderQty}</span>
          <span>🚚 ${a}</span>
        </div>
      </div>
    </article>
  `}function _(e){return`
    <section class="order-list" id="orderList">
      ${e.map(g).join(``)}
    </section>
  `}function v({bottomAction:e}){let t=c(),n=u(),i=o(),a=s();return`
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
        <h2>출고 예정 <strong>${n.ready}건</strong></h2>
        <p>
CJ · 경동 배송을 확인하고 출고하세요.
</p>
      </div>
    </header>

    <main class="app-main">
      <section class="summary-grid">
        <div class="card summary-card">
          <div class="summary-value">${n.total}</div>
          <div class="summary-label">전체 주문</div>
        </div>
        <div class="card summary-card">
          <div class="summary-value warning">${n.ready}</div>
          <div class="summary-label">출고대기</div>
        </div>
        <div class="card summary-card">
          <div class="summary-value success">${n.done}</div>
          <div class="summary-label">출고완료</div>
        </div>
      </section>

      <section class="toolbar">
        <div class="search-box">
          <span>🔍</span>
          <input 
            id="searchInput"
            value="${i}"
            placeholder="주문번호, 수령인, 상품명 검색"
          />
        </div>

        <div class="filter-row">
          ${r.map(e=>`
            <button 
              class="filter-chip ${a===e.value?`active`:``}"
              data-filter="${e.value}"
            >
              ${e.label}
            </button>
          `).join(``)}
        </div>
      </section>

      ${_(t)}
    </main>

    <div class="bottom-action">
      ${e}
    </div>
  `}function y({id:e=``,text:t=`버튼`,variant:n=`primary`,disabled:r=!1}={}){return`
    <button 
      class="pds-button pds-button-${n}" 
      ${e?`id="${e}"`:``}
      ${r?`disabled`:``}
    >
      ${t}
    </button>
  `}function b(){let e=l().length;return y({id:`shipButton`,text:e>0?`선택 ${e}건 출고완료`:`선택 0건`,variant:e>0?`primary`:`disabled`,disabled:e===0})}function x(){document.querySelector(`#appScreen`).innerHTML=v({bottomAction:b()}),S(),w(),C(),T()}function S(){document.querySelectorAll(`.order-card`).forEach(e=>{e.addEventListener(`click`,e=>{let t=e.target.closest(`.order-card`);t&&(d(t.dataset.orderId),x())})})}function C(){let e=document.querySelector(`#searchInput`);e&&e.addEventListener(`keydown`,e=>{e.key===`Enter`&&(f(e.target.value),x())})}function w(){document.querySelectorAll(`.filter-chip`).forEach(e=>{e.addEventListener(`click`,()=>{p(e.dataset.filter),x()})})}function T(){let e=document.querySelector(`#shipButton`);e&&e.addEventListener(`click`,()=>{m()!==0&&x()})}function E(){return`
    <div class="app-shell">
      <section class="splash-screen" id="splashScreen">
        <div class="splash-logo">PROPEL</div>
        <div class="splash-product">ScanGo Core</div>
        <div class="splash-subtitle">Daily Shipping Manager</div>
        
      </section>

      <section class="app-screen is-hidden" id="appScreen"></section>
    </div>
  `}async function D(){try{await a()}catch(e){alert(`ERP 출고대기 목록을 불러오지 못했습니다.`),console.error(e)}x(),setTimeout(()=>{document.querySelector(`#splashScreen`).classList.add(`is-hidden`),document.querySelector(`#appScreen`).classList.remove(`is-hidden`)},800)}document.querySelector(`#app`).innerHTML=E(),D();