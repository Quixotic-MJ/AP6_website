/**
 * Modal Component for Mark Institute of Technology
 * Handles:
 *  - Modal.detail(title, kicker, fields)
 *  - Modal.form(title, kicker, fields, onSubmit)
 *  - Modal.confirm(title, message, onConfirm, options)
 *  - Modal.close()
 */
const Modal = (function(){
  function ensureStyles(){
    if (!document.getElementById('global-modal-styles')) {
      const style = document.createElement('style');
      style.id = 'global-modal-styles';
      style.textContent = `
        .modal-overlay{
          position:fixed; inset:0; background:rgba(5,7,12,0.82);
          backdrop-filter:blur(8px); -webkit-backdrop-filter:blur(8px);
          display:none; align-items:center; justify-content:center;
          padding:20px; z-index:1000;
        }
        .modal-overlay.open{display:flex;}
        .modal-card{
          background:#0d121f; border:1px solid #1c2538; border-radius:12px;
          width:100%; max-width:440px; max-height:88vh; overflow-y:auto;
          font-family:'Inter', sans-serif; color:#ECEDF5;
          box-shadow:0 24px 60px rgba(0,0,0,0.7), 0 0 0 1px rgba(255,111,89,0.15);
          animation:modal-in .16s ease;
        }
        @keyframes modal-in{
          from{opacity:0; transform:translateY(8px) scale(.98);}
          to{opacity:1; transform:translateY(0) scale(1);}
        }
        .modal-titlebar{
          display:flex; align-items:center; justify-content:space-between;
          padding:16px 20px; border-bottom:1px solid #1c2538;
        }
        .modal-kicker{
          font-family:'JetBrains Mono', monospace; font-size:11px; color:#FF6F59;
          text-transform:uppercase; letter-spacing:0.06em;
          margin:0 0 4px;
        }
        .modal-title{font-size:16px; font-weight:700; margin:0; color:#ECEDF5;}
        .modal-close{
          background:transparent; border:none; color:#8A8FA8; font-size:22px;
          line-height:1; cursor:pointer; padding:4px 8px; border-radius:6px;
          transition:all .15s ease;
        }
        .modal-close:hover{color:#ECEDF5; background:rgba(255,255,255,0.08);}
        .modal-body{padding:20px;}
        .modal-body p{color:#8A8FA8; font-size:14px; line-height:1.6; margin:0 0 14px;}
        .modal-footer{
          display:flex; justify-content:flex-end; gap:10px;
          padding:16px 20px; border-top:1px solid #1c2538;
          background:rgba(0,0,0,0.2);
        }
        .modal-btn{
          font-family:'Inter', sans-serif; font-weight:600; font-size:13.5px;
          padding:9px 18px; border-radius:7px; border:1px solid transparent; cursor:pointer;
          transition:all .15s ease;
        }
        .modal-btn-ghost{background:transparent; border-color:#1c2538; color:#ECEDF5;}
        .modal-btn-ghost:hover{border-color:#8A8FA8; background:rgba(255,255,255,0.04);}
        .modal-btn-primary{background:#F7DF1E; color:#05070c;}
        .modal-btn-primary:hover{filter:brightness(1.08);}
        .modal-btn-danger{background:#FF6F59; color:#05070c;}
        .modal-btn-danger:hover{filter:brightness(1.1); transform:translateY(-1px); box-shadow:0 4px 12px rgba(255,111,89,0.35);}
      `;
      document.head.appendChild(style);
    }
  }

  function getElements(){
    ensureStyles();
    let overlay = document.getElementById('modalOverlay');
    let card = document.getElementById('modalCard');
    if (!overlay) {
      overlay = document.createElement('div');
      overlay.className = 'modal-overlay';
      overlay.id = 'modalOverlay';
      card = document.createElement('div');
      card.className = 'modal-card';
      card.id = 'modalCard';
      overlay.appendChild(card);
      document.body.appendChild(overlay);

      overlay.addEventListener('click', (e) => {
        if (e.target === overlay) close();
      });
      document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') close();
      });
    }
    return { overlay, card };
  }

  function close(){
    const { overlay, card } = getElements();
    overlay.classList.remove('open');
    card.innerHTML = '';
  }

  function open(html){
    const { overlay, card } = getElements();
    card.innerHTML = html;
    overlay.classList.add('open');
  }

  // Setup listeners on existing elements if present in DOM
  const existingOverlay = document.getElementById('modalOverlay');
  if (existingOverlay) {
    existingOverlay.addEventListener('click', (e) => {
      if (e.target === existingOverlay) close();
    });
  }
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') close();
  });

  function detail(title, kicker, fields){
    const rows = fields.map(f =>
      `<div class="modal-detail-row">
         <span class="modal-detail-label">${f.label}</span>
         <span class="modal-detail-value">${f.value}</span>
       </div>`
    ).join('');

    open(`
      <div class="modal-titlebar">
        <div>
          <p class="modal-kicker">${kicker || ''}</p>
          <h3 class="modal-title">${title}</h3>
        </div>
        <button class="modal-close" data-close>&times;</button>
      </div>
      <div class="modal-body">${rows}</div>
      <div class="modal-footer">
        <button class="modal-btn modal-btn-ghost" data-close>Close</button>
      </div>
    `);
    const { card } = getElements();
    card.querySelectorAll('[data-close]').forEach(b => b.addEventListener('click', close));
  }

  function form(title, kicker, fields, onSubmit){
    const fieldsHtml = fields.map(f => {
      const tag = f.type === 'textarea' ? 'textarea' : 'input';
      const typeAttr = f.type === 'textarea' ? '' : `type="${f.type || 'text'}"`;
      return `
        <div class="modal-field">
          <label>${f.label}</label>
          <${tag} id="mf_${f.id}" ${typeAttr} placeholder="${f.placeholder || ''}" ${f.required ? 'required' : ''}></${tag}>
          <p class="modal-error" id="mf_${f.id}_err">This field is required.</p>
        </div>`;
    }).join('');

    open(`
      <div class="modal-titlebar">
        <div>
          <p class="modal-kicker">${kicker || ''}</p>
          <h3 class="modal-title">${title}</h3>
        </div>
        <button class="modal-close" data-close>&times;</button>
      </div>
      <div class="modal-body">${fieldsHtml}</div>
      <div class="modal-footer">
        <button class="modal-btn modal-btn-ghost" data-close>Cancel</button>
        <button class="modal-btn modal-btn-primary" id="modalSubmitBtn">Submit</button>
      </div>
    `);

    const { card } = getElements();
    card.querySelectorAll('[data-close]').forEach(b => b.addEventListener('click', close));

    document.getElementById('modalSubmitBtn').addEventListener('click', () => {
      const values = {};
      let valid = true;

      fields.forEach(f => {
        const input = document.getElementById(`mf_${f.id}`);
        const err = document.getElementById(`mf_${f.id}_err`);
        const val = input.value.trim();

        let fieldValid = true;
        if (f.required && val === '') fieldValid = false;
        if (f.type === 'email' && val !== '' && !val.includes('@')) fieldValid = false;

        err.classList.toggle('show', !fieldValid);
        if (!fieldValid) valid = false;
        values[f.id] = val;
      });

      if (!valid) return;

      const result = onSubmit ? onSubmit(values) : true;
      if (result !== false) close();
    });
  }

  function confirm(title, message, onConfirm, options){
    options = options || {};
    const confirmLabel = options.confirmLabel || 'Confirm';
    const cancelLabel = options.cancelLabel || 'Cancel';
    const btnClass = options.danger ? 'modal-btn-danger' : 'modal-btn-primary';
    const kickerHtml = options.kicker ? `<p class="modal-kicker">${options.kicker}</p>` : '';

    open(`
      <div class="modal-titlebar">
        <div>
          ${kickerHtml}
          <h3 class="modal-title">${title}</h3>
        </div>
        <button class="modal-close" data-close>&times;</button>
      </div>
      <div class="modal-body"><p>${message}</p></div>
      <div class="modal-footer">
        <button class="modal-btn modal-btn-ghost" data-close>${cancelLabel}</button>
        <button class="modal-btn ${btnClass}" id="modalConfirmBtn">${confirmLabel}</button>
      </div>
    `);

    const { card } = getElements();
    card.querySelectorAll('[data-close]').forEach(b => b.addEventListener('click', close));
    document.getElementById('modalConfirmBtn').addEventListener('click', () => {
      if (onConfirm) onConfirm();
      close();
    });
  }

  return { detail, form, confirm, close };
})();
