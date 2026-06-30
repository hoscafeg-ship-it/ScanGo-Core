(function(){let e=document.createElement(`link`).relList;if(e&&e.supports&&e.supports(`modulepreload`))return;for(let e of document.querySelectorAll(`link[rel="modulepreload"]`))n(e);new MutationObserver(e=>{for(let t of e)if(t.type===`childList`)for(let e of t.addedNodes)e.tagName===`LINK`&&e.rel===`modulepreload`&&n(e)}).observe(document,{childList:!0,subtree:!0});function t(e){let t={};return e.integrity&&(t.integrity=e.integrity),e.referrerPolicy&&(t.referrerPolicy=e.referrerPolicy),e.crossOrigin===`use-credentials`?t.credentials=`include`:e.crossOrigin===`anonymous`?t.credentials=`omit`:t.credentials=`same-origin`,t}function n(e){if(e.ep)return;e.ep=!0;let n=t(e);fetch(e.href,n)}})();var e={orders:[{id:`20240629-0001`,receiver:`홍길동`,productName:`프로펠 전동 핸드 파레트트럭 PPF2000`,qty:1,status:`READY`,invoiceNo:``},{id:`20240629-0002`,receiver:`김철수`,productName:`프로펠 브로워 PBW-30`,qty:2,status:`READY`,invoiceNo:`CJ1234567890`},{id:`20240629-0003`,receiver:`이영희`,productName:`프로펠 양수기 PW-80`,qty:1,status:`DONE`,invoiceNo:``}].map(e=>({...e,selected:!1})),searchText:``,filter:`ALL`,loading:!1},t=[{value:`ALL`,label:`전체`},{value:`READY`,label:`출고대기`},{value:`DONE`,label:`출고완료`}];function n(){return e.searchText}function r(){return e.filter}function i(){let t=[...e.orders];if(e.searchText.trim()){let n=e.searchText.trim().toLowerCase();t=t.filter(e=>e.id.toLowerCase().includes(n)||e.receiver.toLowerCase().includes(n)||e.productName.toLowerCase().includes(n))}return e.filter!==`ALL`&&(t=t.filter(t=>t.status===e.filter)),t}function a(){return e.orders.filter(e=>e.selected)}function o(){let e=i();return{total:e.length,ready:e.filter(e=>e.status===`READY`).length,done:e.filter(e=>e.status===`DONE`).length,selected:e.filter(e=>e.selected).length}}function s(t){e.orders=e.orders.map(e=>e.id!==t||e.status===`DONE`?e:{...e,selected:!e.selected})}function c(t){e.searchText=t}function l(t){e.filter=t}function u(){let t=0;return e.orders=e.orders.map(e=>!e.selected||e.status!==`READY`?e:(t++,{...e,status:`DONE`,selected:!1})),t}function d({checked:e=!1,disabled:t=!1}={}){return`
    <label class="pds-checkbox">
      <input
        type="checkbox"
        ${e?`checked`:``}
        ${t?`disabled`:``}
      />
      <span class="pds-checkbox-box"></span>
    </label>
  `}function f(e){let t=e.status===`DONE`,n=e.selected,r=t?`출고완료`:`출고대기`,i=t?`done`:`ready`,a=e.invoiceNo?e.invoiceNo:`운송장 없음`;return`
    <article 
      class="order-card card ${t?`is-done`:``} ${n?`is-selected`:``}"
      data-order-id="${e.id}"
    >
<div class="order-check">
  ${d({checked:n,disabled:t})}
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
          <span>Qty ${e.qty}</span>
          <span>🚚 ${a}</span>
        </div>
      </div>
    </article>
  `}function p(e){return`
    <section class="order-list" id="orderList">
      ${e.map(f).join(``)}
    </section>
  `}function m({bottomAction:e}){let a=i(),s=o(),c=n(),l=r();return`
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
        <h2>출고 예정 <strong>${s.ready}건</strong></h2>
        <p>체크한 주문을 한 번에 출고완료 처리합니다.</p>
      </div>
    </header>

    <main class="app-main">
      <section class="summary-grid">
        <div class="card summary-card">
          <div class="summary-value">${s.total}</div>
          <div class="summary-label">전체 주문</div>
        </div>
        <div class="card summary-card">
          <div class="summary-value warning">${s.ready}</div>
          <div class="summary-label">출고대기</div>
        </div>
        <div class="card summary-card">
          <div class="summary-value success">${s.done}</div>
          <div class="summary-label">출고완료</div>
        </div>
      </section>

      <section class="toolbar">
        <div class="search-box">
          <span>🔍</span>
          <input 
            id="searchInput"
            value="${c}"
            placeholder="주문번호, 수령인, 상품명 검색"
          />
        </div>

        <div class="filter-row">
          ${t.map(e=>`
            <button 
              class="filter-chip ${l===e.value?`active`:``}"
              data-filter="${e.value}"
            >
              ${e.label}
            </button>
          `).join(``)}
        </div>
      </section>

      ${p(a)}
    </main>

    <div class="bottom-action">
      ${e}
    </div>
  `}function h({id:e=``,text:t=`버튼`,variant:n=`primary`,disabled:r=!1}={}){return`
    <button 
      class="pds-button pds-button-${n}" 
      ${e?`id="${e}"`:``}
      ${r?`disabled`:``}
    >
      ${t}
    </button>
  `}function g(){let e=a().length;return h({id:`shipButton`,text:e>0?`선택 ${e}건 출고완료`:`선택 0건`,variant:e>0?`primary`:`disabled`,disabled:e===0})}function _(){document.querySelector(`#appScreen`).innerHTML=m({bottomAction:g()}),v(),b(),y(),x()}function v(){document.querySelectorAll(`.order-card`).forEach(e=>{e.addEventListener(`click`,()=>{s(e.dataset.orderId),_()})})}function y(){let e=document.querySelector(`#searchInput`);e&&(e.addEventListener(`input`,e=>{c(e.target.value)}),e.addEventListener(`change`,()=>{_()}))}function b(){document.querySelectorAll(`.filter-chip`).forEach(e=>{e.addEventListener(`click`,()=>{l(e.dataset.filter),_()})})}function x(){let e=document.querySelector(`#shipButton`);e&&e.addEventListener(`click`,()=>{u()!==0&&_()})}function S(){return`
    <div class="app-shell">
      <section class="splash-screen" id="splashScreen">
        <div class="splash-logo">PROPEL</div>
        <div class="splash-product">ScanGo Core</div>
        <div class="splash-subtitle">Daily Shipping Manager</div>
        <div class="splash-loader"></div>
      </section>

      <section class="app-screen is-hidden" id="appScreen"></section>
    </div>
  `}function C(){_(),setTimeout(()=>{document.querySelector(`#splashScreen`).classList.add(`is-hidden`),document.querySelector(`#appScreen`).classList.remove(`is-hidden`)},800)}document.querySelector(`#app`).innerHTML=S(),C();