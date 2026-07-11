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

// Initialize the innovation agents carousel
document.addEventListener('DOMContentLoaded', () => {
  new Carousel('inovacaoViewport', 'inovacaoTrack', 'inovacaoPrev', 'inovacaoNext', 'inovacaoDots');
});
