// BrightSmile Dental Clinic - JavaScript Implementation
// This file contains all the functionality for the dental clinic website

class BrightSmileDental {
    constructor() {
        this.services = {
            general: {
                title: 'General Dentistry',
                description: 'Keep your smile healthy with our comprehensive general dental services.',
                offerings: [
                    'Regular cleanings and exams',
                    'Cavity fillings',
                    'Gum disease treatment',
                    'Teeth extractions'
                ],
                cost: 'Estimated Cost: $150 - $500'
            },
            cosmetic: {
                title: 'Cosmetic Dentistry',
                description: 'Enhance your smile with our cosmetic dental treatments.',
                offerings: [
                    'Teeth whitening',
                    'Veneers',
                    'Smile makeovers',
                    'Tooth bonding'
                ],
                cost: 'Estimated Cost: $500 - $2,000'
            },
            restorative: {
                title: 'Restorative Procedures',
                description: 'Restore your teeth to their natural appearance and function.',
                offerings: [
                    'Dental crowns',
                    'Bridges',
                    'Implants',
                    'Dentures'
                ],
                cost: 'Estimated Cost: $800 - $3,000'
            },
            root: {
                title: 'Root Canal Therapy',
                description: 'A root canal is used to treat infection inside a tooth and can help save a damaged tooth.',
                offerings: [
                    'Examination and X-rays',
                    'Removal of infected tissue',
                    'Cleaning and sealing of the tooth',
                    'Follow-up appointment if required'
                ],
                cost: 'Estimated Cost: $800 - $1,200'
            }
        };

        this.pricingServices = [
            { name: 'Cleaning & Exam', description: 'Regular checkup with professional cleaning', price: '$150' },
            { name: 'Cavity Filling', description: 'Treat and restore damaged teeth', price: '$250' },
            { name: 'Root Canal', description: 'Save infected or damaged teeth', price: '$1,000' },
            { name: 'Teeth Whitening', description: 'Professional whitening treatment', price: '$600' }
        ];

        this.contactInfo = {
            location: {
                title: 'Location',
                icon: '📍',
                details: ['BrightSmile Dental Clinic', '123 Bank Street', 'Ottawa, ON K1R 3B2']
            },
            phone: {
                title: 'Phone',
                icon: '📞',
                details: ['(613) 555-1234', 'Monday - Friday: 8AM - 6PM', 'Saturday: 9AM - 2PM']
            },
            email: {
                title: 'Email',
                icon: '📧',
                details: ['info@brightsmile.ca', 'We typically respond within 24 hours']
            }
        };

        this.init();
    }

    // Initialize the website
    init() {
        this.setupEventListeners();
        this.renderHTML();
    }

    // Setup event listeners
    setupEventListeners() {
        // Form submission
        document.addEventListener('submit', (e) => {
            if (e.target.id === 'appointmentForm') {
                this.handleFormSubmission(e);
            }
        });

        // Navigation scroll links
        document.addEventListener('click', (e) => {
            if (e.target.tagName === 'A' && e.target.getAttribute('href').startsWith('#')) {
                e.preventDefault();
                const targetId = e.target.getAttribute('href').substring(1);
                this.scrollToSection(targetId);
            }

            // Hero buttons
            if (e.target.classList.contains('btn')) {
                if (e.target.textContent.includes('Book Appointment')) {
                    this.scrollToSection('appointment');
                } else if (e.target.textContent.includes('Learn More')) {
                    this.scrollToSection('services');
                } else if (e.target.textContent.includes('Book')) {
                    const serviceName = e.target.getAttribute('data-service');
                    this.bookService(serviceName);
                }
            }

            // Service tabs
            if (e.target.classList.contains('tab-btn')) {
                const serviceId = e.target.getAttribute('data-service');
                this.showService(serviceId);
            }
        });
    }

    // Render the entire HTML structure
    renderHTML() {
        document.body.innerHTML = `
            ${this.renderNavbar()}
            ${this.renderHeroSection()}
            ${this.renderServicesSection()}
            ${this.renderPricingSection()}
            ${this.renderAppointmentSection()}
            ${this.renderContactSection()}
            ${this.renderDesignerSection()}
            ${this.renderFooter()}
        `;
    }

    // Render Navigation Bar
    renderNavbar() {
        return `
            <nav class="navbar">
                <h2>🦷 BrightSmile Dental</h2>
                <div class="nav-links">
                    <a href="#services">Services</a>
                    <a href="#pricing">Pricing</a>
                    <a href="#appointment">Book</a>
                    <a href="#contact">Contact</a>
                </div>
            </nav>
        `;
    }

    // Render Hero Section
    renderHeroSection() {
        return `
            <section class="hero">
                <h1>Welcome to BrightSmile Dental Clinic</h1>
                <p>Professional dental care in the heart of Ottawa</p>
                <div class="button-group">
                    <button class="btn btn-primary">Book Appointment</button>
                    <button class="btn btn-secondary">Learn More</button>
                </div>
            </section>
        `;
    }

    // Render Services Section
    renderServicesSection() {
        const tabs = Object.keys(this.services)
            .map((key, index) => `
                <button class="tab-btn ${index === 0 ? 'active' : ''}" data-service="${key}">
                    ${this.services[key].title}
                </button>
            `).join('');

        const content = Object.keys(this.services)
            .map((key, index) => `
                <div id="${key}" class="service-tab ${index !== 0 ? 'hidden' : ''}">
                    <h3>${this.services[key].title}</h3>
                    <p>${this.services[key].description}</p>
                    <p><strong>What We Offer:</strong></p>
                    <ul>
                        ${this.services[key].offerings.map(offering => `<li>${offering}</li>`).join('')}
                    </ul>
                    <div class="cost">${this.services[key].cost}</div>
                </div>
            `).join('');

        return `
            <section id="services" class="services">
                <h2>Our Services</h2>
                <div class="service-tabs">
                    ${tabs}
                </div>
                <div class="service-content">
                    ${content}
                </div>
            </section>
        `;
    }

    // Render Pricing Section
    renderPricingSection() {
        const cards = this.pricingServices
            .map(service => `
                <div class="price-card">
                    <h3>${service.name}</h3>
                    <p>${service.description}</p>
                    <div class="amount">${service.price}</div>
                    <button class="btn btn-primary" data-service="${service.name}">Book</button>
                </div>
            `).join('');

        return `
            <section id="pricing" class="pricing">
                <h2>Service Pricing</h2>
                <div class="pricing-grid">
                    ${cards}
                </div>
            </section>
        `;
    }

    // Render Appointment Section
    renderAppointmentSection() {
        return `
            <section id="appointment" class="appointment">
                <h2>Book Your Appointment</h2>
                <div class="form-container">
                    <form id="appointmentForm">
                        <div class="form-group">
                            <label for="name">Full Name</label>
                            <input type="text" id="name" name="name" required>
                        </div>

                        <div class="form-group">
                            <label for="email">Email</label>
                            <input type="email" id="email" name="email" required>
                        </div>

                        <div class="form-group">
                            <label for="phone">Phone Number</label>
                            <input type="tel" id="phone" name="phone" required>
                        </div>

                        <div class="form-group">
                            <label for="service">Service</label>
                            <select id="service" name="service" required>
                                <option value="">-- Select a service --</option>
                                <option value="General Dentistry">General Dentistry</option>
                                <option value="Cosmetic Dentistry">Cosmetic Dentistry</option>
                                <option value="Restorative Procedures">Restorative Procedures</option>
                                <option value="Root Canal Therapy">Root Canal Therapy</option>
                            </select>
                        </div>

                        <div class="form-group">
                            <label for="date">Preferred Date</label>
                            <input type="date" id="date" name="date" required>
                        </div>

                        <div class="form-group">
                            <label for="message">Additional Notes</label>
                            <textarea id="message" name="message" rows="4" placeholder="Tell us more about your needs..."></textarea>
                        </div>

                        <button type="submit" class="btn btn-primary" style="width: 100%;">Submit Appointment Request</button>
                        <div id="successAlert" class="alert">
                            ✓ Appointment request received! We will contact you shortly.
                        </div>
                    </form>
                </div>
            </section>
        `;
    }

    // Render Contact Section
    renderContactSection() {
        const cards = Object.values(this.contactInfo)
            .map(info => `
                <div class="contact-card">
                    <h3>${info.icon} ${info.title}</h3>
                    ${info.details.map((detail, index) => {
                        if (index === 0) return `<p><strong>${detail}</strong></p>`;
                        return `<p>${detail}</p>`;
                    }).join('')}
                </div>
            `).join('');

        return `
            <section id="contact" class="contact">
                <h2>Visit Us</h2>
                <div class="contact-grid">
                    ${cards}
                </div>
            </section>
        `;
    }

    // Render Designer Section
    renderDesignerSection() {
        return `
            <section class="designer">
                <h2>About the Designer</h2>
                <p>This website was designed and developed by Nawab Amedi, a Software Engineering student at the University of Ottawa. This project was created for the SEG 3125 course to demonstrate UI/UX design principles.</p>
            </section>
        `;
    }

    // Render Footer
    renderFooter() {
        return `
            <footer>
                <p>&copy; 2024 BrightSmile Dental Clinic. All rights reserved.</p>
                <p>Designed by Nawab Amedi | University of Ottawa</p>
            </footer>
        `;
    }

    // Show selected service
    showService(serviceId) {
        // Hide all service tabs
        document.querySelectorAll('.service-tab').forEach(tab => {
            tab.classList.add('hidden');
        });

        // Remove active class from all buttons
        document.querySelectorAll('.tab-btn').forEach(btn => {
            btn.classList.remove('active');
        });

        // Show selected service
        const selectedService = document.getElementById(serviceId);
        if (selectedService) {
            selectedService.classList.remove('hidden');
        }

        // Add active class to clicked button
        document.querySelector(`[data-service="${serviceId}"]`).classList.add('active');
    }

    // Book service function
    bookService(serviceName) {
        const serviceSelect = document.getElementById('service');
        if (serviceSelect) {
            serviceSelect.value = serviceName;
        }
        this.scrollToSection('appointment');
    }

    // Scroll to section
    scrollToSection(sectionId) {
        const section = document.getElementById(sectionId);
        if (section) {
            section.scrollIntoView({ behavior: 'smooth' });
        }
    }

    // Handle form submission
    handleFormSubmission(e) {
        e.preventDefault();

        // Get form data
        const formData = {
            name: document.getElementById('name').value,
            email: document.getElementById('email').value,
            phone: document.getElementById('phone').value,
            service: document.getElementById('service').value,
            date: document.getElementById('date').value,
            message: document.getElementById('message').value
        };

        // Log the form data (in a real app, this would be sent to a server)
        console.log('Appointment Request:', formData);

        // Show success message
        const successAlert = document.getElementById('successAlert');
        successAlert.classList.add('success');

        // Reset form after 2 seconds
        setTimeout(() => {
            e.target.reset();
            successAlert.classList.remove('success');
        }, 2000);
    }
}

// Initialize the application when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
    new BrightSmileDental();
});
