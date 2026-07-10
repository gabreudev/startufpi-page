// Header background change on scroll
const header = document.getElementById('header');
window.addEventListener('scroll', () => {
  if (window.scrollY > 50) {
    header.classList.add('scrolled');
  } else {
    header.classList.remove('scrolled');
  }
});

// Mobile Hamburger Menu
const hamburger = document.getElementById('hamburger');
const navLinks = document.getElementById('navLinks');

if (hamburger && navLinks) {
  hamburger.addEventListener('click', () => {
    navLinks.classList.toggle('open');
    const spans = hamburger.querySelectorAll('span');
    if (navLinks.classList.contains('open')) {
      spans[0].style.transform = 'rotate(45deg) translate(5px, 5px)';
      spans[1].style.opacity = '0';
      spans[2].style.transform = 'rotate(-45deg) translate(5px, -5px)';
    } else {
      spans[0].style.transform = '';
      spans[1].style.opacity = '';
      spans[2].style.transform = '';
    }
  });

  // Close menu on nav link click
  navLinks.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => {
      navLinks.classList.remove('open');
      const spans = hamburger.querySelectorAll('span');
      spans[0].style.transform = '';
      spans[1].style.opacity = '';
      spans[2].style.transform = '';
    });
  });
}

// Timeline Data for Day Swapping
const timelineData = {
  day1: [
    { time: '14/07 - 22/08', title: 'Inscrições & Submissão', desc: 'Formação de equipes e envio das propostas de ideias alinhadas aos ODS.' },
    { time: '25/08 - 29/08', title: 'Homologação das Inscrições', desc: 'Banca realiza triagem técnica e documentacional das equipes cadastradas.' },
    { time: 'Setembro', title: 'Resultado dos Classificados', desc: 'Publicação oficial das equipes selecionadas para a fase de aceleração.' }
  ],
  day2: [
    { time: 'Outubro', title: 'Imersão & Mentorias Individuais', desc: 'Acompanhamento direto para ajustes de proposta de valor e mercado.' },
    { time: 'Novembro', title: 'Apoio de Protótipo', desc: 'Sessões práticas para desenvolvimento físico ou digital da solução.' },
    { time: '20/11', title: 'Submissão de Protótipo e Relatório', desc: 'Entrega final da validação do produto mínimo viável (MVP).' }
  ],
  day3: [
    { time: '01/12 - 05/12', title: 'Pré-Pitch e Ajustes Finos', desc: 'Apresentações simuladas com feedbacks dos especialistas convidados.' },
    { time: 'Dezembro', title: 'Demoday & Pitch Final', desc: 'Grande apresentação para a banca avaliadora com investidores do PI.' },
    { time: 'Dezembro', title: 'Resultado e Premiação', desc: 'Anúncio dos três primeiros lugares e entrega das bolsas correspondentes.' }
  ]
};

// Timeline switcher
const timelineContainer = document.getElementById('timeline-container');
const tabs = document.querySelectorAll('.agenda-tab');

if (timelineContainer && tabs.length > 0) {
  tabs.forEach(tab => {
    tab.addEventListener('click', (e) => {
      // Remove active from all tabs
      tabs.forEach(t => t.classList.remove('active'));
      // Add active to current tab
      tab.classList.add('active');
      
      const day = tab.getAttribute('data-day');
      renderTimeline(day);
    });
  });
}

function renderTimeline(dayKey) {
  if (!timelineContainer || !timelineData[dayKey]) return;
  
  timelineContainer.innerHTML = '';
  
  timelineData[dayKey].forEach((item, index) => {
    const activeClass = index === 0 ? 'active' : '';
    const itemHTML = `
      <div class="timeline-item ${activeClass}">
        <div class="timeline-time">${item.time}</div>
        <div class="timeline-dot"></div>
        <div class="timeline-content">
          <h4>${item.title}</h4>
          <p>${item.desc}</p>
        </div>
      </div>
    `;
    timelineContainer.innerHTML += itemHTML;
  });

  // Re-attach active state shifting effect on hover/click of items
  const items = timelineContainer.querySelectorAll('.timeline-item');
  items.forEach(item => {
    item.addEventListener('mouseenter', () => {
      items.forEach(i => i.classList.remove('active'));
      item.classList.add('active');
    });
  });
}

// Initial active state behavior for timeline items
const items = document.querySelectorAll('.timeline-item');
items.forEach(item => {
  item.addEventListener('mouseenter', () => {
    items.forEach(i => i.classList.remove('active'));
    item.classList.add('active');
  });
});
