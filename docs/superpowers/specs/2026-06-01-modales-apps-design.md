# Design: Modales de Apps con Descarga y Guía de Uso

**Fecha:** 2026-06-01  
**Proyecto:** FREEZIP Web  
**Scope:** Agregar modales por app con botón de descarga APK, guía de instalación y guía de uso

---

## Objetivo

Permitir que los visitantes del sitio puedan ver detalles de cada app, descargar el APK directamente y consultar cómo instalarla y usarla — todo desde un modal que se abre al hacer clic en la card correspondiente.

---

## Archivos involucrados

- `index.html` — agregar botón "Ver más" en cada card y markup de modales
- `style.css` — estilos del modal, botones internos y acordeón
- `script.js` — lógica de apertura/cierre de modales y acordeón
- `apps/` — nueva carpeta donde se alojarán los APKs
  - `apps/sr.apk`
  - `apps/lunamoon.apk`
  - `apps/xyzvpn.apk`
  - `apps/swiftbackup.apk`

---

## Cambio en las cards existentes

Cada card de app recibe un botón al final:

```html
<button class="btn-ver-mas" data-modal="modal-sr">Ver más</button>
```

El card actual no sufre otros cambios visuales.

---

## Estructura del modal

Un modal por app, oculto por defecto (`display: none`), que se activa al hacer clic en "Ver más":

```
┌─────────────────────────────────┐
│  [X]                            │
│  [ícono]  Nombre de la App      │
│                                 │
│  Descripción larga de la app,   │
│  para quién es y qué resuelve.  │
│                                 │
│  ▼ Guía de uso                  │
│  (acordeón — pasos de uso)      │
│                                 │
│  ▼ Cómo instalar                │
│  (acordeón — 3 pasos)           │
│                                 │
│  [ ⬇ Descargar APK ]            │
└─────────────────────────────────┘
```

### Contenido por app

#### SR
- **Descripción:** Herramienta de gestión para negocios. Administrá clientes, inventario y generá reportes desde tu celular. Ideal para pequeños y medianos comercios.
- **Guía de uso:** Creá tu perfil de negocio → Cargá tus productos o servicios → Registrá clientes y movimientos → Consultá reportes desde el menú principal.
- **APK:** `apps/sr.apk`

#### Luna Moon
- **Descripción:** App de contenido educativo y entretenido para chicos. Videos, juegos y actividades seleccionados, en un entorno seguro y sin publicidad.
- **Guía de uso:** Abrí la app → Seleccioná la categoría (educación o entretenimiento) → Elegí el contenido → El adulto puede configurar restricciones desde el menú de ajustes.
- **APK:** `apps/lunamoon.apk`

#### XYZ VPN
- **Descripción:** VPN para Android que protege tu conexión con un toque. Sin registros, sin límites de datos, ideal para redes públicas o acceder a contenido restringido.
- **Guía de uso:** Abrí la app → Elegí un servidor → Tocá "Conectar" → Listo. El ícono de VPN aparece en la barra de estado cuando estás protegido.
- **APK:** `apps/xyzvpn.apk`

#### Swift Backup
- **Descripción:** Respaldo automático de datos en la nube. Guardá contactos, fotos y configuraciones. Restaurá todo con un toque si cambiás de celular.
- **Guía de uso:** Abrí la app → Iniciá sesión con tu cuenta → Seleccioná qué querés respaldar → Activá el respaldo automático o hacélo manual cuando quieras.
- **APK:** `apps/swiftbackup.apk`

---

## Guía de instalación (compartida para todas las apps)

1. **Descargá el APK** desde el botón de esta página
2. **Habilitá fuentes desconocidas:** Ajustes → Seguridad → Fuentes desconocidas (o "Instalar apps desconocidas" en Android 8+)
3. **Abrí el archivo APK** descargado y seguí los pasos de instalación

---

## Comportamiento del modal

- **Apertura:** clic en "Ver más" → modal aparece con animación fade-in + slide-up
- **Cierre:** clic en X, clic en el overlay oscuro, o tecla Escape
- **Acordeón:** "Guía de uso" y "Cómo instalar" son secciones colapsables. Solo una puede estar abierta a la vez.
- **Scroll interno:** si el contenido supera la altura de pantalla, el modal hace scroll internamente
- **Mobile:** modal ocupa el 95% del ancho, con padding adecuado

---

## Estilos

- Fondo del modal: mismo oscuro del sitio (`#0f0f0f` o similar)
- Bordes redondeados: `border-radius: 16px`
- Overlay: negro con 70% opacidad
- Botón "Descargar APK": color verde Android (`#3DDC84`), full width, ícono de descarga
- Botones de acordeón: borde sutil, fondo transparente, chevron que rota al abrir
- Tipografía: Poppins (ya cargada en el sitio)

---

## Lo que NO se hace en este spec

- No se sube a Play Store
- No se genera un sistema de login o descarga protegida
- No se agregan capturas de pantalla (pueden incorporarse en el futuro)
- No se modifica el diseño de las cards existentes más allá del botón

---

## Criterio de éxito

- Las 4 apps tienen modal funcional con contenido completo
- Los APKs se descargan correctamente desde Vercel
- El modal cierra con X, overlay y Escape
- El acordeón funciona en mobile y desktop
- El diseño es coherente con el resto del sitio
