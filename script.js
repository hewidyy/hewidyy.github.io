'use strict';
const menu = document.querySelector('.menu-toggle');
const nav = document.querySelector('#navigation');

function closeMenu() {
  menu.setAttribute('aria-expanded', 'false');
  menu.setAttribute('aria-label', 'Open navigation');
  nav.classList.remove('open');
}

menu.addEventListener('click', () => {
  const open = menu.getAttribute('aria-expanded') !== 'true';
  menu.setAttribute('aria-expanded', String(open));
  menu.setAttribute('aria-label', open ? 'Close navigation' : 'Open navigation');
  nav.classList.toggle('open', open);
});
nav.querySelectorAll('a').forEach(link => link.addEventListener('click', closeMenu));
document.addEventListener('keydown', event => {
  if (event.key === 'Escape' && menu.getAttribute('aria-expanded') === 'true') {
    closeMenu();
    menu.focus();
  }
});

// Reset mobile navigation when moving back to a wider layout.
const mobileLayout = window.matchMedia('(max-width: 620px)');
mobileLayout.addEventListener('change', event => {
  if (!event.matches) closeMenu();
});

const filters = [...document.querySelectorAll('.filter')];
const projects = [...document.querySelectorAll('.project')];
filters.forEach(button => {
  const category = button.dataset.filter;
  button.querySelector('span').textContent = String(projects.filter(project =>
    category === 'all' || project.dataset.category === category
  ).length);
  button.addEventListener('click', () => {
    filters.forEach(filter => {
      const active = filter === button;
      filter.classList.toggle('active', active);
      filter.setAttribute('aria-pressed', String(active));
    });
    let count = 0;
    projects.forEach(project => {
      project.hidden = category !== 'all' && project.dataset.category !== category;
      if (!project.hidden) count++;
    });
    document.querySelector('#filter-status').textContent =
      `Showing ${count} ${count === 1 ? 'project' : 'projects'}.`;
  });
});

// Highlight the section being read without changing keyboard focus.
if ('IntersectionObserver' in window) {
  const navLinks = [...nav.querySelectorAll('a')];
  const visibleSections = new Set();
  const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) visibleSections.add(entry.target.id);
      else visibleSections.delete(entry.target.id);
    });
    const current = navLinks.find(link => visibleSections.has(link.hash.slice(1)));
    navLinks.forEach(link => {
      if (link === current) link.setAttribute('aria-current', 'location');
      else link.removeAttribute('aria-current');
    });
  }, { rootMargin: '-15% 0px -45% 0px', threshold: 0 });
  navLinks.forEach(link => observer.observe(document.querySelector(link.hash)));
}

const cases={
 support:{title:'SupportPilot',subtitle:'AI customer support · Make.com · Two connected scenarios',overview:'SupportPilot is an AI customer-support assistant for an online store. The main agent works with a separate Evidence Toolbox scenario to retrieve information before drafting a response.',details:['Looks up orders and matches customer email details.','Retrieves relevant policies and assesses return eligibility.','Creates English and Arabic reply drafts with evidence citations.','Uses refund validation, human handoffs, and error handling.'],note:'Live-tested across 10 demo cases using synthetic data. The preview on this portfolio is an illustration of the workflow, rather than a live connection to the agent.'},
 clinic:{title:'ClinicFlow',subtitle:'Clinic workflow automation · Make.com',overview:'Designed and built an end-to-end automation system for a family clinic. This project applies automation to a real clinic workflow and demonstrates practical scenario design.',details:['Built a connected workflow around clinic operations.','Used Make.com to implement the automation.','Developed a portfolio project based on a real working process.'],note:'The diagram on this portfolio is a simplified workflow overview. It does not display patient information.'},
 payment:{title:'Payment Processing',subtitle:'Transaction processing & idempotency · Make.com',overview:'Built a Make.com automation that handles payment transaction webhooks. The central requirement is to prevent the same transaction from being processed more than once.',details:['Receives payment transaction events through webhooks.','Applies idempotency handling to identify duplicate transaction events.','Prevents repeated processing when a webhook is received again.'],note:'The preview illustrates the processing logic. It does not show real transactions or connect to a payment account.'},
 estate:{title:'Real Estate Website',subtitle:'Front-end development · React + Tailwind CSS',overview:'Built property listing pages with a focus on a clear presentation of properties and accessible contact areas.',details:['Created property listing cards.','Implemented hover overlays.','Built hero and contact sections.','Used React and Tailwind CSS for the front end.'],note:'The visual on this portfolio is an illustrative UI concept, rather than a screenshot or a link to a live real estate business.'}
};
const dialog=document.querySelector('#project-dialog');
const content=document.querySelector('#dialog-content');
let lastTrigger=null;
document.querySelectorAll('[data-case]').forEach(button=>button.addEventListener('click',()=>{const item=cases[button.dataset.case];if(!item)return;lastTrigger=button;content.replaceChildren();const title=document.createElement('h2');title.id='dialog-title';title.textContent=item.title;const sub=document.createElement('p');sub.className='dialog-subtitle';sub.textContent=item.subtitle;const overviewHeading=document.createElement('h3');overviewHeading.textContent='The project';const overview=document.createElement('p');overview.textContent=item.overview;const detailHeading=document.createElement('h3');detailHeading.textContent='What I built';const list=document.createElement('ul');item.details.forEach(text=>{const li=document.createElement('li');li.textContent=text;list.append(li);});const note=document.createElement('p');note.className='dialog-note';note.textContent=item.note;content.append(title,sub,overviewHeading,overview,detailHeading,list,note);dialog.showModal();document.body.classList.add('body-locked');document.querySelector('.dialog-close').focus();}));
document.querySelector('.dialog-close').addEventListener('click',()=>dialog.close());
dialog.addEventListener('click',event=>{if(event.target===dialog){const r=dialog.getBoundingClientRect();if(event.clientX<r.left||event.clientX>r.right||event.clientY<r.top||event.clientY>r.bottom)dialog.close();}});
dialog.addEventListener('close',()=>{document.body.classList.remove('body-locked');if(lastTrigger)lastTrigger.focus();});
document.querySelector('.copy-email').addEventListener('click',async()=>{const status=document.querySelector('#copy-status');try{await navigator.clipboard.writeText('mahmoudhewidy4@icloud.com');status.textContent='Email copied';}catch{status.textContent='Email: mahmoudhewidy4@icloud.com';}window.setTimeout(()=>{status.textContent='';},3500);});
document.querySelector('#year').textContent=String(new Date().getFullYear());
