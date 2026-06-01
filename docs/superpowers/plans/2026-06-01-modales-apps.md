# Modales de Apps con Descarga y Guía de Uso — Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Agregar modales por app en FREEZIP con descripción, guía de uso, guía de instalación y botón de descarga APK directa.

**Architecture:** Sitio estático (HTML/CSS/JS vanilla). Se agrega markup de modales al `index.html`, estilos en `style.css`, y lógica de apertura/cierre + acordeón en `script.js`. Los APKs se sirven como archivos estáticos desde la carpeta `apps/`.

**Tech Stack:** HTML5, CSS3, JavaScript vanilla, Vercel (hosting estático)

---

### Task 1: Crear carpeta apps/ y verificar que Vercel la sirva

**Files:**
- Create: `apps/.gitkeep`

- [ ] **Step 1: Crear la carpeta con un archivo placeholder**

```bash
mkdir -p apps
echo "" > apps/.gitkeep
```

- [ ] **Step 2: Commit**

```bash
git add apps/.gitkeep
git commit -m "feat: crear carpeta apps/ para APKs"
```

- [ ] **Step 3: Copiar los APKs manualmente**

Copiar los 4 archivos APK a la carpeta `apps/` con estos nombres exactos:
- `apps/sr.apk`
- `apps/lunamoon.apk`
- `apps/xyzvpn.apk`
- `apps/swiftbackup.apk`

- [ ] **Step 4: Commit de los APKs**

```bash
git add apps/sr.apk apps/lunamoon.apk apps/xyzvpn.apk apps/swiftbackup.apk
git commit -m "feat: agregar APKs de las 4 apps"
```

- [ ] **Step 5: Push y verificar en el navegador**

```bash
git push origin main
```

Esperá 1-2 minutos y abrí en el navegador: `https://freezip.vercel.app/apps/sr.apk`

Esperado: el archivo se descarga. Si da 404, revisar que el nombre del archivo sea exactamente `sr.apk`.

---

### Task 2: Agregar botón "Ver más" en cada card de app

**Files:**
- Modify: `index.html` (sección `#apps`, las 4 cards)

- [ ] **Step 1: Agregar botón en card SR**

Buscar el cierre `</div>` de la card SR (la que tiene `<h3>SR</h3>`) y agregar el botón antes del cierre:

```html
        <div class="card reveal">
          <div class="card-icon card-icon-img">
            <img src="logo_administracion.png" alt="SR"/>
          </div>
          <h3>SR</h3>
          <p>Gestioná tu negocio de forma eficiente: clientes, inventario, reportes y más desde tu celular.</p>
          <button class="btn-ver-mas" data-modal="modal-sr">Ver más</button>
        </div>
```

- [ ] **Step 2: Agregar botón en card Luna Moon**

```html
        <div class="card reveal">
          <div class="card-icon card-icon-img">
            <img src="logo_lunamoon.png" alt="Luna Moon" style="width:54px;height:54px;"/>
          </div>
          <h3>Luna Moon</h3>
          <p>Contenido educativo y entretenido diseñado especialmente para los más chicos, de forma segura.</p>
          <button class="btn-ver-mas" data-modal="modal-lunamoon">Ver más</button>
        </div>
```

- [ ] **Step 3: Agregar botón en card XYZ VPN**

```html
        <div class="card reveal">
          <div class="card-icon card-icon-img">
            <img src="logo_appvpn.png" alt="XYZ VPN"/>
          </div>
          <h3>XYZ VPN</h3>
          <p>Navegá de forma privada y segura. Protegé tu conexión con un solo toque desde cualquier lugar.</p>
          <button class="btn-ver-mas" data-modal="modal-xyzvpn">Ver más</button>
        </div>
```

- [ ] **Step 4: Agregar botón en card Swift Backup**

```html
        <div class="card reveal">
          <div class="card-icon card-icon-img">
            <img src="logo_backup.png" alt="Swift Backup"/>
          </div>
          <h3>Swift Backup</h3>
          <p>Respalda tus datos automáticamente en la nube. Recuperá tu información cuando más lo necesitás.</p>
          <button class="btn-ver-mas" data-modal="modal-swiftbackup">Ver más</button>
        </div>
```

- [ ] **Step 5: Verificar visualmente**

Abrir `index.html` en el navegador. Cada card debe mostrar el botón "Ver más" debajo del texto. Los botones no hacen nada todavía.

- [ ] **Step 6: Commit**

```bash
git add index.html
git commit -m "feat: agregar botón Ver más en cards de apps"
```

---

### Task 3: Agregar markup HTML de los 4 modales

**Files:**
- Modify: `index.html` — agregar antes del cierre `</body>`

- [ ] **Step 1: Agregar overlay y los 4 modales antes de `<script src="script.js"></script>`**

Insertar el siguiente bloque completo justo antes de `<script src="script.js"></script>`:

```html
  <!-- OVERLAY -->
  <div class="modal-overlay" id="modal-overlay"></div>

  <!-- MODAL SR -->
  <div class="modal" id="modal-sr">
    <button class="modal-close" aria-label="Cerrar">&times;</button>
    <div class="modal-header">
      <div class="modal-icon">
        <img src="logo_administracion.png" alt="SR"/>
      </div>
      <h2>SR</h2>
    </div>
    <p class="modal-desc">Herramienta de gestión para negocios. Administrá clientes, inventario y generá reportes desde tu celular. Ideal para pequeños y medianos comercios.</p>
    <div class="accordion">
      <button class="accordion-btn">
        <span>Guía de uso</span>
        <svg class="accordion-chevron" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" width="18" height="18"><polyline points="6 9 12 15 18 9"/></svg>
      </button>
      <div class="accordion-content">
        <ol>
          <li>Creá tu perfil de negocio al abrir la app por primera vez</li>
          <li>Cargá tus productos o servicios desde el menú principal</li>
          <li>Registrá clientes y movimientos de caja</li>
          <li>Consultá reportes y estadísticas desde la sección Reportes</li>
        </ol>
      </div>
    </div>
    <div class="accordion">
      <button class="accordion-btn">
        <span>Cómo instalar</span>
        <svg class="accordion-chevron" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" width="18" height="18"><polyline points="6 9 12 15 18 9"/></svg>
      </button>
      <div class="accordion-content">
        <ol>
          <li>Descargá el APK desde el botón de abajo</li>
          <li>En tu celular: Ajustes → Seguridad → Habilitá "Fuentes desconocidas" (o "Instalar apps desconocidas" en Android 8+)</li>
          <li>Abrí el archivo APK descargado y seguí los pasos de instalación</li>
        </ol>
      </div>
    </div>
    <a href="/apps/sr.apk" download class="btn-download">
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" width="20" height="20"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="7 10 12 15 17 10"/><line x1="12" y1="15" x2="12" y2="3"/></svg>
      Descargar APK
    </a>
  </div>

  <!-- MODAL LUNA MOON -->
  <div class="modal" id="modal-lunamoon">
    <button class="modal-close" aria-label="Cerrar">&times;</button>
    <div class="modal-header">
      <div class="modal-icon">
        <img src="logo_lunamoon.png" alt="Luna Moon" style="width:54px;height:54px;"/>
      </div>
      <h2>Luna Moon</h2>
    </div>
    <p class="modal-desc">App de contenido educativo y entretenido para chicos. Videos, juegos y actividades seleccionados, en un entorno seguro y sin publicidad.</p>
    <div class="accordion">
      <button class="accordion-btn">
        <span>Guía de uso</span>
        <svg class="accordion-chevron" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" width="18" height="18"><polyline points="6 9 12 15 18 9"/></svg>
      </button>
      <div class="accordion-content">
        <ol>
          <li>Abrí la app e ingresá al perfil del niño</li>
          <li>Seleccioná la categoría: educación o entretenimiento</li>
          <li>Elegí el contenido y reproducilo</li>
          <li>El adulto puede configurar restricciones desde el menú de Ajustes con contraseña</li>
        </ol>
      </div>
    </div>
    <div class="accordion">
      <button class="accordion-btn">
        <span>Cómo instalar</span>
        <svg class="accordion-chevron" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" width="18" height="18"><polyline points="6 9 12 15 18 9"/></svg>
      </button>
      <div class="accordion-content">
        <ol>
          <li>Descargá el APK desde el botón de abajo</li>
          <li>En tu celular: Ajustes → Seguridad → Habilitá "Fuentes desconocidas" (o "Instalar apps desconocidas" en Android 8+)</li>
          <li>Abrí el archivo APK descargado y seguí los pasos de instalación</li>
        </ol>
      </div>
    </div>
    <a href="/apps/lunamoon.apk" download class="btn-download">
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" width="20" height="20"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="7 10 12 15 17 10"/><line x1="12" y1="15" x2="12" y2="3"/></svg>
      Descargar APK
    </a>
  </div>

  <!-- MODAL XYZ VPN -->
  <div class="modal" id="modal-xyzvpn">
    <button class="modal-close" aria-label="Cerrar">&times;</button>
    <div class="modal-header">
      <div class="modal-icon">
        <img src="logo_appvpn.png" alt="XYZ VPN"/>
      </div>
      <h2>XYZ VPN</h2>
    </div>
    <p class="modal-desc">VPN para Android que protege tu conexión con un toque. Sin registros, sin límites de datos, ideal para redes públicas o acceder a contenido restringido.</p>
    <div class="accordion">
      <button class="accordion-btn">
        <span>Guía de uso</span>
        <svg class="accordion-chevron" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" width="18" height="18"><polyline points="6 9 12 15 18 9"/></svg>
      </button>
      <div class="accordion-content">
        <ol>
          <li>Abrí la app</li>
          <li>Elegí un servidor de la lista</li>
          <li>Tocá "Conectar"</li>
          <li>El ícono de VPN en la barra de estado confirma que estás protegido</li>
        </ol>
      </div>
    </div>
    <div class="accordion">
      <button class="accordion-btn">
        <span>Cómo instalar</span>
        <svg class="accordion-chevron" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" width="18" height="18"><polyline points="6 9 12 15 18 9"/></svg>
      </button>
      <div class="accordion-content">
        <ol>
          <li>Descargá el APK desde el botón de abajo</li>
          <li>En tu celular: Ajustes → Seguridad → Habilitá "Fuentes desconocidas" (o "Instalar apps desconocidas" en Android 8+)</li>
          <li>Abrí el archivo APK descargado y seguí los pasos de instalación</li>
        </ol>
      </div>
    </div>
    <a href="/apps/xyzvpn.apk" download class="btn-download">
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" width="20" height="20"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="7 10 12 15 17 10"/><line x1="12" y1="15" x2="12" y2="3"/></svg>
      Descargar APK
    </a>
  </div>

  <!-- MODAL SWIFT BACKUP -->
  <div class="modal" id="modal-swiftbackup">
    <button class="modal-close" aria-label="Cerrar">&times;</button>
    <div class="modal-header">
      <div class="modal-icon">
        <img src="logo_backup.png" alt="Swift Backup"/>
      </div>
      <h2>Swift Backup</h2>
    </div>
    <p class="modal-desc">Respaldo automático de datos en la nube. Guardá contactos, fotos y configuraciones. Restaurá todo con un toque si cambiás de celular.</p>
    <div class="accordion">
      <button class="accordion-btn">
        <span>Guía de uso</span>
        <svg class="accordion-chevron" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" width="18" height="18"><polyline points="6 9 12 15 18 9"/></svg>
      </button>
      <div class="accordion-content">
        <ol>
          <li>Abrí la app e iniciá sesión con tu cuenta</li>
          <li>Seleccioná qué querés respaldar: contactos, fotos, configuraciones</li>
          <li>Activá el respaldo automático o tocá "Respaldar ahora" para hacerlo manual</li>
          <li>Para restaurar: tocá "Restaurar" y elegí el backup que querés recuperar</li>
        </ol>
      </div>
    </div>
    <div class="accordion">
      <button class="accordion-btn">
        <span>Cómo instalar</span>
        <svg class="accordion-chevron" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" width="18" height="18"><polyline points="6 9 12 15 18 9"/></svg>
      </button>
      <div class="accordion-content">
        <ol>
          <li>Descargá el APK desde el botón de abajo</li>
          <li>En tu celular: Ajustes → Seguridad → Habilitá "Fuentes desconocidas" (o "Instalar apps desconocidas" en Android 8+)</li>
          <li>Abrí el archivo APK descargado y seguí los pasos de instalación</li>
        </ol>
      </div>
    </div>
    <a href="/apps/swiftbackup.apk" download class="btn-download">
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" width="20" height="20"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="7 10 12 15 17 10"/><line x1="12" y1="15" x2="12" y2="3"/></svg>
      Descargar APK
    </a>
  </div>
```

- [ ] **Step 2: Verificar estructura**

Abrir `index.html` en el navegador. Los modales no deben ser visibles aún (se agregarán los estilos en el próximo task). Verificar que no haya errores en la consola del navegador (F12).

- [ ] **Step 3: Commit**

```bash
git add index.html
git commit -m "feat: agregar markup HTML de modales de apps"
```

---

### Task 4: Agregar estilos CSS para modal, overlay, acordeón y botón de descarga

**Files:**
- Modify: `style.css` — agregar al final del archivo

- [ ] **Step 1: Agregar estilos al final de style.css**

```css
/* =====================
   BOTÓN VER MÁS
   ===================== */
.btn-ver-mas {
  margin-top: 16px;
  width: 100%;
  padding: 10px 0;
  background: transparent;
  border: 1px solid rgba(255,255,255,0.15);
  border-radius: 8px;
  color: #fff;
  font-family: 'Poppins', sans-serif;
  font-size: 0.85rem;
  font-weight: 500;
  cursor: pointer;
  transition: background 0.2s, border-color 0.2s;
}
.btn-ver-mas:hover {
  background: rgba(255,255,255,0.07);
  border-color: rgba(255,255,255,0.3);
}

/* =====================
   OVERLAY
   ===================== */
.modal-overlay {
  display: none;
  position: fixed;
  inset: 0;
  background: rgba(0,0,0,0.75);
  z-index: 1000;
  animation: fadeIn 0.2s ease;
}
.modal-overlay.active {
  display: block;
}

/* =====================
   MODAL
   ===================== */
.modal {
  display: none;
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -48%);
  width: 90%;
  max-width: 520px;
  max-height: 85vh;
  overflow-y: auto;
  background: #141414;
  border: 1px solid rgba(255,255,255,0.1);
  border-radius: 16px;
  padding: 32px 28px 28px;
  z-index: 1001;
  animation: slideUp 0.25s ease forwards;
}
.modal.active {
  display: block;
}
@keyframes slideUp {
  from { opacity: 0; transform: translate(-50%, -44%); }
  to   { opacity: 1; transform: translate(-50%, -50%); }
}
@keyframes fadeIn {
  from { opacity: 0; }
  to   { opacity: 1; }
}

/* CLOSE BUTTON */
.modal-close {
  position: absolute;
  top: 16px;
  right: 20px;
  background: none;
  border: none;
  color: rgba(255,255,255,0.5);
  font-size: 1.6rem;
  line-height: 1;
  cursor: pointer;
  transition: color 0.2s;
}
.modal-close:hover { color: #fff; }

/* MODAL HEADER */
.modal-header {
  display: flex;
  align-items: center;
  gap: 16px;
  margin-bottom: 16px;
}
.modal-icon img {
  width: 54px;
  height: 54px;
  border-radius: 12px;
  object-fit: cover;
}
.modal-header h2 {
  font-size: 1.4rem;
  font-weight: 700;
  color: #fff;
  margin: 0;
}

/* MODAL DESCRIPTION */
.modal-desc {
  color: rgba(255,255,255,0.7);
  font-size: 0.9rem;
  line-height: 1.6;
  margin-bottom: 20px;
}

/* =====================
   ACORDEÓN
   ===================== */
.accordion {
  border: 1px solid rgba(255,255,255,0.1);
  border-radius: 10px;
  margin-bottom: 10px;
  overflow: hidden;
}
.accordion-btn {
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 14px 16px;
  background: rgba(255,255,255,0.04);
  border: none;
  color: #fff;
  font-family: 'Poppins', sans-serif;
  font-size: 0.9rem;
  font-weight: 500;
  cursor: pointer;
  text-align: left;
  transition: background 0.2s;
}
.accordion-btn:hover { background: rgba(255,255,255,0.08); }
.accordion-chevron {
  flex-shrink: 0;
  transition: transform 0.25s;
  opacity: 0.6;
}
.accordion.open .accordion-chevron { transform: rotate(180deg); }
.accordion-content {
  display: none;
  padding: 14px 16px;
  background: rgba(255,255,255,0.02);
}
.accordion.open .accordion-content { display: block; }
.accordion-content ol {
  margin: 0;
  padding-left: 20px;
  color: rgba(255,255,255,0.7);
  font-size: 0.88rem;
  line-height: 1.8;
}

/* =====================
   BOTÓN DESCARGAR APK
   ===================== */
.btn-download {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 10px;
  margin-top: 20px;
  width: 100%;
  padding: 14px 0;
  background: #3DDC84;
  color: #000;
  font-family: 'Poppins', sans-serif;
  font-size: 0.95rem;
  font-weight: 600;
  border-radius: 10px;
  text-decoration: none;
  transition: background 0.2s, transform 0.15s;
}
.btn-download:hover {
  background: #2ec870;
  transform: translateY(-1px);
}

/* SCROLL DEL MODAL EN MOBILE */
@media (max-width: 480px) {
  .modal {
    width: 95%;
    padding: 24px 18px 22px;
    max-height: 90vh;
  }
}
```

- [ ] **Step 2: Verificar visualmente**

Abrir `index.html` en el navegador. Los botones "Ver más" deben verse estilizados en cada card. Los modales siguen sin funcionar (JS en el próximo task).

- [ ] **Step 3: Commit**

```bash
git add style.css
git commit -m "feat: agregar estilos de modal, overlay, acordeón y botón descarga"
```

---

### Task 5: Agregar lógica JavaScript para modales y acordeón

**Files:**
- Modify: `script.js` — agregar al final del archivo

- [ ] **Step 1: Agregar lógica al final de script.js**

```js
// =====================
// MODALES DE APPS
// =====================
(function () {
  const overlay = document.getElementById('modal-overlay');

  function openModal(id) {
    const modal = document.getElementById(id);
    if (!modal) return;
    modal.classList.add('active');
    overlay.classList.add('active');
    document.body.style.overflow = 'hidden';
  }

  function closeAll() {
    document.querySelectorAll('.modal.active').forEach(m => m.classList.remove('active'));
    overlay.classList.remove('active');
    document.body.style.overflow = '';
  }

  // Abrir modal al hacer clic en "Ver más"
  document.querySelectorAll('.btn-ver-mas').forEach(btn => {
    btn.addEventListener('click', () => openModal(btn.dataset.modal));
  });

  // Cerrar con botón X
  document.querySelectorAll('.modal-close').forEach(btn => {
    btn.addEventListener('click', closeAll);
  });

  // Cerrar al hacer clic en overlay
  overlay.addEventListener('click', closeAll);

  // Cerrar con Escape
  document.addEventListener('keydown', e => {
    if (e.key === 'Escape') closeAll();
  });

  // =====================
  // ACORDEÓN
  // =====================
  document.querySelectorAll('.accordion-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      const accordion = btn.closest('.accordion');
      const isOpen = accordion.classList.contains('open');

      // Cerrar todos los acordeones del mismo modal
      const modal = btn.closest('.modal');
      modal.querySelectorAll('.accordion').forEach(a => a.classList.remove('open'));

      // Si no estaba abierto, abrirlo
      if (!isOpen) accordion.classList.add('open');
    });
  });
})();
```

- [ ] **Step 2: Verificar funcionamiento completo**

Abrir `index.html` en el navegador y hacer las siguientes pruebas:

1. Hacer clic en "Ver más" de SR → el modal se abre con animación
2. Hacer clic en "Guía de uso" → el acordeón se expande
3. Hacer clic en "Cómo instalar" → el anterior se cierra, el nuevo se abre
4. Hacer clic en X → el modal se cierra
5. Abrir cualquier modal → hacer clic en el overlay oscuro → se cierra
6. Abrir cualquier modal → presionar Escape → se cierra
7. Repetir con las 4 apps
8. En mobile (F12 → modo responsive): verificar que el modal no desborde la pantalla

- [ ] **Step 3: Commit**

```bash
git add script.js
git commit -m "feat: agregar lógica JS de modales y acordeón"
```

---

### Task 6: Push final y verificación en producción

- [ ] **Step 1: Push a producción**

```bash
git push origin main
```

- [ ] **Step 2: Verificar en Vercel**

Esperar 1-2 minutos y abrir `https://freezip.vercel.app`. Repetir las pruebas del Task 5 Step 2 en el sitio real.

- [ ] **Step 3: Verificar descarga de APKs**

En cada modal, hacer clic en "Descargar APK" y confirmar que el archivo se descarga correctamente.

---

## Resumen de commits

1. `feat: crear carpeta apps/ para APKs`
2. `feat: agregar APKs de las 4 apps`
3. `feat: agregar botón Ver más en cards de apps`
4. `feat: agregar markup HTML de modales de apps`
5. `feat: agregar estilos de modal, overlay, acordeón y botón descarga`
6. `feat: agregar lógica JS de modales y acordeón`
