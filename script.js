// Header background + active link on scroll
const header = document.getElementById('header');
const navLinkEls = document.querySelectorAll('.nav__links a');

function updateActiveLink() {
  const threshold = 150;
  
  navLinkEls.forEach(link => {
    const sectionId = link.getAttribute('href');
    if (!sectionId || sectionId === '#') return;
    
    const section = document.querySelector(sectionId);
    if (!section) return;
    
    const rect = section.getBoundingClientRect();
    const isActive = rect.top <= threshold && rect.bottom > threshold;
    
    link.classList.toggle('active', isActive);
  });
}

window.addEventListener('scroll', () => {
  if (window.scrollY > 50) {
    header.classList.add('scrolled');
  } else {
    header.classList.remove('scrolled');
  }
  
  updateActiveLink();
});

// Initial check
updateActiveLink();

// Mobile Hamburger Menu
const hamburger = document.getElementById('hamburger');
const navLinks = document.getElementById('navLinks');

if (hamburger && navLinks) {
  hamburger.addEventListener('click', () => {
    const isOpen = navLinks.classList.toggle('open');
    const spans = hamburger.querySelectorAll('span');
    if (isOpen) {
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

// Timeline Data (cronograma oficial do evento por dia completo)
const timelineData = {
  'day1': [
    { time: '08:00h', title: 'Credenciamento', desc: 'Recepção e confirmação de presença dos participantes.' },
    { time: '08:40h', title: 'Apresentação Cultural', desc: 'Abertura artística e acolhimento do público.' },
    { time: '09:00h', title: 'Abertura oficial', desc: 'Boas-vindas e contextualização do Desafio StartUFPI com a Profa. Dra. Nayara Cardoso.' },
    { time: '09:30h', title: 'Palestra de Abertura', desc: 'A propriedade intelectual como ferramenta de desenvolvimento científico e tecnológico. Palestrante: Prof. Dr. Marcelo Gomes Speziali (UFOP).' },
    { time: '10:30h', title: 'Mesa Redonda', desc: 'Cases de sucesso com Buriti Bioespuma, Ricardo Lira (IAgro Solutions), Lívio e Otílio (IFPI). Mediação: Profa. Dra. Valdivânia Albuquerque.' },
    { time: '12:00h', title: 'Almoço livre', desc: 'Intervalo para almoço e networking informal.' },
    { time: '14:30h', title: 'Palestra: Inovação e Sustentabilidade', desc: 'Experiência da incubadora socioambiental da UFSM. Palestrante: Prof. Dr. Lucas Veiga Ávila (UFSM).' },
    { time: '15:30h', title: 'Painel Transferência de Tecnologia', desc: 'Participação de Juliana (UFBA) e Profa. Maíra (ANPROTEC). Mediação: Anderson Soares.' },
    { time: '17:00h', title: 'Feira das Startups', desc: 'Networking e apresentação de iniciativas inovadoras.' },
    { time: '17:30h', title: 'Coffee-break', desc: 'Intervalo para descanso e conversa entre participantes.' }
  ],
  'day2': [
    { time: '10:00h', title: 'ALI Academy', desc: 'Responsável: Sebrae.' },
    { time: '11:00h', title: 'CREA e Mútua Piauí', desc: 'Atividade com CREA e Mútua Piauí.' },
    { time: '14:00h - 16:00h', title: 'Apresentação das Equipes Finalistas', desc: 'Apresentação das equipes finalistas do Desafio StartUFPI 2026.' },
    { time: '16:00h - 16:30h', title: 'Apresentação das Equipes Vencedoras do StartUFPI 2025', desc: 'Ecoshield, Vector Trackers e EcoMadeira.' },
    { time: '16:30h', title: 'Palestra: Inovação na prática', desc: 'Paulo Coutinho aborda ideias, conexões e impacto no ecossistema empreendedor.' },
    { time: '17:30h', title: 'Divulgação dos vencedores e encerramento', desc: 'Premiação final e fechamento do evento.' }
  ]
};

// Timeline switcher
const timelineContainer = document.getElementById('timeline-container');
const dayTabs = document.querySelectorAll('.agenda-tab');

let activeDay = 'day1';

function setupTimelineEvents() {
  if (dayTabs.length > 0) {
    dayTabs.forEach(tab => {
      tab.addEventListener('click', () => {
        dayTabs.forEach(t => t.classList.remove('active'));
        tab.classList.add('active');
        activeDay = tab.getAttribute('data-day');
        renderTimeline(activeDay);
      });
    });
  }

  // Render initial timeline
  renderTimeline(activeDay);
}

function renderTimeline(dayKey) {
  if (!timelineContainer || !timelineData[dayKey]) return;
  
  timelineContainer.innerHTML = '';
  const events = timelineData[dayKey];
  
  events.forEach((item, index) => {
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

setupTimelineEvents();

// Initial active state behavior for timeline items
const items = document.querySelectorAll('.timeline-item');
items.forEach(item => {
  item.addEventListener('mouseenter', () => {
    items.forEach(i => i.classList.remove('active'));
    item.classList.add('active');
  });
});

/* ========== CAROUSEL ========== */
class Carousel {
  constructor(viewportId, trackId, prevId, nextId, dotsId) {
    this.viewport = document.getElementById(viewportId);
    this.track = document.getElementById(trackId);
    this.prevBtn = document.getElementById(prevId);
    this.nextBtn = document.getElementById(nextId);
    this.dotsContainer = document.getElementById(dotsId);
    
    if (!this.track) return;
    
    this.cards = this.track.querySelectorAll('.speaker-card');
    this.totalCards = this.cards.length;
    if (this.totalCards === 0) return;
    
    this.currentIndex = 0;
    this.autoPlayInterval = null;
    
    this.updateVisibleCount();
    this.createDots();
    this.bindEvents();
    this.goToSlide(0);
    this.startAutoPlay();
    
    // Recalculate on resize
    window.addEventListener('resize', () => {
      this.updateVisibleCount();
      this.createDots();
      this.goToSlide(Math.min(this.currentIndex, this.maxIndex));
    });
  }
  
  updateVisibleCount() {
    if (window.innerWidth <= 768) {
      this.visibleCount = 1;
    } else if (window.innerWidth <= 1024) {
      this.visibleCount = 2;
    } else {
      this.visibleCount = 3;
    }
    this.maxIndex = Math.max(0, this.totalCards - this.visibleCount);
  }
  
  getCardWidth() {
    if (this.cards.length === 0) return 0;
    const card = this.cards[0];
    const style = getComputedStyle(this.track);
    const gap = parseFloat(style.gap) || 24;
    return card.offsetWidth + gap;
  }
  
  goToSlide(index) {
    this.currentIndex = Math.max(0, Math.min(index, this.maxIndex));
    const offset = this.currentIndex * this.getCardWidth();
    this.track.style.transform = `translateX(-${offset}px)`;
    this.updateDots();
    this.updateButtons();
  }
  
  next() {
    if (this.currentIndex < this.maxIndex) {
      this.goToSlide(this.currentIndex + 1);
    } else {
      // Loop back to start
      this.goToSlide(0);
    }
    this.resetAutoPlay();
  }
  
  prev() {
    if (this.currentIndex > 0) {
      this.goToSlide(this.currentIndex - 1);
    } else {
      // Loop to end
      this.goToSlide(this.maxIndex);
    }
    this.resetAutoPlay();
  }
  
  createDots() {
    if (!this.dotsContainer) return;
    this.dotsContainer.innerHTML = '';
    const dotCount = this.maxIndex + 1;
    for (let i = 0; i < dotCount; i++) {
      const dot = document.createElement('button');
      dot.className = 'carousel-dot';
      dot.setAttribute('aria-label', `Ir para slide ${i + 1}`);
      dot.addEventListener('click', () => {
        this.goToSlide(i);
        this.resetAutoPlay();
      });
      this.dotsContainer.appendChild(dot);
    }
  }
  
  updateDots() {
    if (!this.dotsContainer) return;
    const dots = this.dotsContainer.querySelectorAll('.carousel-dot');
    dots.forEach((dot, i) => {
      dot.classList.toggle('active', i === this.currentIndex);
    });
  }
  
  updateButtons() {
    // Buttons are always visible; we loop, so no need to disable
  }
  
  bindEvents() {
    if (this.prevBtn) {
      this.prevBtn.addEventListener('click', () => this.prev());
    }
    if (this.nextBtn) {
      this.nextBtn.addEventListener('click', () => this.next());
    }
    
    // Keyboard navigation
    document.addEventListener('keydown', (e) => {
      if (e.key === 'ArrowLeft') {
        // Check if carousel is in viewport
        const rect = this.viewport?.getBoundingClientRect();
        if (rect && rect.top < window.innerHeight && rect.bottom > 0) {
          this.prev();
        }
      } else if (e.key === 'ArrowRight') {
        const rect = this.viewport?.getBoundingClientRect();
        if (rect && rect.top < window.innerHeight && rect.bottom > 0) {
          this.next();
        }
      }
    });
    
    // Pause on hover
    this.viewport?.addEventListener('mouseenter', () => this.stopAutoPlay());
    this.viewport?.addEventListener('mouseleave', () => this.startAutoPlay());

    // Touch swipe support
    let touchStartX = 0;
    let touchEndX = 0;

    this.viewport?.addEventListener('touchstart', (e) => {
      touchStartX = e.changedTouches[0].screenX;
      this.stopAutoPlay();
    }, { passive: true });

    this.viewport?.addEventListener('touchend', (e) => {
      touchEndX = e.changedTouches[0].screenX;
      const diff = touchStartX - touchEndX;
      if (Math.abs(diff) > 40) {
        if (diff > 0) {
          this.next();
        } else {
          this.prev();
        }
      }
      this.startAutoPlay();
    }, { passive: true });
  }
  
  startAutoPlay() {
    if (this.autoPlayInterval) return;
    this.autoPlayInterval = setInterval(() => this.next(), 4000);
  }
  
  stopAutoPlay() {
    if (this.autoPlayInterval) {
      clearInterval(this.autoPlayInterval);
      this.autoPlayInterval = null;
    }
  }
  
  resetAutoPlay() {
    this.stopAutoPlay();
    this.startAutoPlay();
  }
}

// Initialize carousels
function initCarousels() {
  new Carousel('coordenacaoViewport', 'coordenacaoTrack', 'coordenacaoPrev', 'coordenacaoNext', 'coordenacaoDots');
  new Carousel('inovacaoViewport', 'inovacaoTrack', 'inovacaoPrev', 'inovacaoNext', 'inovacaoDots');
}

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', initCarousels);
} else {
  initCarousels();
}
