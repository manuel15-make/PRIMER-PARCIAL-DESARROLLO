async function loadComponent(url, placeholderId) {
    try {
        const response = await fetch(url);
        if (!response.ok) throw new Error(`Error al cargar ${url}`);
        const html = await response.text();
        document.getElementById(placeholderId).innerHTML = html;
    } catch (error) {
        console.error(error);
        document.getElementById(placeholderId).innerHTML = `<p>Error al cargar el componente.</p>`;
    }
}

document.addEventListener('DOMContentLoaded', () => {
    loadComponent('components/header/header.html', 'header-placeholder');
    loadComponent('components/sidebar/sidebar.html', 'sidebar-placeholder');
    loadComponent('components/footer/footer.html', 'footer-placeholder');
});