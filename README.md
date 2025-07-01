# 🍽️ Template de Sitio Web para Restaurante

Un template moderno y responsivo para sitios web de restaurantes, construido con **Tailwind CSS** y **animaciones UX avanzadas**. Perfecto para restaurantes, cafeterías, bares y cualquier negocio gastronómico que busque una presencia web profesional.

## ✨ Características Principales

- 🎨 **Diseño Moderno**: Interfaz elegante con efectos glassmorphism y gradientes
- 📱 **Totalmente Responsivo**: Optimizado para dispositivos móviles, tablets y desktop
- ⚡ **Animaciones Fluidas**: Transiciones suaves y efectos de parallax
- 🛒 **Sistema de Carrito**: Funcionalidad de carrito de compras integrada
- 🔍 **Filtros de Menú**: Sistema de filtrado dinámico por categorías
- 📅 **Modal de Reservas**: Sistema de reservas con formulario interactivo
- 🌟 **Efectos Visuales**: Animaciones de scroll, hover effects y transiciones
- ♿ **Accesibilidad**: Navegación por teclado y soporte para lectores de pantalla
- 🚀 **Optimización**: Lazy loading de imágenes y optimización de rendimiento

## 🛠️ Tecnologías Utilizadas

- **HTML5**: Estructura semántica y moderna
- **Tailwind CSS**: Framework de CSS utilitario para diseño rápido
- **JavaScript ES6+**: Funcionalidades interactivas y animaciones
- **Font Awesome**: Iconografía profesional
- **Google Fonts**: Tipografía Playfair Display y Inter

## 📁 Estructura del Proyecto

```
restaurant-website-template/
├── index.html              # Página principal
├── js/
│   └── animations.js       # Sistema de animaciones y funcionalidades UX
└── README.md              # Documentación del proyecto
```

## 🚀 Instalación y Uso

### Opción 1: Descarga Directa
1. Clona o descarga este repositorio
2. Abre `index.html` en tu navegador
3. ¡Listo! El sitio está funcionando

### Opción 2: Servidor Local
```bash
# Con Python
python -m http.server 8000

# Con Node.js
npx http-server -p 8000

# Con PHP
php -S localhost:8000
```

## 🎯 Funcionalidades Principales

### 🍽️ Sistema de Menú
- **Filtros Dinámicos**: Filtra por categorías (Entradas, Principales, Postres, Bebidas)
- **Carrito de Compras**: Agrega items al carrito con persistencia en localStorage
- **Animaciones**: Transiciones suaves al filtrar elementos
- **Navegación por Teclado**: Usa las flechas para navegar entre filtros

### 📅 Sistema de Reservas
- **Modal Interactivo**: Formulario de reservas con validación
- **Campos Requeridos**: Nombre, teléfono, fecha, hora y número de comensales
- **Notificaciones**: Confirmación visual de reservas exitosas
- **Accesibilidad**: Cierre con tecla Escape y navegación por teclado

### 🎨 Efectos Visuales
- **Glassmorphism**: Efectos de vidrio en navbar y cards
- **Parallax**: Movimiento sutil de elementos con el mouse
- **Scroll Animations**: Elementos aparecen al hacer scroll
- **Hover Effects**: Efectos interactivos en botones y cards

## 🎨 Personalización

### Colores
El template utiliza una paleta de colores personalizada definida en Tailwind:
- **Dorado**: `#D4AF37` (color principal)
- **Gradientes**: Combinaciones de dorado, naranja y rosa
- **Neutros**: Grises y blancos para balance

### Tipografía
- **Títulos**: Playfair Display (elegante y clásica)
- **Texto**: Inter (moderna y legible)

### Modificar Contenido
1. **Información del Restaurante**: Edita las secciones en `index.html`
2. **Menú**: Modifica los items en la sección `#menu`
3. **Imágenes**: Reemplaza las URLs de Unsplash con tus propias imágenes
4. **Colores**: Personaliza la paleta en las clases de Tailwind

## 📱 Responsive Design

El template está optimizado para:
- **Mobile**: 320px - 768px
- **Tablet**: 768px - 1024px
- **Desktop**: 1024px+

### Breakpoints Principales
- `sm:` 640px
- `md:` 768px
- `lg:` 1024px
- `xl:` 1280px

## ⚡ Optimización de Rendimiento

- **Lazy Loading**: Carga diferida de imágenes
- **Debounce**: Optimización de eventos de scroll y resize
- **CSS Minificado**: Tailwind CSS optimizado via CDN
- **JavaScript Modular**: Código organizado en clases

## 🔧 Configuración Avanzada

### Integración con Backend
Para conectar con un backend:

```javascript
// En animations.js, modifica el método handleReservation
handleReservation(form) {
    const formData = new FormData(form);
    
    fetch('/api/reservations', {
        method: 'POST',
        body: formData
    })
    .then(response => response.json())
    .then(data => {
        this.showNotification('Reserva confirmada exitosamente');
    })
    .catch(error => {
        this.showNotification('Error al procesar reserva', 'error');
    });
}
```

### Analytics
Para agregar Google Analytics:

```html
<!-- En el <head> de index.html -->
<script async src="https://www.googletagmanager.com/gtag/js?id=GA_TRACKING_ID"></script>
<script>
  window.dataLayer = window.dataLayer || [];
  function gtag(){dataLayer.push(arguments);}
  gtag('js', new Date());
  gtag('config', 'GA_TRACKING_ID');
</script>
```

## 🌐 SEO Optimización

El template incluye:
- Meta tags optimizados
- Estructura semántica HTML5
- Schema markup para restaurantes
- Open Graph tags para redes sociales
- Sitemap XML recomendado

## 🔍 Compatibilidad de Navegadores

- ✅ Chrome 60+
- ✅ Firefox 60+
- ✅ Safari 12+
- ✅ Edge 79+
- ✅ Opera 47+

## 📄 Licencia

Este proyecto está bajo la Licencia MIT. Puedes usarlo libremente para proyectos personales y comerciales.

## 🤝 Contribuciones

Las contribuciones son bienvenidas. Para contribuir:

1. Fork el proyecto
2. Crea una rama para tu feature (`git checkout -b feature/AmazingFeature`)
3. Commit tus cambios (`git commit -m 'Add some AmazingFeature'`)
4. Push a la rama (`git push origin feature/AmazingFeature`)
5. Abre un Pull Request

## 📞 Soporte

Si tienes preguntas o necesitas ayuda:
- Abre un [Issue](https://github.com/MarioMbf/restaurant-website-template/issues)
- Contacta al desarrollador

## 🔄 Actualizaciones Futuras

- [ ] Sistema de pedidos online
- [ ] Integración con redes sociales
- [ ] Panel de administración
- [ ] Múltiples idiomas
- [ ] PWA (Progressive Web App)
- [ ] Integración con sistemas de pago

---

⭐ **¡Si te gusta este proyecto, no olvides darle una estrella!** ⭐

**Desarrollado con ❤️ para la comunidad gastronómica**