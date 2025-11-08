# Chainlearn Nexus - Software Download Website

A professional, modern, and responsive software download website built with HTML, CSS, and JavaScript.

## Features

✨ **Modern Design**
- Clean, professional interface inspired by Microsoft's software download page
- Smooth animations and transitions
- Gradient backgrounds and modern UI elements

📱 **Fully Responsive**
- Mobile-first design approach
- Works seamlessly on desktop, tablet, and mobile devices
- Adaptive navigation menu

🎯 **Interactive Features**
- Category filtering (All, Applications, Development Tools, Utilities)
- Download functionality with progress animation
- Detailed software information modals
- Smooth scrolling navigation

⚡ **Performance**
- Lightweight and fast loading
- Optimized CSS and JavaScript
- No external dependencies (except Font Awesome for icons)

## File Structure

```
Chainlearn Nexus/
│
├── index.html          # Main HTML file
├── styles.css          # All styling and responsive design
├── script.js           # Interactive functionality
├── README.md           # This file
└── downloads/          # Folder for downloadable files
    └── README.md       # Instructions for download files
```

## Getting Started

1. **Open the website**
   - Simply open `index.html` in your web browser
   - Or use a local server (recommended):
     ```bash
     # Using Python
     python -m http.server 8000
     
     # Using Node.js (http-server)
     npx http-server
     ```

2. **Add Download Files**
   - Place your `.exe` files in the `downloads/` folder
   - Make sure filenames match the `data-file` attributes in `index.html`
   - Current expected files:
     - `ChainlearnNexus-Desktop-v2.0.1.exe`
     - `ChainlearnNexus-SDK-v1.8.5.exe`
     - `ChainlearnNexus-Utilities-v3.2.0.exe`
     - `ChainlearnNexus-Mobile-v1.5.3.exe`
     - `ChainlearnNexus-API-Tools-v2.1.0.exe`
     - `ChainlearnNexus-Security-v1.0.8.exe`

3. **Customize Content**
   - Edit `index.html` to change software names, descriptions, and versions
   - Modify `script.js` to update software details in the `softwareDetails` object
   - Update `styles.css` to change colors, fonts, or styling

## Customization

### Changing Colors

Edit the CSS variables in `styles.css`:

```css
:root {
    --primary-color: #0078d4;    /* Main brand color */
    --primary-dark: #005a9e;     /* Darker shade */
    --primary-light: #40a6ff;    /* Lighter shade */
    /* ... more variables */
}
```

### Adding New Software

1. Add a new card in `index.html`:
```html
<div class="software-card" data-category="applications">
    <!-- Card content -->
</div>
```

2. Add details in `script.js`:
```javascript
const softwareDetails = {
    newSoftware: {
        title: 'Your Software Name',
        version: '1.0.0',
        // ... more details
    }
};
```

### Changing Download Files

Update the `data-file` attribute in the download buttons:
```html
<button class="btn btn-download" data-file="YourFile.exe">
```

## Browser Support

- ✅ Chrome (latest)
- ✅ Firefox (latest)
- ✅ Safari (latest)
- ✅ Edge (latest)
- ✅ Opera (latest)

## Technologies Used

- **HTML5** - Semantic markup
- **CSS3** - Modern styling with CSS Grid and Flexbox
- **JavaScript (ES6+)** - Interactive functionality
- **Font Awesome 6.4.0** - Icons (CDN)

## Features Breakdown

### Navigation
- Sticky header that stays at the top while scrolling
- Smooth scroll to sections
- Active link highlighting based on scroll position
- Mobile-responsive hamburger menu

### Software Cards
- Hover effects with elevation
- Category filtering
- Download buttons with progress animation
- Details modal with comprehensive information

### Download System
- Automatic file download on button click
- Download progress animation
- Direct download link fallback
- Modal confirmation

### Responsive Design
- Mobile menu toggle
- Adaptive grid layouts
- Flexible typography
- Touch-friendly buttons

## Future Enhancements

Potential features to add:
- [ ] User authentication
- [ ] Download history
- [ ] Search functionality
- [ ] Version comparison
- [ ] Release notes section
- [ ] System requirement checker
- [ ] Multi-language support
- [ ] Dark mode toggle

## License

This project is created for Chainlearn Nexus. Customize as needed for your project.

## Support

For issues or questions, please refer to the project documentation or contact the development team.

---

**Built with ❤️ for Chainlearn Nexus**

