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
                description: 'Transform your smile with our aesthetic dental treatments designed to enhance your natural beauty.',
                offerings: [
                    'Teeth whitening and bleaching',
                    'Porcelain veneers',
                    'Composite bonding',
                    'Smile makeovers'
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
                description: 'A root canal treats infection deep inside a tooth. The procedure removes infected pulp, cleans the canal, and seals it to prevent further infection. While the term might sound intimidating, modern root canal therapy is a comfortable way to save your natural tooth.',
                offerings: [
                    'Examination and X-rays',
                    'Removal of infected tissue',
                    'Cleaning and sealing of the tooth',
                    'Follow-up appointment if required'
                ],
                cost: 'Estimated Cost: $800 - $1,200',
                recovery: 'Most patients return to normal activities the next day. Mild sensitivity is normal for a few days and can be managed with over-the-counter pain medication.'
            }
        };

        this.pricingServices = [
            { name: 'Routine Cleaning', description: 'Professional cleaning and oral examination', price: '$120' },
            { name: 'Teeth Whitening', description: 'In-office whitening treatment', price: '$450' },
            { name: 'Dental Filling', description: 'Composite filling, varies by size', price: '$189 - $350' },
            { name: 'Root Canal', description: 'Complete root canal therapy, varies by tooth', price: '$800 - $1,200' },
            { name: 'Dental Crown', description: 'Porcelain or ceramic crown', price: '$1,000 - $1,500' },
            { name: 'Dental Implant', description: 'Single tooth implant with crown', price: '$2,500 - $3,500' }
        ];

        this.contactInfo = {
            location: {
                title: 'Location',
                icon: '📍',
                details: ['456 Wellness Avenue', 'Springfield, IL 62701']
            },
            phone: {
                title: 'Phone',
                icon: '📞',
                details: ['(217) 555-0123', 'Mon-Fri: 8am - 6pm']
            },
            email: {
                title: 'Email',
                icon: '📧',
                details: ['hello@smiledental.com', 'We reply within 24 hours']
            }
        };

        this.init();
    }

    // Initialize the website
    init() {
        this.injectStyles();
        this.renderHTML();
        this.setupEventListeners();
    }

    // Inject CSS styles
    injectStyles() {
        const style = document.createElement('style');
        style.textContent = `
            * {
                margin: 0;
                padding: 0;
                box-sizing: border-box;
            }

            body {
                font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif;
                line-height: 1.6;
                color: #333;
                background-color: #f8f8f8;
            }

            /* NAVBAR */
            nav {
                background: white;
                padding: 1rem 2rem;
                display: flex;
                justify-content: space-between;
                align-items: center;
                box-shadow: 0 2px 8px rgba(0, 0, 0, 0.05);
                position: sticky;
                top: 0;
                z-index: 100;
            }

            nav h2 {
                color: #2c3e50;
                font-size: 1.5rem;
                font-weight: 600;
                display: flex;
                align-items: center;
                gap: 0.5rem;
            }

            .nav-links {
                display: flex;
                gap: 2.5rem;
            }

            nav a {
                color: #555;
                text-decoration: none;
                font-weight: 500;
                transition: color 0.3s;
                font-size: 0.95rem;
                cursor: pointer;
            }

            nav a:hover {
                color: #b8683f;
            }

            /* HERO SECTION */
            .hero {
                background: linear-gradient(135deg, #f5f5f5 0%, #fafafa 100%);
                padding: 80px 2rem;
                display: flex;
                align-items: center;
                justify-content: center;
                gap: 60px;
                max-width: 1400px;
                margin: 0 auto;
            }

            .hero-content {
                flex: 1;
                max-width: 500px;
            }

            .hero h1 {
                font-size: 3rem;
                color: #1a1a1a;
                margin-bottom: 1.5rem;
                font-weight: 700;
                line-height: 1.2;
            }

            .hero p {
                font-size: 1rem;
                color: #666;
                margin-bottom: 2rem;
                line-height: 1.8;
            }

            .button-group {
                display: flex;
                gap: 1rem;
                flex-wrap: wrap;
            }

            .btn {
                padding: 12px 28px;
                font-size: 0.95rem;
                border: none;
                border-radius: 6px;
                cursor: pointer;
                transition: all 0.3s;
                text-decoration: none;
                display: inline-block;
                font-weight: 500;
            }

            .btn-primary {
                background: #b8683f;
                color: white;
            }

            .btn-primary:hover {
                background: #9d5536;
                transform: translateY(-2px);
                box-shadow: 0 4px 12px rgba(184, 104, 63, 0.3);
            }

            .btn-secondary {
                background: white;
                color: #333;
                border: 2px solid #ddd;
            }

            .btn-secondary:hover {
                border-color: #b8683f;
                color: #b8683f;
            }

            .hero-image {
                flex: 1;
                max-width: 500px;
            }

            .hero-image img {
                width: 100%;
                height: auto;
                border-radius: 12px;
            }

            /* SERVICES SECTION */
            .services {
                padding: 80px 2rem;
                background: white;
                text-align: center;
            }

            .services h2 {
                font-size: 2.5rem;
                color: #1a1a1a;
                margin-bottom: 0.5rem;
                font-weight: 700;
            }

            .services > p {
                color: #999;
                margin-bottom: 3rem;
                max-width: 600px;
                margin-left: auto;
                margin-right: auto;
            }

            .service-tabs {
                display: flex;
                gap: 1rem;
                justify-content: center;
                flex-wrap: wrap;
                margin-bottom: 3rem;
            }

            .tab-btn {
                padding: 10px 22px;
                background: white;
                border: 2px solid #ddd;
                color: #555;
                border-radius: 25px;
                cursor: pointer;
                font-weight: 500;
                transition: all 0.3s;
                font-size: 0.9rem;
            }

            .tab-btn.active {
                background: #697b87;
                color: white;
                border-color: #697b87;
            }

            .tab-btn:hover:not(.active) {
                border-color: #b8683f;
                color: #b8683f;
            }

            .service-content {
                background: white;
                padding: 3rem;
                border-radius: 8px;
                max-width: 900px;
                margin: 0 auto;
                text-align: left;
                box-shadow: 0 2px 8px rgba(0, 0, 0, 0.05);
            }

            .service-tab {
                display: none;
            }

            .service-tab.active {
                display: block;
            }

            .service-content h3 {
                color: #1a1a1a;
                margin-bottom: 1rem;
                font-size: 1.8rem;
                font-weight: 700;
            }

            .service-content > p {
                color: #666;
                margin-bottom: 1.5rem;
                line-height: 1.8;
            }

            .service-content ul {
                list-style: none;
                margin: 1.5rem 0;
            }

            .service-content li {
                padding: 0.5rem 0;
                color: #555;
                display: flex;
                align-items: center;
            }

            .service-content li:before {
                content: "✓";
                color: #b8683f;
                font-weight: bold;
                margin-right: 0.8rem;
            }

            .cost {
                background: #efefef;
                padding: 1rem;
                border-radius: 6px;
                margin-top: 1.5rem;
                color: #333;
            }

            .recovery-box {
                background: #d4e8dd;
                padding: 1.5rem;
                border-radius: 6px;
                margin-top: 2rem;
                border-left: 4px solid #697b87;
            }

            .recovery-box h4 {
                color: #1a1a1a;
                margin-bottom: 0.5rem;
                font-weight: 600;
            }

            .recovery-box p {
                color: #555;
                font-size: 0.95rem;
                line-height: 1.6;
            }

            /* PRICING SECTION */
            .pricing {
                padding: 80px 2rem;
                background: #f8f8f8;
                text-align: center;
            }

            .pricing h2 {
                font-size: 2.5rem;
                color: #1a1a1a;
                margin-bottom: 0.5rem;
                font-weight: 700;
            }

            .pricing > p {
                color: #999;
                margin-bottom: 3rem;
                max-width: 600px;
                margin-left: auto;
                margin-right: auto;
            }

            .pricing-grid {
                display: grid;
                grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
                gap: 2rem;
                max-width: 1200px;
                margin: 0 auto;
            }

            .price-card {
                background: white;
                padding: 2rem;
                border-radius: 8px;
                text-align: left;
                box-shadow: 0 2px 8px rgba(0, 0, 0, 0.05);
                transition: transform 0.3s, box-shadow 0.3s;
            }

            .price-card:hover {
                transform: translateY(-5px);
                box-shadow: 0 8px 16px rgba(0, 0, 0, 0.1);
            }

            .price-card h3 {
                color: #1a1a1a;
                margin-bottom: 0.5rem;
                font-weight: 700;
            }

            .price-card p {
                color: #999;
                font-size: 0.9rem;
                margin-bottom: 1rem;
            }

            .amount {
                font-size: 1.5rem;
                color: #b8683f;
                margin: 1rem 0;
                font-weight: 700;
            }

            .pricing-disclaimer {
                text-align: center;
                color: #999;
                font-size: 0.9rem;
                margin-top: 2rem;
                max-width: 1000px;
                margin-left: auto;
                margin-right: auto;
            }

            /* APPOINTMENT SECTION */
            .appointment {
                padding: 80px 2rem;
                background: white;
                text-align: center;
            }

            .appointment h2 {
                font-size: 2.5rem;
                color: #1a1a1a;
                margin-bottom: 0.5rem;
                font-weight: 700;
            }

            .appointment > p {
                color: #999;
                margin-bottom: 3rem;
                max-width: 600px;
                margin-left: auto;
                margin-right: auto;
            }

            .form-container {
                max-width: 500px;
                margin: 0 auto;
                background: white;
                padding: 2.5rem;
                border-radius: 8px;
                box-shadow: 0 2px 8px rgba(0, 0, 0, 0.05);
            }

            .form-group {
                margin-bottom: 1.5rem;
                text-align: left;
            }

            label {
                display: block;
                margin-bottom: 0.5rem;
                color: #333;
                font-weight: 600;
                font-size: 0.95rem;
            }

            input,
            textarea,
            select {
                width: 100%;
                padding: 12px;
                border: 2px solid #ddd;
                border-radius: 6px;
                font-size: 0.95rem;
                font-family: inherit;
                transition: border-color 0.3s;
            }

            input:focus,
            textarea:focus,
            select:focus {
                outline: none;
                border-color: #b8683f;
            }

            .alert {
                padding: 1rem;
                border-radius: 6px;
                margin-top: 1rem;
                display: none;
                text-align: center;
            }

            .alert.success {
                background: #d4edda;
                color: #155724;
                border: 1px solid #c3e6cb;
                display: block;
            }

            /* CONTACT SECTION */
            .contact {
                padding: 80px 2rem;
                background: #f8f8f8;
                text-align: center;
            }

            .contact h2 {
                font-size: 2.5rem;
                color: #1a1a1a;
                margin-bottom: 3rem;
                font-weight: 700;
            }

            .contact-grid {
                display: grid;
                grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
                gap: 2rem;
                max-width: 1000px;
                margin: 0 auto;
            }

            .contact-card {
                background: white;
                padding: 2rem;
                border-radius: 8px;
                text-align: center;
                box-shadow: 0 2px 8px rgba(0, 0, 0, 0.05);
            }

            .contact-card h3 {
                color: #1a1a1a;
                margin-bottom: 1rem;
                font-weight: 700;
                font-size: 1.2rem;
            }

            .contact-card .icon {
                font-size: 2rem;
                margin-bottom: 0.5rem;
            }

            .contact-card p {
                color: #666;
                margin: 0.5rem 0;
            }

            .contact-card strong {
                color: #333;
            }

            .office-hours {
                margin-top: 3rem;
                background: white;
                padding: 2rem;
                border-radius: 8px;
                max-width: 1000px;
                margin-left: auto;
                margin-right: auto;
                box-shadow: 0 2px 8px rgba(0, 0, 0, 0.05);
            }

            .office-hours h3 {
                color: #1a1a1a;
                margin-bottom: 1.5rem;
                font-weight: 700;
            }

            .hours-list {
                display: grid;
                grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
                gap: 1rem;
                text-align: left;
            }

            .hours-item {
                padding: 0.5rem 0;
                color: #666;
            }

            .hours-item strong {
                color: #333;
                display: inline-block;
                min-width: 120px;
            }

            /* DESIGNER SECTION */
            .designer {
                padding: 60px 2rem;
                background: white;
                text-align: center;
                border-top: 1px solid #eee;
            }

            .designer h2 {
                color: #1a1a1a;
                margin-bottom: 1rem;
                font-size: 1.5rem;
                font-weight: 700;
            }

            .designer p {
                max-width: 600px;
                margin: 0 auto;
                font-size: 0.95rem;
                color: #666;
                line-height: 1.6;
            }

            /* FOOTER */
            footer {
                background: #2c3e50;
                color: white;
                text-align: center;
                padding: 2rem;
                font-size: 0.9rem;
            }

            footer p {
                margin: 0.5rem 0;
            }

            /* HIDDEN CLASS */
            .hidden {
                display: none;
            }

            @media (max-width: 768px) {
                .hero {
                    flex-direction: column;
                    padding: 40px 1rem;
                }

                .hero h1 {
                    font-size: 2rem;
                }

                nav {
                    flex-direction: column;
                    gap: 1rem;
                }

                .nav-links {
                    flex-direction: column;
                    gap: 1rem;
                }

                .services h2,
                .pricing h2,
                .appointment h2,
                .contact h2 {
                    font-size: 1.8rem;
                }
            }
        `;
        document.head.appendChild(style);
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
            <nav>
                <h2>🦷 SmileCare Dental</h2>
                <div class="nav-links">
                    <a href="#services" onclick="window.app.scrollToSection('services'); return false;">Services</a>
                    <a href="#pricing" onclick="window.app.scrollToSection('pricing'); return false;">Pricing</a>
                    <a href="#appointment" onclick="window.app.scrollToSection('appointment'); return false;">Book Appointment</a>
                    <a href="#contact" onclick="window.app.scrollToSection('contact'); return false;">Contact</a>
                </div>
            </nav>
        `;
    }

    // Render Hero Section
    renderHeroSection() {
        return `
            <section class="hero">
                <div class="hero-content">
                    <h1>Your smile deserves gentle, expert care</h1>
                    <p>At SmileCare Dental, we believe dental care should be comfortable, transparent, and tailored to your needs. Our experienced team is here to help you achieve and maintain optimal dental health with personalized treatment plans and caring service.</p>
                    <div class="button-group">
                        <button class="btn btn-primary" onclick="window.app.scrollToSection('appointment')">Book Appointment</button>
                        <button class="btn btn-secondary" onclick="window.app.scrollToSection('services')">Learn More</button>
                    </div>
                </div>
                <div class="hero-image">
                    <img src="data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='400' height='300'%3E%3Crect fill='%23ddd' width='400' height='300'/%3E%3Ctext x='50%25' y='50%25' dominant-baseline='middle' text-anchor='middle' font-family='Arial' font-size='48' fill='%23999'%3E🦷%3C/text%3E%3C/svg%3E" alt="Dental services">
                </div>
            </section>
        `;
    }

    // Render Services Section
    renderServicesSection() {
        const tabs = Object.keys(this.services)
            .map((key, index) => `
                <button class="tab-btn ${index === 0 ? 'active' : ''}" onclick="window.app.showService('${key}')" data-service="${key}">
                    ${this.services[key].title}
                </button>
            `).join('');

        const content = Object.keys(this.services)
            .map((key, index) => `
                <div class="service-tab ${index === 0 ? 'active' : ''}" id="${key}">
                    <h3>${this.services[key].title}</h3>
                    <p>${this.services[key].description}</p>
                    <p><strong>What's included:</strong></p>
                    <ul>
                        ${this.services[key].offerings.map(offering => `<li>${offering}</li>`).join('')}
                    </ul>
                    <div class="cost">${this.services[key].cost}</div>
                    ${this.services[key].recovery ? `<div class="recovery-box"><h4>Recovery & Aftercare</h4><p>${this.services[key].recovery}</p></div>` : ''}
                </div>
            `).join('');

        return `
            <section id="services" class="services">
                <h2>Our Services</h2>
                <p>Comprehensive dental care designed around your comfort and well-being</p>
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
                </div>
            `).join('');

        return `
            <section id="pricing" class="pricing">
                <h2>Transparent Pricing</h2>
                <p>We believe you should know what to expect. Here are our standard fees. We accept most insurance plans.</p>
                <div class="pricing-grid">
                    ${cards}
                </div>
                <p class="pricing-disclaimer">* Prices may vary based on individual needs. We'll provide a detailed treatment plan and cost estimate before any procedure.</p>
            </section>
        `;
    }

    // Render Appointment Section
    renderAppointmentSection() {
        return `
            <section id="appointment" class="appointment">
                <h2>Book an Appointment</h2>
                <p>Schedule your visit at a time that works for you</p>
                <div class="form-container">
                    <form id="appointmentForm">
                        <div class="form-group">
                            <label for="name">Full Name</label>
                            <input type="text" id="name" name="name" required>
                        </div>

                        <div class="form-group">
                            <label for="phone">Phone Number</label>
                            <input type="tel" id="phone" name="phone" placeholder="(555) 123-4567" required>
                        </div>

                        <div class="form-group">
                            <label for="service">Service Needed</label>
                            <select id="service" name="service" required>
                                <option value="">Routine Cleaning</option>
                                <option value="General Dentistry">General Dentistry</option>
                                <option value="Cosmetic Dentistry">Cosmetic Dentistry</option>
                                <option value="Restorative Procedures">Restorative Procedures</option>
                                <option value="Root Canal Therapy">Root Canal Therapy</option>
                            </select>
                        </div>

                        <div class="form-group">
                            <label for="date">Preferred Date</label>
                            <input type="date" id="date" name="date" placeholder="mm/dd/yyyy" required>
                        </div>

                        <div class="form-group">
                            <label for="time">Preferred Time</label>
                            <select id="time" name="time" required>
                                <option value="">Select a time</option>
                                <option value="8:00 AM">8:00 AM</option>
                                <option value="9:00 AM">9:00 AM</option>
                                <option value="10:00 AM">10:00 AM</option>
                                <option value="11:00 AM">11:00 AM</option>
                                <option value="1:00 PM">1:00 PM</option>
                                <option value="2:00 PM">2:00 PM</option>
                                <option value="3:00 PM">3:00 PM</option>
                                <option value="4:00 PM">4:00 PM</option>
                                <option value="5:00 PM">5:00 PM</option>
                            </select>
                        </div>

                        <button type="submit" class="btn btn-primary" style="width: 100%;">Request Appointment</button>
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
        const contactCards = `
            <div class="contact-card">
                <div class="icon">📍</div>
                <h3>Location</h3>
                <p><strong>456 Wellness Avenue</strong></p>
                <p>Springfield, IL 62701</p>
            </div>
            <div class="contact-card">
                <div class="icon">📞</div>
                <h3>Phone</h3>
                <p><strong>(217) 555-0123</strong></p>
                <p>Mon-Fri: 8am - 6pm</p>
            </div>
            <div class="contact-card">
                <div class="icon">📧</div>
                <h3>Email</h3>
                <p><strong>hello@smiledental.com</strong></p>
                <p>We reply within 24 hours</p>
            </div>
        `;

        const officeHours = `
            <div class="office-hours">
                <h3>⏰ Office Hours</h3>
                <div class="hours-list">
                    <div class="hours-item"><strong>Monday - Thursday</strong><br>8:00 AM - 6:00 PM</div>
                    <div class="hours-item"><strong>Friday</strong><br>8:00 AM - 4:00 PM</div>
                    <div class="hours-item"><strong>Saturday</strong><br>9:00 AM - 2:00 PM</div>
                    <div class="hours-item"><strong>Sunday</strong><br>Closed</div>
                </div>
            </div>
        `;

        return `
            <section id="contact" class="contact">
                <h2>Visit Us</h2>
                <p>We're here to answer your questions and welcome you to our practice</p>
                <div class="contact-grid">
                    ${contactCards}
                </div>
                ${officeHours}
            </section>
        `;
    }

    // Render Designer Section
    renderDesignerSection() {
        return `
            <section class="designer">
                <h2>About the Designer</h2>
                <p>This website was designed and developed by Nawab Amedi, a Software Engineering student at the University of Ottawa. This project was created for the SEG 3125 course to demonstrate UI/UX design principles and responsive web development practices.</p>
            </section>
        `;
    }

    // Render Footer
    renderFooter() {
        return `
            <footer>
                <p>&copy; 2024 SmileCare Dental Clinic. All rights reserved.</p>
                <p>Designed by Nawab Amedi | University of Ottawa</p>
            </footer>
        `;
    }

    // Setup event listeners
    setupEventListeners() {
        // Attach click listeners to tab buttons
        const tabButtons = document.querySelectorAll('.tab-btn');
        tabButtons.forEach(button => {
            button.addEventListener('click', (e) => {
                const serviceId = button.getAttribute('data-service');
                this.showService(serviceId);
            });
        });

        // Attach form submission listener
        const appointmentForm = document.getElementById('appointmentForm');
        if (appointmentForm) {
            appointmentForm.addEventListener('submit', (e) => {
                this.handleFormSubmission(e);
            });
        }
    }

    // Show selected service
    showService(serviceId) {
        // Hide all service tabs
        document.querySelectorAll('.service-tab').forEach(tab => {
            tab.classList.remove('active');
        });

        // Remove active class from all buttons
        document.querySelectorAll('.tab-btn').forEach(btn => {
            btn.classList.remove('active');
        });

        // Show selected service
        const selectedService = document.getElementById(serviceId);
        if (selectedService) {
            selectedService.classList.add('active');
        }

        // Add active class to clicked button
        document.querySelector(`[data-service="${serviceId}"]`).classList.add('active');
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
            phone: document.getElementById('phone').value,
            service: document.getElementById('service').value,
            date: document.getElementById('date').value,
            time: document.getElementById('time').value
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
    window.app = new BrightSmileDental();
});
