(function(){let e=document.createElement(`link`).relList;if(e&&e.supports&&e.supports(`modulepreload`))return;for(let e of document.querySelectorAll(`link[rel="modulepreload"]`))n(e);new MutationObserver(e=>{for(let t of e)if(t.type===`childList`)for(let e of t.addedNodes)e.tagName===`LINK`&&e.rel===`modulepreload`&&n(e)}).observe(document,{childList:!0,subtree:!0});function t(e){let t={};return e.integrity&&(t.integrity=e.integrity),e.referrerPolicy&&(t.referrerPolicy=e.referrerPolicy),e.crossOrigin===`use-credentials`?t.credentials=`include`:e.crossOrigin===`anonymous`?t.credentials=`omit`:t.credentials=`same-origin`,t}function n(e){if(e.ep)return;e.ep=!0;let n=t(e);fetch(e.href,n)}})();function e({id:e=`confirmModal`,title:t=`확인`,message:n=``,cancelText:r=`취소`,confirmText:i=`확인`,danger:a=!1}){return`
    <div class="confirm-modal-backdrop is-hidden" id="${e}">
      <div class="confirm-modal card">
        <div class="confirm-modal-icon">
          ${a?`⚠️`:`✅`}
        </div>

        <h3 class="confirm-modal-title">${t}</h3>

        <div class="confirm-modal-message">
          ${n}
        </div>

        <div class="confirm-modal-actions">
          <button
            type="button"
            class="confirm-modal-cancel"
            data-modal-cancel="${e}">
            ${r}
          </button>

          <button
            type="button"
            class="confirm-modal-confirm ${a?`danger`:``}"
            data-modal-confirm="${e}">
            ${i}
          </button>
        </div>
      </div>
    </div>
  `}var t=`https://script.google.com/macros/s/AKfycbxhFzR38qDi8vOvKktizsO5Jw7_rzF3lQBxNhOvHoAst2vOwCW2HA20xSFIt9VBEL4f/exec`;async function n(){let e=await fetch(`${t}?action=getAllOrders`);if(!e.ok)throw Error(`출고대기 주문 조회 실패`);let n=await e.json();if(!n.success)throw Error(n.message||`API 오류`);return n.data.orders}async function r(e){let n=`${t}?action=completeOrders&orderItemNos=${encodeURIComponent(JSON.stringify(e))}`,r=await fetch(n);if(!r.ok)throw Error(`출고완료 처리 실패`);let i=await r.json();if(!i.success)throw Error(i.message||`API 오류`);return i.data.result}async function i(e){let n=`${t}?action=cancelCompletedOrders&orderItemNos=${encodeURIComponent(JSON.stringify(e))}`,r=await fetch(n);if(!r.ok)throw Error(`출고취소 처리 실패`);let i=await r.json();if(!i.success)throw Error(i.message||`API 오류`);return i.data.result}var a={orders:[],searchText:``,filter:`ALL`,loading:!1},o=[{value:`ALL`,label:`전체`},{value:`READY`,label:`출고대기`},{value:`DONE`,label:`출고완료`}];function s(e){return{id:e.orderItemNo,orderItemNo:e.orderItemNo,orderNo:e.orderNo,productName:e.productName,orderQty:e.orderQty,receiver:e.receiver,shippingType:e.shippingType,status:e.status===`출고대기`?`READY`:e.status===`출고완료`?`DONE`:e.status,selected:!1}}async function c(){a.loading=!0;try{a.orders=(await n()).map(s)}finally{a.loading=!1}}function l(){return a.searchText}function u(){return a.filter}function d(){let e=[...a.orders];if(a.searchText.trim()){let t=a.searchText.trim().toLowerCase();e=e.filter(e=>e.id.toLowerCase().includes(t)||e.receiver.toLowerCase().includes(t)||e.productName.toLowerCase().includes(t))}return a.filter!==`ALL`&&(e=e.filter(e=>e.status===a.filter)),e.sort((e,t)=>{let n={READY:1,DONE:2};return(n[e.status]||99)-(n[t.status]||99)}),e}function f(){return a.orders.filter(e=>e.selected)}function p(){let e=d();return{total:e.length,ready:e.filter(e=>e.status===`READY`).length,done:e.filter(e=>e.status===`DONE`).length,selected:e.filter(e=>e.selected).length}}function m(e){a.orders=a.orders.map(t=>t.id!==e||t.status===`DONE`?t:{...t,selected:!t.selected})}function h(e){a.searchText=e}function g(e){a.filter=e}async function _(){let e=a.orders.filter(e=>e.selected&&e.status===`READY`);if(e.length===0)return 0;let t=await r(e.map(e=>e.orderItemNo));return await c(),t.completedCount||0}async function v(e){await i([e]),await c()}function y({checked:e=!1,disabled:t=!1}={}){return`
    <label class="pds-checkbox">
      <input
        type="checkbox"
        ${e?`checked`:``}
        ${t?`disabled`:``}
      />
      <span class="pds-checkbox-box"></span>
    </label>
  `}function b(e){let t=e.status===`DONE`,n=e.selected,r=t?`출고완료`:`출고대기`,i=t?`done`:`ready`,a=e.shippingType?e.shippingType:`배송방법 없음`;return`
    <article 
      class="order-card card ${t?`is-done`:``} ${n?`is-selected`:``}"
      data-order-id="${e.id}"
    >
      <div class="order-check">
        ${y({checked:n||t,disabled:t})}
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
          <span>📦 ${e.orderQty}개</span>
          <span>🚚 ${a}</span>
        </div>

        ${t?`
          <div class="order-actions">
            <button
              type="button"
              class="cancel-button"
              data-cancel-order-id="${e.id}">
              ↩ 출고취소
            </button>
          </div>
        `:``}
      </div>
    </article>
  `}function x(e){return`
    <section class="order-list" id="orderList">
      ${e.map(b).join(``)}
    </section>
  `}function S({bottomAction:e}){let t=d(),n=p(),r=l(),i=u();return`
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
            value="${r}"
            placeholder="주문번호, 수령인, 상품명 검색"
          />
        </div>

        <div class="filter-row">
          ${o.map(e=>`
            <button 
              class="filter-chip ${i===e.value?`active`:``}"
              data-filter="${e.value}"
            >
              ${e.label}
            </button>
          `).join(``)}
        </div>
      </section>

      ${x(t)}
    </main>

    <div class="bottom-action">
      ${e}
    </div>
  `}function C({id:e=``,text:t=`버튼`,variant:n=`primary`,disabled:r=!1}={}){return`
    <button 
      class="pds-button pds-button-${n}" 
      ${e?`id="${e}"`:``}
      ${r?`disabled`:``}
    >
      ${t}
    </button>
  `}var w=null;function T(){let e=f().length;return C({id:`shipButton`,text:e>0?`선택 ${e}건 출고완료`:`선택 0건`,variant:e>0?`primary`:`disabled`,disabled:e===0})}function E(){document.querySelector(`#appScreen`).innerHTML=S({bottomAction:T()}),D(),k(),O(),A(),j()}function D(){document.querySelectorAll(`.order-card`).forEach(e=>{e.addEventListener(`click`,e=>{let t=e.target.closest(`.order-card`);t&&(m(t.dataset.orderId),E())})})}function O(){let e=document.querySelector(`#searchInput`);e&&e.addEventListener(`keydown`,e=>{e.key===`Enter`&&(h(e.target.value),E())})}function k(){document.querySelectorAll(`.filter-chip`).forEach(e=>{e.addEventListener(`click`,()=>{g(e.dataset.filter),E()})})}function A(){let e=document.querySelector(`#shipButton`);e&&e.addEventListener(`click`,async()=>{try{e.disabled=!0,e.textContent=`출고 처리중...`;let t=await _();if(t===0){alert(`출고완료 처리된 주문이 없습니다.`),E();return}alert(`${t}건 출고완료 처리되었습니다.`),E()}catch(e){alert(`출고완료 처리 실패\n\n${e.message||e}`),console.error(e),E()}})}function j(){document.querySelectorAll(`[data-cancel-order-id]`).forEach(e=>{e.addEventListener(`click`,t=>{t.stopPropagation(),w=e.dataset.cancelOrderId,P(`cancelShipmentModal`)})})}function M(){document.querySelectorAll(`[data-modal-cancel]`).forEach(e=>{e.addEventListener(`click`,()=>{F(e.dataset.modalCancel),w=null})})}function N(){document.querySelectorAll(`[data-modal-confirm]`).forEach(e=>{e.addEventListener(`click`,async()=>{w&&(await v(w),F(`cancelShipmentModal`),w=null,E())})})}function P(e){let t=document.querySelector(`#${e}`);t&&t.classList.remove(`is-hidden`)}function F(e){let t=document.querySelector(`#${e}`);t&&t.classList.add(`is-hidden`)}function I(){return`
    <div class="app-shell">
      <section class="splash-screen" id="splashScreen">
        <div class="splash-logo">PROPEL</div>
        <div class="splash-product">ScanGo Core</div>
        <div class="splash-subtitle">Daily Shipping Manager</div>
        
      </section>

      <section class="app-screen is-hidden" id="appScreen"></section>
      ${e({id:`cancelShipmentModal`,title:`출고취소`,message:`선택한 주문의 출고를 취소하시겠습니까?`,cancelText:`아니오`,confirmText:`출고취소`,danger:!0})}
    </div>
  `}async function L(){try{await c()}catch(e){alert(`ERP 출고대기 목록을 불러오지 못했습니다.`),console.error(e)}E(),M(),N(),setTimeout(()=>{document.querySelector(`#splashScreen`).classList.add(`is-hidden`),document.querySelector(`#appScreen`).classList.remove(`is-hidden`)},800)}document.querySelector(`#app`).innerHTML=I(),L();