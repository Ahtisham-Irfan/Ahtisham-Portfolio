// ---------- tab switching (sidebar + tabbar share same data-tab) ----------
  const tabs = document.querySelectorAll('.tree-item, .tab');
  const panes = document.querySelectorAll('.pane');
  const statusRight = document.getElementById('statusRight');

  function activate(name){
    document.querySelectorAll('.tree-item').forEach(t=>t.classList.toggle('active', t.dataset.tab===name));
    document.querySelectorAll('.tab').forEach(t=>{
      const isActive = t.dataset.tab===name;
      t.classList.toggle('active', isActive);
      t.setAttribute('aria-selected', isActive ? 'true':'false');
    });
    panes.forEach(p=>p.classList.toggle('active', p.id===name));
    statusRight.textContent = 'Ln 1, Col 1 · UTF-8 · ' + name + '.py';
    // close mobile sidebar after choosing
    sidebar.classList.remove('open');
    menuToggle.setAttribute('aria-expanded','false');
  }

  tabs.forEach(t=>t.addEventListener('click', ()=>activate(t.dataset.tab)));

  // ---------- mobile sidebar toggle ----------
  const sidebar = document.getElementById('sidebar');
  const menuToggle = document.getElementById('menuToggle');
  menuToggle.addEventListener('click', ()=>{
    const open = sidebar.classList.toggle('open');
    menuToggle.setAttribute('aria-expanded', open ? 'true':'false');
  });

  // ---------- commit expand/collapse ----------
  document.querySelectorAll('.commit').forEach(c=>{
    c.addEventListener('click', ()=>{
      const wasOpen = c.classList.contains('open');
      c.classList.toggle('open');
      const toggleLabel = c.querySelector('.commit-toggle');
      if(toggleLabel) toggleLabel.textContent = wasOpen ? 'click to expand ▾' : 'click to collapse ▴';
    });
  });

  // ---------- typing effect for hero subline ----------
  const lines = [
    'Frontend Developer.',
    'Python & AI Developer.',
    'Graphic Designer.',
    'Building things that work, and look good doing it.'
  ];
  const target = document.getElementById('typeTarget');
  const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  if(reduceMotion){
    target.textContent = lines.join('  ·  ');
  } else {
    let li = 0, ci = 0, deleting = false;
    function tick(){
      const current = lines[li];
      if(!deleting){
        ci++;
        target.textContent = current.slice(0, ci);
        if(ci === current.length){
          deleting = true;
          setTimeout(tick, 1400);
          return;
        }
      } else {
        ci--;
        target.textContent = current.slice(0, ci);
        if(ci === 0){
          deleting = false;
          li = (li+1) % lines.length;
        }
      }
      setTimeout(tick, deleting ? 28 : 46);
    }
    tick();
    // append blinking cursor node
    const cursorSpan = document.createElement('span');
    cursorSpan.className = 'cursor';
    target.after(cursorSpan);
  }
