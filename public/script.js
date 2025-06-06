
const getUrlParams = () => {
    const params = new URLSearchParams(window.location.search);
    return Object.fromEntries(params.entries());
};

const createUrlWithParams = (baseUrl, params) => {
    const url = new URL(baseUrl, window.location.origin);
    Object.entries(params).forEach(([key, value]) => {
        url.searchParams.set(key, value);
    });
    return url.toString();
};


const searchInput = document.querySelector('.texto-pesquisa');
const searchButton = document.querySelector('.caixa-pesquisa button');
const navLinks = document.querySelectorAll('nav ul li a');
const bannerTitle = document.querySelector('.banner h1');
const bannerText = document.querySelector('.banner p');
const recipeCards = document.querySelector('.receitas-destaque');
const footerYear = document.querySelector('footer p');


const updateFooterYear = () => {
    const year = new Date().getFullYear();
    footerYear.textContent = `© ${year} Receitas Deliciosas. Todos os direitos reservados.`;
};


const handleSearch = () => {
    const searchTerm = searchInput.value.trim();
    if (searchTerm) {
        alert(`Você pesquisou por: ${searchTerm}`);
        
        searchInput.value = '';
    }
};


const addNavInteractivity = () => {
    navLinks.forEach(link => {
        link.addEventListener('mouseenter', () => {
            link.style.transform = 'scale(1.1)';
            link.style.transition = 'transform 0.3s ease';
        });
        link.addEventListener('mouseleave', () => {
            link.style.transform = 'scale(1)';
        });
    });
};


const bannerMessages = [
    { title: "Bem-vindo ao Mundo das Receitas!", text: "Descubra receitas incríveis para todas as ocasiões." },
    { title: "Novas Receitas Semanais!", text: "Confira nossas atualizações toda semana." },
    { title: "Dicas de Culinária", text: "Aprenda técnicas profissionais em casa." }
];

let currentBannerIndex = 0;
const rotateBanner = () => {
    currentBannerIndex = (currentBannerIndex + 1) % bannerMessages.length;
    bannerTitle.textContent = bannerMessages[currentBannerIndex].title;
    bannerText.textContent = bannerMessages[currentBannerIndex].text;
};


const setupCards = () => {
    const cards = document.querySelectorAll('.card');
    
    cards.forEach(card => {
        
        card.addEventListener('click', function(e) {
            
            if (e.target.tagName !== 'A') {
                const link = card.querySelector('a');
                if (link) {
                    link.click();
                }
            }
        });
        
        
        card.addEventListener('keydown', function(e) {
            if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                const link = card.querySelector('a');
                if (link) {
                    link.click();
                }
            }
        });
        
        
        card.setAttribute('tabindex', '0');
    });

    
    if (typeof createCard !== 'undefined') {
        const cardContainer = document.querySelector('.receitas-destaque') || 
                             document.querySelector('main') || 
                             document.body;
        
        
        if (cards.length === 0) {
            const sampleCards = [
                {
                    template: 'card-template',
                    data: {
                        image: 'imagens/receitas/pizza.jpg',
                        title: 'Pizza Caseira',
                        description: 'Receita tradicional de pizza com massa fina e crocante',
                        link: 'receitas_pizza.html'
                    }
                },
                {
                    template: 'card-horizontal-template',
                    data: {
                        image: 'imagens/receitas/coxinha.jpg',
                        title: 'Coxinha de Frango',
                        description: 'Coxinha crocante com recheio cremoso de frango',
                        link: 'receitas_coxinha.html'
                    }
                }
            ];

            sampleCards.forEach(cardData => {
                const card = createCard(cardData.template, cardData.data);
                cardContainer.appendChild(card);
            });
        }
    }
};


const init = () => {
    updateFooterYear();
    searchButton.addEventListener('click', handleSearch);
    searchInput.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') handleSearch();
    });
    addNavInteractivity();
    setupCards();
    setInterval(rotateBanner, 5000);
};


document.addEventListener('DOMContentLoaded', init);

fetch('dados.json')
  .then(response => response.json())
  .then(data => {
    const container = document.getElementById('card-container');
    data.cards.forEach(cardData => {
      const card = createCard(cardData.template, cardData);
      container.appendChild(card);
    });
  });
