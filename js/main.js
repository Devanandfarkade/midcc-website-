document.addEventListener("DOMContentLoaded",()=>{
 const toggle=document.querySelector(".menu-toggle"),nav=document.querySelector(".nav");
 if(toggle)toggle.addEventListener("click",()=>nav.classList.toggle("open"));

 // Single-page navigation: every top menu item scrolls to a section on this page.
 document.querySelectorAll('a[href^="#"]').forEach(link=>{
   link.addEventListener('click',e=>{
     const id=link.getAttribute('href');
     if(!id || id==="#") return;
     const target=document.querySelector(id);
     if(!target) return;
     e.preventDefault();
     if(nav) nav.classList.remove('open');
     const headerHeight=(document.querySelector('.site-header')?.offsetHeight||66)+8;
     const top=target.getBoundingClientRect().top + window.scrollY - headerHeight;
     window.scrollTo({top:Math.max(0,top),behavior:'smooth'});
     history.replaceState(null,'',id);
   });
 });
 const navLinks=[...document.querySelectorAll('.nav a[href^="#"]')];
 const navSections=navLinks.map(a=>document.querySelector(a.getAttribute('href'))).filter(Boolean);
 const sectionObserver=new IntersectionObserver(entries=>{
   entries.forEach(entry=>{
     if(!entry.isIntersecting)return;
     navLinks.forEach(a=>a.classList.toggle('active',a.getAttribute('href')==='#'+entry.target.id));
   });
 },{rootMargin:'-30% 0px -60% 0px',threshold:0});
 navSections.forEach(section=>sectionObserver.observe(section));

 const items=[...document.querySelectorAll(".mnc-card,.feature-card,.infra-item,.dev-card,.future-grid article,.roadmap-card,.category-card")];
 items.forEach((el,i)=>el.style.transitionDelay=(i%6)*70+"ms");
 const observer=new IntersectionObserver(entries=>{
   entries.forEach(e=>{if(e.isIntersecting){e.target.classList.add("visible");observer.unobserve(e.target)}})
 },{threshold:.12});
 items.forEach(el=>{el.classList.add("reveal");observer.observe(el)});

 const counters=document.querySelectorAll("[data-count]");
 const counterObserver=new IntersectionObserver(entries=>{
   entries.forEach(e=>{
     if(!e.isIntersecting)return;
     const el=e.target,target=Number(el.dataset.count),suffix=el.textContent.includes("+")?"+":"";
     let start=0,duration=1200,t0=null;
     const tick=t=>{if(!t0)t0=t;const p=Math.min((t-t0)/duration,1),ease=1-Math.pow(1-p,3);el.textContent=(isDecimal ? (target*ease).toFixed(2) : Math.floor(target*ease).toLocaleString())+suffix;if(p<1)requestAnimationFrame(tick)};
     requestAnimationFrame(tick);counterObserver.unobserve(el);
   })
 },{threshold:.7});
 counters.forEach(el=>counterObserver.observe(el));

 if(window.kurkumbhCompanies&&document.getElementById("company-list")){
   const list=document.getElementById("company-list");
   window.kurkumbhCompanies.forEach((c,i)=>{
      const item=document.createElement("a");
      item.className="company-item";
      item.href=`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(c.name+", Kurkumbh MIDC, Daund, Maharashtra")}`;
      item.target="_blank"; item.rel="noopener";
      item.innerHTML=`<span class="company-num">${String(i+1).padStart(2,"0")}</span><span><b>${c.name}</b><small>${c.plot} · ${c.type}${c.verification ? " · " + c.verification : ""}</small></span>`;
      list.appendChild(item);
   });
 }

 // Work in Progress Login Modal trigger
 const loginBtn = document.getElementById("login-btn");
 const wipModal = document.getElementById("wip-modal");
 const wipClose = document.getElementById("wip-modal-close");
 const wipOk = document.getElementById("wip-modal-ok");

 if (loginBtn && wipModal) {
   loginBtn.addEventListener("click", (e) => {
     e.preventDefault();
     wipModal.style.display = "grid";
   });
 }

 const closeModal = () => {
   if (wipModal) wipModal.style.display = "none";
 };

 if (wipClose) wipClose.addEventListener("click", closeModal);
 if (wipOk) wipOk.addEventListener("click", closeModal);
 if (wipModal) {
   wipModal.addEventListener("click", (e) => {
     if (e.target === wipModal) closeModal();
   });
 }
});
