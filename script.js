document.addEventListener('mousemove', (posicion) => {
    const mouseX = posicion.clientX;
    const mouseY = posicion.clientY;
    
    // Seleccionamos el fondo de galaxia
    const background = document.querySelector('.galaxy-background');
    
    // Calculamos el movimiento (dividir por 50 para que sea suave)
    const x = (window.innerWidth / 2 - mouseX) / 50;
    const y = (window.innerHeight / 2 - mouseY) / 50;
    
    background.style.transform = `translate(${x}px, ${y}px) scale(1.1)`;
});

// 1. Seleccionamos los elementos del menú hamburguesa
const boton = document.getElementById('menu-btn');
const menu = document.getElementById('menu-items');

// 2. Agregamos el evento click
if (boton && menu) {
    boton.addEventListener('click', () => {
        // Toggle del menú: quitar/agregar 'hidden' y asegurar 'flex' y 'flex-col' en móviles
        menu.classList.toggle('hidden');
        
        // En móviles, asegurar que tenga flex-col cuando se muestra
        if (!menu.classList.contains('hidden')) {
            menu.classList.add('flex', 'flex-col');
        }
    });
    
    // Cerrar el menú al hacer clic fuera de él
    document.addEventListener('click', (e) => {
        if (!boton.contains(e.target) && !menu.contains(e.target)) {
            if (window.innerWidth < 768) { // Solo en móviles
                menu.classList.add('hidden');
                menu.classList.remove('flex', 'flex-col');
            }
        }
    });
}

// 3. Agregamos el evento click al botón de progreso
const enlaceProgreso = document.getElementById('enlace-progreso');

if (enlaceProgreso) {
    enlaceProgreso.addEventListener('click', function(e) {
        // 1. Evitamos que navegue inmediatamente
        e.preventDefault();
        
        console.log("Iniciando transición...");

        // 2. Cambiamos el texto
        this.innerText = 'CARGANDO SISTEMA...';
        
        // 3. Desactivamos visualmente (clases de Tailwind)
        this.classList.add('opacity-50');
        this.style.pointerEvents = 'none'; // Esto evita que hagan más clics

        // 4. Esperamos 1.5 segundos y navegamos manualmente
        setTimeout(() => {
            window.location.href = this.href;
        }, 100);
    });
}

/**
 * Gestiona la identidad del usuario mediante localStorage
 * Solicita el nombre la primera vez y lo muestra en las páginas correspondientes
 */
function gestionarIdentidad() {
    // 1. Buscamos el elemento en la página actual (Index o Progreso)
    const etiquetaSaludo = document.getElementById('saludo-ingeniero');
    
    // 2. Intentamos recuperar el nombre de la memoria
    let nombreGuardado = localStorage.getItem('ingenieroNombre');

    // 3. Si NO hay nombre guardado, lo pedimos (esto pasará solo la primera vez)
    if (!nombreGuardado) {
        nombreGuardado = prompt("Acceso detectado. Ingrese su identificación:");
        
        // Validamos que el usuario haya ingresado algo y no sea solo espacios
        if (nombreGuardado && nombreGuardado.trim().length > 0) {
            nombreGuardado = nombreGuardado.trim(); // Eliminamos espacios al inicio/final
            localStorage.setItem('ingenieroNombre', nombreGuardado);
        } else {
            // Si canceló o ingresó solo espacios, no guardamos nada
            nombreGuardado = null;
        }
    }

    // 4. Si el elemento existe en esta página Y tenemos el nombre, lo escribimos
    if (etiquetaSaludo && nombreGuardado) {
        etiquetaSaludo.innerText = `> BIENVENIDO, INGENIERO ${nombreGuardado.toUpperCase()}`;
    }
}

// Asegúrate de que se ejecute al cargar
window.addEventListener('load', gestionarIdentidad);

function animarMetaSalarial() {
    const contador = document.getElementById('contador-meta');
    const barraMeta = document.getElementById('barra-meta');
    let actual = 0;
    const meta = 1300;

    if (contador && barraMeta) {
        // Animación del número
        const intervalo = setInterval(() => {
            if (actual >= meta) {
                clearInterval(intervalo);
            } else {
                actual += 50; // Incremento
                contador.innerText = `$${actual.toLocaleString()}`;
            }
        }, 30);

        // Animación de la barra (65% de progreso hacia la meta)
        setTimeout(() => {
            barraMeta.style.width = '65%'; 
        }, 500);
    }
}

// Asegúrate de incluirla en tu evento de carga
window.addEventListener('load', () => {
    if (typeof gestionarIdentidad === 'function') gestionarIdentidad();
    if (typeof animarHabilidades === 'function') animarHabilidades();
    animarMetaSalarial();
});