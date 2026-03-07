/**
 * Home Page Project Renderer
 */
async function loadProjects() {
    const projectContainer = document.getElementById('main-content');
    if (!projectContainer) return;

    try {
        const response = await fetch('/data/projects.json');
        const projects = await response.json();

        // Clear hardcoded projects (except the ones we haven't data-fied yet if any)
        // For now, we will replace the content of main-content with dynamic tiles
        projectContainer.innerHTML = projects.map(project => renderProjectTile(project)).join('');

        // Re-initialize any 3D effects or specific listeners
        initMergeTilt();

    } catch (e) {
        console.error("Failed to load projects:", e);
    }
}

function renderProjectTile(project) {
    const isMerge = project.id === 'merge';
    const isHotspot = project.id === 'hotspot';
    
    // Tech tags HTML
    const techTags = project.tech.map(tag => `<span class="tech-tag">${tag}</span>`).join('');
    
    // Content Column
    const contentHtml = `
        <div class="project-content">
            <span class="project-category interactive">${project.category}</span>
            <h2 class="project-title">${project.title}</h2>
            <p class="project-subtitle">${project.subtitle}</p>
            <p class="project-description">${project.description}</p>
            <div class="project-tech">${techTags}</div>
            <div class="project-cta">
                <a href="${project.cta.link}" class="project-link">${project.cta.text}</a>
            </div>
        </div>
    `;

    // Visual Column
    let visualHtml = '';
    if (isHotspot) {
        visualHtml = `
            <div class="${project.visual.containerClass}">
                <div class="image-center">
                    <img src="${project.visual.src}" 
                         alt="${project.visual.alt}" 
                         class="project-hero-placeholder img-responsive" 
                         id="${project.visual.id}"
                         loading="lazy"
                         decodings="async">
                </div>
            </div>
        `;
    } else {
        visualHtml = `
            <div class="project-visual">
                <img src="${project.visual.src}" 
                     alt="${project.visual.alt}" 
                     id="${project.visual.id || ''}" 
                     loading="lazy"
                     decodings="async">
            </div>
        `;
    }

    // Handle Layout Order (MERGE has content first, visual second)
    const innerHtml = isMerge ? (contentHtml + visualHtml) : (visualHtml + contentHtml);

    return `
        <section id="tile-${project.id}" class="content-section container ${project.className || ''}">
            <article class="project-tile">
                ${innerHtml}
            </article>
        </section>
    `;
}

function initMergeTilt() {
    const logo = document.getElementById('merge-logo');
    const container = document.querySelector('.merge-preview');

    if (!logo || !container) return;

    container.addEventListener('mousemove', (e) => {
        const rect = container.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        const centerX = rect.width / 2;
        const centerY = rect.height / 2;
        const rotateX = ((y - centerY) / centerY) * -15;
        const rotateY = ((x - centerX) / centerX) * 15;

        logo.style.transform = `
            perspective(1000px) 
            rotateX(${rotateX}deg) 
            rotateY(${rotateY}deg)
            scale3d(1.05, 1.05, 1.05)
        `;
    });

    container.addEventListener('mouseleave', () => {
        logo.style.transform = `perspective(1000px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)`;
    });
}

document.addEventListener('DOMContentLoaded', loadProjects);
