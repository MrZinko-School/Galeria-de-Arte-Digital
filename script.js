// Acervo de Projetos Artísticos dos Alunos
const projects = [
    {
        title: "Site de Estudos ENSINO EXPRESS",
        author: "Arthur F. Almeida",
        category: "HTML | CSS | JS",
        image: "https://i.ibb.co/1JPdcWfb/ensino-express.png",
        description: "Site de estudos para cursandos do ENEM e Ensino Médio."
    },
    {
        title: "Propaganda Mac",
        author: "Arthur F. Almeida",
        category: "Photoshop",
        image: "https://i.ibb.co/gLqtkyCq/propaganda.png",
        description: "Estudo de contorno, sombreamento e camadas."
    },
    {
        title: "Site de Notícias",
        author: "Arthur F. Almeida",
        category: "HTML | CSS",
        image: "https://i.ibb.co/HfVLwF6z/not-cias.png",
        description: "Site focado em notícias, aprendizado sobre organização e paginação"
    },
    {
        title: "Cartaz de Filme",
        author: "Arthur F. Almeida",
        category: "Photoshop | Organização",
        image: "https://i.ibb.co/fVmxrq9S/filme.png",
        description: "Aprendizado com Photopshop, cores, diagramação e manipulação de cores."
    },
    {
        title: "Ensinar sobre Pokémon",
        author: "Arthur F. Almeida",
        category: "HTML | CSS",
        image: "https://i.ibb.co/NnF4P8p9/pokeschool.png",
        description: "Estudo sobre tabelas, e ensino sobre um assunto a parte."
    },
    {
        title: "Manipulação de Cena",
        author: "Arthur F. Almeida",
        category: "Photopshop | Criatividade",
        image: "https://i.ibb.co/HTVTqh2L/iron-man.png",
        description: "Manipulação de cores, fundos e efeitos no photoshop."
    },
    {
        title: "Bootstrap",
        author: "Arthur F. Almeida",
        category: "HTML | CSS",
        image: "https://i.ibb.co/jv2FLHGc/bootstrap.png",
        description: "Atividade sobre Bootstrap e estilização"
    },
    {
        title: "Formulários com JS",
        author: "Arthur F. Almeida",
        category: "HTMLS | CSS | JS",
        image: "https://i.ibb.co/FbWG29ds/power-glove.png",
        description: "Ensino sobre formulários e filtro de campos com JS."
    }
];

// Seletores do DOM
const galleryGrid = document.getElementById('gallery-grid');
const lightbox = document.getElementById('lightbox');
const lightboxImg = document.getElementById('lightbox-img');
const lightboxTag = document.getElementById('lightbox-tag');
const lightboxTitle = document.getElementById('lightbox-title');
const lightboxAuthor = document.getElementById('lightbox-author');
const lightboxDescription = document.getElementById('lightbox-description');
const lightboxCounter = document.getElementById('lightbox-counter');

const closeBtn = document.getElementById('close-btn');
const prevBtn = document.getElementById('prev-btn');
const nextBtn = document.getElementById('next-btn');

let currentIndex = 0;

// Renderização dos Quadros na Galeria
function renderGallery() {
    galleryGrid.innerHTML = '';
    projects.forEach((proj, index) => {
        const card = document.createElement('div');
        card.className = 'project-card';
        card.innerHTML = `
            <div class="thumbnail-container">
                <img src="${proj.image}" alt="${proj.title}" class="project-thumbnail" loading="lazy">
            </div>
            <div class="card-details">
                <span class="card-tag">${proj.category}</span>
                <h3 class="card-title">${proj.title}</h3>
                <p class="card-author">Por ${proj.author}</p>
            </div>
        `;
        card.addEventListener('click', () => openLightbox(index));
        galleryGrid.appendChild(card);
    });
}

// Atualização do Modal com dados da obra
function updateLightboxContent(index) {
    const proj = projects[index];
    lightboxImg.src = proj.image;
    lightboxImg.alt = proj.title;
    lightboxTag.textContent = proj.category;
    lightboxTitle.textContent = proj.title;
    lightboxAuthor.textContent = `Obra concebida por ${proj.author}`;
    lightboxDescription.textContent = proj.description;
    
    // Contador formatado com dois dígitos no estilo curadoria de arte (ex: "03 / 08")
    const currentFormatted = String(index + 1).padStart(2, '0');
    const totalFormatted = String(projects.length).padStart(2, '0');
    lightboxCounter.textContent = `${currentFormatted} / ${totalFormatted}`;
}

function openLightbox(index) {
    currentIndex = index;
    updateLightboxContent(currentIndex);
    lightbox.classList.add('active');
    lightbox.setAttribute('aria-hidden', 'false');
}

function closeLightbox() {
    lightbox.classList.remove('active');
    lightbox.setAttribute('aria-hidden', 'true');
}

function navigate(direction) {
    currentIndex += direction;
    if (currentIndex >= projects.length) currentIndex = 0;
    if (currentIndex < 0) currentIndex = projects.length - 1;
    updateLightboxContent(currentIndex);
}

// Listeners de Interação
closeBtn.addEventListener('click', closeLightbox);
prevBtn.addEventListener('click', () => navigate(-1));
nextBtn.addEventListener('click', () => navigate(1));

lightbox.addEventListener('click', (e) => {
    if (e.target === lightbox) closeLightbox();
});

document.addEventListener('keydown', (e) => {
    if (!lightbox.classList.contains('active')) return;
    if (e.key === 'Escape') closeLightbox();
    if (e.key === 'ArrowRight') navigate(1);
    if (e.key === 'ArrowLeft') navigate(-1);
});

// Inicializa a galeria
renderGallery();