// ============================================
// Chainlearn Nexus - Software Download Website
// JavaScript Functionality
// ============================================

// DOM Elements
const mobileMenuToggle = document.querySelector('.mobile-menu-toggle');
const nav = document.querySelector('.nav');
const tabButtons = document.querySelectorAll('.tab-btn');
const softwareCards = document.querySelectorAll('.software-card');
const downloadButtons = document.querySelectorAll('.btn-download');
const downloadModal = document.getElementById('downloadModal');
const detailsModal = document.getElementById('detailsModal');
const documentationModal = document.getElementById('documentationModal');
const faqModal = document.getElementById('faqModal');
const inventorsModal = document.getElementById('inventorsModal');
const modalCloses = document.querySelectorAll('.modal-close');
const directDownloadLink = document.getElementById('directDownloadLink');

// Software Details Data
const softwareDetails = {
    desktop: {
        title: 'Chainlearn Nexus Desktop',
        version: '2.0.1',
        description: 'Full-featured desktop application for Windows.',
        features: [
            'Advanced project management tools',
            'Real-time collaboration features',
            'Integrated analytics dashboard',
            'Customizable workspace',
            'Offline mode support',
            'Multi-language support'
        ],
        requirements: [
            'Windows 10 (version 1903 or later) or Windows 11',
            '4 GB RAM minimum (8 GB recommended)',
            '500 MB free disk space',
            'Internet connection for activation'
        ],
        releaseDate: 'January 15, 2025',
        fileSize: '45.2 MB'
    },
    sdk: {
        title: 'Chainlearn Nexus SDK',
        version: '1.8.5',
        description: 'Software Development Kit for building custom integrations.',
        features: [
            'Complete API documentation',
            'Sample code and templates',
            'Testing tools and utilities',
            'Cross-platform support',
            'Developer community access',
            'Regular updates and patches'
        ],
        requirements: [
            'Windows 10/11, macOS 10.15+, or Linux',
            '8 GB RAM minimum',
            '2 GB free disk space',
            'Visual Studio 2019+ or equivalent IDE'
        ],
        releaseDate: 'December 20, 2024',
        fileSize: '128.5 MB'
    },
    utilities: {
        title: 'Chainlearn Nexus Utilities',
        version: '3.2.0',
        description: 'Essential utility tools for system maintenance.',
        features: [
            'System optimization tools',
            'Performance monitoring',
            'Backup and restore utilities',
            'Registry cleaner',
            'Disk cleanup tools',
            'Startup manager'
        ],
        requirements: [
            'Windows 10 (version 1903 or later) or Windows 11',
            '2 GB RAM minimum',
            '100 MB free disk space',
            'Administrator privileges'
        ],
        releaseDate: 'January 10, 2025',
        fileSize: '22.8 MB'
    },
    mobile: {
        title: 'Chainlearn Nexus Mobile Companion',
        version: '1.5.3',
        description: 'Mobile companion app for iOS and Android.',
        features: [
            'Sync with desktop application',
            'Push notifications',
            'Mobile-optimized interface',
            'Offline access to projects',
            'Quick actions and shortcuts',
            'Cloud backup integration'
        ],
        requirements: [
            'iOS 13.0+ or Android 8.0+',
            '50 MB free storage space',
            'Internet connection for sync'
        ],
        releaseDate: 'November 25, 2024',
        fileSize: '18.5 MB'
    },
    api: {
        title: 'Chainlearn Nexus API Tools',
        version: '2.1.0',
        description: 'Complete API toolkit for developers.',
        features: [
            'RESTful API client',
            'GraphQL support',
            'API testing suite',
            'Code generation tools',
            'Comprehensive documentation',
            'Postman collection included'
        ],
        requirements: [
            'Windows 10/11, macOS 10.15+, or Linux',
            '4 GB RAM minimum',
            '500 MB free disk space',
            'Node.js 16+ or Python 3.8+'
        ],
        releaseDate: 'January 5, 2025',
        fileSize: '95.3 MB'
    },
    security: {
        title: 'Chainlearn Nexus Security Suite',
        version: '1.0.8',
        description: 'Advanced security tools and encryption utilities.',
        features: [
            'End-to-end encryption',
            'Two-factor authentication',
            'Security audit tools',
            'Vulnerability scanner',
            'Password manager integration',
            'Compliance reporting'
        ],
        requirements: [
            'Windows 10 (version 1903 or later) or Windows 11',
            '4 GB RAM minimum',
            '200 MB free disk space',
            'Administrator privileges'
        ],
        releaseDate: 'December 15, 2024',
        fileSize: '67.4 MB'
    }
};

// ============================================
// Mobile Menu Toggle
// ============================================
if (mobileMenuToggle) {
    mobileMenuToggle.addEventListener('click', () => {
        nav.classList.toggle('active');
        const icon = mobileMenuToggle.querySelector('i');
        if (nav.classList.contains('active')) {
            icon.classList.remove('fa-bars');
            icon.classList.add('fa-times');
        } else {
            icon.classList.remove('fa-times');
            icon.classList.add('fa-bars');
        }
    });

    // Close mobile menu when clicking on a link
    const navLinks = document.querySelectorAll('.nav-link');
    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            nav.classList.remove('active');
            const icon = mobileMenuToggle.querySelector('i');
            icon.classList.remove('fa-times');
            icon.classList.add('fa-bars');
        });
    });
}

// ============================================
// Category Filtering
// ============================================
tabButtons.forEach(button => {
    button.addEventListener('click', () => {
        // Remove active class from all buttons
        tabButtons.forEach(btn => btn.classList.remove('active'));
        // Add active class to clicked button
        button.classList.add('active');

        const category = button.getAttribute('data-category');

        // Filter software cards
        softwareCards.forEach(card => {
            if (category === 'all') {
                card.classList.remove('hidden');
                card.style.display = 'flex';
            } else {
                const cardCategory = card.getAttribute('data-category');
                if (cardCategory === category) {
                    card.classList.remove('hidden');
                    card.style.display = 'flex';
                } else {
                    card.classList.add('hidden');
                    card.style.display = 'none';
                }
            }
        });

        // Smooth scroll to software grid
        document.getElementById('downloads').scrollIntoView({ 
            behavior: 'smooth',
            block: 'start'
        });
    });
});

// ============================================
// Download Functionality
// ============================================
// Update selector to handle both buttons and anchor links
const downloadLinks = document.querySelectorAll('.btn-download, .download-btn');

downloadLinks.forEach(link => {
    link.addEventListener('click', (e) => {
        // If it's an anchor with href, let it work naturally
        if (link.tagName === 'A' && link.href) {
            const fileName = link.href.split('/').pop();
            initiateDownload(fileName, link.href);
            e.preventDefault(); // Prevent default to show modal first
        } else {
            // Legacy button support
            e.preventDefault();
            const fileName = link.getAttribute('data-file');
            if (fileName) {
                initiateDownload(fileName, `downloads/${fileName}`);
            }
        }
    });
});

function initiateDownload(fileName, downloadUrl) {
    // Show download modal
    downloadModal.classList.add('active');
    document.getElementById('downloadFileName').textContent = fileName;
    
    // Set direct download link
    directDownloadLink.href = downloadUrl;
    directDownloadLink.download = fileName;

    // Simulate download progress
    const progressBar = document.getElementById('progressBar');
    progressBar.style.width = '0%';
    
    // Animate progress bar
    setTimeout(() => {
        progressBar.style.width = '100%';
    }, 100);

    // Trigger actual download after a short delay
    setTimeout(() => {
        // Create a temporary anchor element to trigger download
        const link = document.createElement('a');
        link.href = downloadUrl;
        link.download = fileName;
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);

        // Close modal after download starts
        setTimeout(() => {
            downloadModal.classList.remove('active');
            progressBar.style.width = '0%';
        }, 2000);
    }, 500);
}

// ============================================
// Details Modal
// ============================================
function showDetails(softwareId) {
    const details = softwareDetails[softwareId];
    
    if (!details) {
        console.error('Software details not found for:', softwareId);
        return;
    }

    const detailsTitle = document.getElementById('detailsTitle');
    const detailsContent = document.getElementById('detailsContent');

    detailsTitle.textContent = details.title;

    let html = `
        <div style="margin-bottom: 1.5rem;">
            <p style="color: var(--gray-600); margin-bottom: 1rem;">${details.description}</p>
            <div style="display: flex; gap: 2rem; flex-wrap: wrap; margin-bottom: 1rem;">
                <div>
                    <strong>Version:</strong> ${details.version}
                </div>
                <div>
                    <strong>File Size:</strong> ${details.fileSize}
                </div>
                <div>
                    <strong>Release Date:</strong> ${details.releaseDate}
                </div>
            </div>
        </div>
        <div style="margin-bottom: 1.5rem;">
            <h3 style="color: var(--primary-color); margin-bottom: 0.75rem; font-size: 1.25rem;">Key Features</h3>
            <ul style="list-style: none; padding-left: 0;">
    `;

    details.features.forEach(feature => {
        html += `<li style="padding: 0.5rem 0; border-bottom: 1px solid var(--gray-200);">
            <i class="fas fa-check-circle" style="color: var(--success-color); margin-right: 0.5rem;"></i>
            ${feature}
        </li>`;
    });

    html += `
            </ul>
        </div>
        <div>
            <h3 style="color: var(--primary-color); margin-bottom: 0.75rem; font-size: 1.25rem;">System Requirements</h3>
            <ul style="list-style: none; padding-left: 0;">
    `;

    details.requirements.forEach(requirement => {
        html += `<li style="padding: 0.5rem 0; border-bottom: 1px solid var(--gray-200);">
            <i class="fas fa-info-circle" style="color: var(--primary-color); margin-right: 0.5rem;"></i>
            ${requirement}
        </li>`;
    });

    html += `
            </ul>
        </div>
    `;

    detailsContent.innerHTML = html;
    detailsModal.classList.add('active');
}

// ============================================
// Modal Close Functionality
// ============================================
modalCloses.forEach(closeBtn => {
    closeBtn.addEventListener('click', () => {
        downloadModal.classList.remove('active');
        detailsModal.classList.remove('active');
        if (documentationModal) {
            documentationModal.classList.remove('active');
            currentDocPage = 1;
            updateDocPage();
        }
        if (faqModal) {
            faqModal.classList.remove('active');
            currentFAQPage = 1;
            updateFAQPage();
        }
        if (inventorsModal) {
            inventorsModal.classList.remove('active');
            currentInventorPage = 1;
            updateInventorPage();
        }
        document.body.style.overflow = '';
        
        // Reset progress bar
        const progressBar = document.getElementById('progressBar');
        if (progressBar) {
            progressBar.style.width = '0%';
        }
    });
});

// Close modal when clicking outside
window.addEventListener('click', (e) => {
    if (e.target === downloadModal) {
        downloadModal.classList.remove('active');
        document.body.style.overflow = '';
        const progressBar = document.getElementById('progressBar');
        if (progressBar) {
            progressBar.style.width = '0%';
        }
    }
    if (e.target === detailsModal) {
        detailsModal.classList.remove('active');
        document.body.style.overflow = '';
    }
    if (documentationModal && e.target === documentationModal) {
        documentationModal.classList.remove('active');
        currentDocPage = 1;
        updateDocPage();
        document.body.style.overflow = '';
    }
    if (faqModal && e.target === faqModal) {
        faqModal.classList.remove('active');
        currentFAQPage = 1;
        updateFAQPage();
        document.body.style.overflow = '';
    }
    if (inventorsModal && e.target === inventorsModal) {
        inventorsModal.classList.remove('active');
        document.body.style.overflow = '';
    }
});

// Close modal with Escape key
document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
        downloadModal.classList.remove('active');
        detailsModal.classList.remove('active');
        if (documentationModal) {
            documentationModal.classList.remove('active');
            currentDocPage = 1;
            updateDocPage();
        }
        if (faqModal) {
            faqModal.classList.remove('active');
            currentFAQPage = 1;
            updateFAQPage();
        }
        if (inventorsModal) {
            inventorsModal.classList.remove('active');
            currentInventorPage = 1;
            updateInventorPage();
        }
        document.body.style.overflow = '';
        const progressBar = document.getElementById('progressBar');
        if (progressBar) {
            progressBar.style.width = '0%';
        }
    }
});

// ============================================
// Documentation and FAQ Modal Functions
// ============================================
let currentDocPage = 1;
let currentFAQPage = 1;
let currentInventorPage = 1;
const totalDocPages = 7;
const totalFAQPages = 14;
const totalInventorPages = 7;

function showDocumentation() {
    if (documentationModal) {
        currentDocPage = 1;
        updateDocPage();
        documentationModal.classList.add('active');
        document.body.style.overflow = 'hidden';
    }
}

function showFAQ() {
    if (faqModal) {
        currentFAQPage = 1;
        updateFAQPage();
        faqModal.classList.add('active');
        document.body.style.overflow = 'hidden';
    }
}

function showInventors() {
    if (inventorsModal) {
        currentInventorPage = 1;
        updateInventorPage();
        inventorsModal.classList.add('active');
        document.body.style.overflow = 'hidden';
        // Scroll to top of modal content
        const modalBody = inventorsModal.querySelector('.modal-body');
        if (modalBody) {
            modalBody.scrollTop = 0;
        }
    }
}

function changeDocPage(direction) {
    const newPage = currentDocPage + direction;
    if (newPage >= 1 && newPage <= totalDocPages) {
        currentDocPage = newPage;
        updateDocPage();
    }
}

function changeFAQPage(direction) {
    const newPage = currentFAQPage + direction;
    if (newPage >= 1 && newPage <= totalFAQPages) {
        currentFAQPage = newPage;
        updateFAQPage();
    }
}

function changeInventorPage(direction) {
    const newPage = currentInventorPage + direction;
    if (newPage >= 1 && newPage <= totalInventorPages) {
        currentInventorPage = newPage;
        updateInventorPage();
    }
}

function updateDocPage() {
    // Hide all pages
    const pages = documentationModal.querySelectorAll('.doc-page');
    pages.forEach(page => page.classList.remove('active'));
    
    // Show current page
    const currentPageElement = documentationModal.querySelector(`.doc-page[data-page="${currentDocPage}"]`);
    if (currentPageElement) {
        currentPageElement.classList.add('active');
    }
    
    // Update page indicator
    const pageIndicator = document.getElementById('docCurrentPage');
    if (pageIndicator) {
        pageIndicator.textContent = currentDocPage;
    }
    
    // Update button states
    const prevBtn = documentationModal.querySelector('.btn-prev');
    const nextBtn = documentationModal.querySelector('.btn-next');
    if (prevBtn) {
        prevBtn.disabled = currentDocPage === 1;
    }
    if (nextBtn) {
        nextBtn.disabled = currentDocPage === totalDocPages;
    }
}

function updateFAQPage() {
    // Hide all pages
    const pages = faqModal.querySelectorAll('.faq-page');
    pages.forEach(page => page.classList.remove('active'));
    
    // Show current page
    const currentPageElement = faqModal.querySelector(`.faq-page[data-page="${currentFAQPage}"]`);
    if (currentPageElement) {
        currentPageElement.classList.add('active');
    }
    
    // Update page indicator
    const pageIndicator = document.getElementById('faqCurrentPage');
    if (pageIndicator) {
        pageIndicator.textContent = currentFAQPage;
    }
    
    // Update button states
    const prevBtn = faqModal.querySelector('.btn-prev');
    const nextBtn = faqModal.querySelector('.btn-next');
    if (prevBtn) {
        prevBtn.disabled = currentFAQPage === 1;
    }
    if (nextBtn) {
        nextBtn.disabled = currentFAQPage === totalFAQPages;
    }
}

function updateInventorPage() {
    // Hide all pages
    const pages = inventorsModal.querySelectorAll('.doc-page');
    pages.forEach(page => page.classList.remove('active'));
    
    // Show current page
    const currentPageElement = inventorsModal.querySelector(`.doc-page[data-page="${currentInventorPage}"]`);
    if (currentPageElement) {
        currentPageElement.classList.add('active');
    }
    
    // Update page indicator
    const pageIndicator = document.getElementById('inventorCurrentPage');
    if (pageIndicator) {
        pageIndicator.textContent = currentInventorPage;
    }
    
    // Update button states
    const prevBtn = inventorsModal.querySelector('.btn-prev');
    const nextBtn = inventorsModal.querySelector('.btn-next');
    if (prevBtn) {
        prevBtn.disabled = currentInventorPage === 1;
    }
    if (nextBtn) {
        nextBtn.disabled = currentInventorPage === totalInventorPages;
    }
}

// ============================================
// Smooth Scrolling for Navigation Links
// ============================================
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// ============================================
// Active Navigation Link on Scroll
// ============================================
window.addEventListener('scroll', () => {
    const sections = document.querySelectorAll('section[id]');
    const scrollY = window.pageYOffset;

    sections.forEach(section => {
        const sectionHeight = section.offsetHeight;
        const sectionTop = section.offsetTop - 100;
        const sectionId = section.getAttribute('id');
        const navLink = document.querySelector(`.nav-link[href="#${sectionId}"]`);

        if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
            document.querySelectorAll('.nav-link').forEach(link => {
                link.classList.remove('active');
            });
            if (navLink) {
                navLink.classList.add('active');
            }
        }
    });
});

// ============================================
// Intersection Observer for Animations
// ============================================
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

// Observe software cards
softwareCards.forEach(card => {
    card.style.opacity = '0';
    card.style.transform = 'translateY(20px)';
    card.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    observer.observe(card);
});

// ============================================
// Loading Animation
// ============================================
window.addEventListener('load', () => {
    document.body.style.opacity = '0';
    document.body.style.transition = 'opacity 0.5s ease';
    
    setTimeout(() => {
        document.body.style.opacity = '1';
    }, 100);
});

// ============================================
// Console Welcome Message
// ============================================
console.log('%cChainlearn Nexus', 'color: #0078d4; font-size: 24px; font-weight: bold;');
console.log('%cSoftware Download Website', 'color: #6c757d; font-size: 14px;');
console.log('%cWelcome! This website is built with modern web technologies.', 'color: #28a745; font-size: 12px;');

