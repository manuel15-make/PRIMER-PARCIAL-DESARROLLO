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

function toggleSidebar() {
    const sidebar = document.querySelector('.sidebar');
    const overlay = document.getElementById('sidebar-overlay');
    if (sidebar && overlay) {
        sidebar.classList.toggle('active');
        overlay.classList.toggle('active');
    }
}

document.addEventListener('DOMContentLoaded', async () => {
    // Cargar componentes en orden (esperamos a que termine cada uno)
    await loadComponent('components/header/header.html', 'header-placeholder');
    await loadComponent('components/sidebar/sidebar.html', 'sidebar-placeholder');
    await loadComponent('components/footer/footer.html', 'footer-placeholder');

    // Una vez cargados, asignar eventos
    const hamburgerBtn = document.getElementById('hamburger-btn');
    const overlay = document.getElementById('sidebar-overlay');
    const sidebar = document.querySelector('.sidebar');

    if (hamburgerBtn) {
        hamburgerBtn.addEventListener('click', toggleSidebar);
    }

    if (overlay) {
        overlay.addEventListener('click', toggleSidebar);
    }

    // Opcional: cerrar sidebar al hacer clic en un enlace
    const sidebarLinks = document.querySelectorAll('.sidebar a');
    sidebarLinks.forEach(link => {
        link.addEventListener('click', toggleSidebar);
    });
});
let carrito = [];

function toggleCart() {
    document.getElementById("cart-panel").classList.toggle("active");
}

function agregarAlCarrito(nombre, precio) {
    carrito.push({ nombre, precio });
    actualizarCarrito();
}

function actualizarCarrito() {
    let contenedor = document.getElementById("cart-items");
    let total = 0;

    contenedor.innerHTML = "";

    carrito.forEach((item, index) => {
        total += item.precio;

        contenedor.innerHTML += `
            <div class="cart-item">
                ${item.nombre} - $${item.precio}
                <button onclick="eliminar(${index})">X</button>
            </div>
        `;
    });

    document.getElementById("cart-total").innerText = total;
    document.getElementById("cart-count").innerText = carrito.length;
}

function eliminar(index) {
    carrito.splice(index, 1);
    actualizarCarrito();
}
