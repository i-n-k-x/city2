// Função para scroll suave até os produtos
function scrollToProducts(event) {
    event.preventDefault();
    const productsSection = document.getElementById('products');
    if (productsSection) {
        productsSection.scrollIntoView({
            behavior: 'smooth',
            block: 'start'
        });
    }
}

// SISTEMA DE POP-UP DE VÍDEO - CORRIGIDO
class VideoPopup {
    constructor() {
        this.helpButton = document.getElementById('helpButton');
        this.videoPopup = document.getElementById('videoPopup');
        this.closePopup = document.getElementById('closePopup');
        this.popupVideo = document.getElementById('popupVideo');
        
        // Link do vídeo do Vimeo configurado
        this.videoUrl = 'https://player.vimeo.com/video/1098854357?autoplay=1&title=0&byline=0&portrait=0&controls=1';
        
        this.init();
    }

    init() {
        console.log('Inicializando VideoPopup...');
        console.log('Help Button:', this.helpButton);
        console.log('Video Popup:', this.videoPopup);
        console.log('Close Popup:', this.closePopup);
        console.log('Popup Video:', this.popupVideo);

        if (!this.helpButton) {
            console.error('Botão de ajuda não encontrado! ID: helpButton');
            return;
        }

        if (!this.videoPopup) {
            console.error('Overlay do pop-up não encontrado! ID: videoPopup');
            return;
        }

        if (!this.closePopup) {
            console.error('Botão de fechar não encontrado! ID: closePopup');
            return;
        }

        if (!this.popupVideo) {
            console.error('Iframe do vídeo não encontrado! ID: popupVideo');
            return;
        }

        // Event listeners
        this.helpButton.addEventListener('click', () => this.openPopup());
        this.closePopup.addEventListener('click', () => this.closePopupMethod());
        
        // Fechar ao clicar fora do conteúdo
        this.videoPopup.addEventListener('click', (e) => {
            if (e.target === this.videoPopup) {
                this.closePopupMethod();
            }
        });

        // Fechar com ESC
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape' && this.videoPopup.classList.contains('active')) {
                this.closePopupMethod();
            }
        });
    }

    openPopup() {
        console.log('Abrindo popup...');
        this.popupVideo.src = this.videoUrl;
        this.videoPopup.classList.add('active');
        document.body.style.overflow = 'hidden';
    }

    closePopupMethod() {
        console.log('Fechando popup...');
        this.popupVideo.src = '';
        this.videoPopup.classList.remove('active');
        document.body.style.overflow = 'auto';
    }
}

// SISTEMA DE CARROSSEL AUTOMÁTICO
class AutoCarousel {
    constructor() {
        this.track = document.getElementById('carouselTrack');
        this.slides = document.querySelectorAll('.carousel-slide');
        this.prevBtn = document.querySelector('.carousel-btn.prev');
        this.nextBtn = document.querySelector('.carousel-btn.next');
        
        this.currentIndex = 0;
        this.autoPlayInterval = null;
        this.autoPlayDelay = 4000; // 4 segundos
        
        this.init();
    }

    init() {
        if (!this.track || this.slides.length === 0) {
            console.log('Carrossel não encontrado ou sem slides');
            return;
        }

        // Event listeners para botões
        if (this.prevBtn) {
            this.prevBtn.addEventListener('click', () => this.moveCarousel(-1));
        }
        
        if (this.nextBtn) {
            this.nextBtn.addEventListener('click', () => this.moveCarousel(1));
        }

        // Pausar autoplay ao hover
        this.track.addEventListener('mouseenter', () => this.pauseAutoPlay());
        this.track.addEventListener('mouseleave', () => this.startAutoPlay());

        // Iniciar autoplay
        this.startAutoPlay();
    }

    moveCarousel(direction) {
        this.currentIndex += direction;
        
        if (this.currentIndex >= this.slides.length) {
            this.currentIndex = 0;
        } else if (this.currentIndex < 0) {
            this.currentIndex = this.slides.length - 1;
        }
        
        this.updateCarousel();
    }

    updateCarousel() {
        const translateX = -this.currentIndex * 100;
        this.track.style.transform = `translateX(${translateX}%)`;
    }

    startAutoPlay() {
        this.pauseAutoPlay(); // Limpar interval existente
        this.autoPlayInterval = setInterval(() => {
            this.moveCarousel(1);
        }, this.autoPlayDelay);
    }

    pauseAutoPlay() {
        if (this.autoPlayInterval) {
            clearInterval(this.autoPlayInterval);
            this.autoPlayInterval = null;
        }
    }
}

// Funções globais para compatibilidade
function openPopup() {
    if (window.videoPopupInstance) {
        window.videoPopupInstance.openPopup();
    }
}

function closePopup() {
    if (window.videoPopupInstance) {
        window.videoPopupInstance.closePopupMethod();
    }
}

function moveCarousel(direction) {
    if (window.carouselInstance) {
        window.carouselInstance.moveCarousel(direction);
    }
}

// Inicialização quando DOM estiver carregado
document.addEventListener('DOMContentLoaded', function() {
    console.log('DOM carregado, inicializando sistemas...');
    
    // Inicializar VideoPopup
    window.videoPopupInstance = new VideoPopup();
    
    // Inicializar Carrossel
    window.carouselInstance = new AutoCarousel();
    
    // Smooth scroll para links internos
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });
    
    console.log('Todos os sistemas inicializados com sucesso!');
});

