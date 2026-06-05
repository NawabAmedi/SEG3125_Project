import React, { useState } from 'react';
import './Design1.css';

export default function BrightSmileDental() {
  const [activeService, setActiveService] = useState('general');
  const [showSuccessAlert, setShowSuccessAlert] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    service: '',
    date: '',
    message: ''
  });

  const showService = (serviceId) => {
    setActiveService(serviceId);
  };

  const bookService = (service) => {
    setFormData({ ...formData, service });
    document.getElementById('appointment').scrollIntoView({ behavior: 'smooth' });
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
    setShowSuccessAlert(true);

    setTimeout(() => {
      setFormData({
        name: '',
        email: '',
        phone: '',
        service: '',
        date: '',
        message: ''
      });
      setShowSuccessAlert(false);
    }, 2000);
  };

  const scrollToSection = (sectionId) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <>
      {/* NAVBAR */}
      <nav className="navbar">
        <h2>🦷 BrightSmile Dental</h2>
        <div>
          <a href="#services" onClick={() => scrollToSection('services')}>Services</a>
          <a href="#pricing" onClick={() => scrollToSection('pricing')}>Pricing</a>
          <a href="#appointment" onClick={() => scrollToSection('appointment')}>Book</a>
          <a href="#contact" onClick={() => scrollToSection('contact')}>Contact</a>
        </div>
      </nav>

      {/* HERO SECTION */}
      <section className="hero">
        <h1>Welcome to BrightSmile Dental Clinic</h1>
        <p>Professional dental care in the heart of Ottawa</p>
        <div className="button-group">
          <button className="btn btn-primary" onClick={() => scrollToSection('appointment')}>
            Book Appointment
          </button>
          <button className="btn btn-secondary" onClick={() => scrollToSection('services')}>
            Learn More
          </button>
        </div>
      </section>

      {/* SERVICES SECTION */}
      <section id="services" className="services">
        <h2>Our Services</h2>

        <div className="service-tabs">
          <button
            className={`tab-btn ${activeService === 'general' ? 'active' : ''}`}
            onClick={() => showService('general')}
          >
            General Dentistry
          </button>
          <button
            className={`tab-btn ${activeService === 'cosmetic' ? 'active' : ''}`}
            onClick={() => showService('cosmetic')}
          >
            Cosmetic Dentistry
          </button>
          <button
            className={`tab-btn ${activeService === 'restorative' ? 'active' : ''}`}
            onClick={() => showService('restorative')}
          >
            Restorative Procedures
          </button>
          <button
            className={`tab-btn ${activeService === 'root' ? 'active' : ''}`}
            onClick={() => showService('root')}
          >
            Root Canal Therapy
          </button>
        </div>

        <div className="service-content">
          {/* General Dentistry */}
          {activeService === 'general' && (
            <div className="service-tab">
              <h3>General Dentistry</h3>
              <p>Keep your smile healthy with our comprehensive general dental services.</p>
              <p><strong>What We Offer:</strong></p>
              <ul>
                <li>Regular cleanings and exams</li>
                <li>Cavity fillings</li>
                <li>Gum disease treatment</li>
                <li>Teeth extractions</li>
              </ul>
              <div className="cost">Estimated Cost: $150 - $500</div>
            </div>
          )}

          {/* Cosmetic Dentistry */}
          {activeService === 'cosmetic' && (
            <div className="service-tab">
              <h3>Cosmetic Dentistry</h3>
              <p>Enhance your smile with our cosmetic dental treatments.</p>
              <p><strong>What We Offer:</strong></p>
              <ul>
                <li>Teeth whitening</li>
                <li>Veneers</li>
                <li>Smile makeovers</li>
                <li>Tooth bonding</li>
              </ul>
              <div className="cost">Estimated Cost: $500 - $2,000</div>
            </div>
          )}

          {/* Restorative Procedures */}
          {activeService === 'restorative' && (
            <div className="service-tab">
              <h3>Restorative Procedures</h3>
              <p>Restore your teeth to their natural appearance and function.</p>
              <p><strong>What We Offer:</strong></p>
              <ul>
                <li>Dental crowns</li>
                <li>Bridges</li>
                <li>Implants</li>
                <li>Dentures</li>
              </ul>
              <div className="cost">Estimated Cost: $800 - $3,000</div>
            </div>
          )}

          {/* Root Canal Therapy */}
          {activeService === 'root' && (
            <div className="service-tab">
              <h3>Root Canal Therapy</h3>
              <p>A root canal is used to treat infection inside a tooth and can help save a damaged tooth.</p>
              <p><strong>What to Expect:</strong></p>
              <ul>
                <li>Examination and X-rays</li>
                <li>Removal of infected tissue</li>
                <li>Cleaning and sealing of the tooth</li>
                <li>Follow-up appointment if required</li>
              </ul>
              <div className="cost">Estimated Cost: $800 - $1,200</div>
            </div>
          )}
        </div>
      </section>

      {/* PRICING SECTION */}
      <section id="pricing" className="pricing">
        <h2>Service Pricing</h2>
        <div className="pricing-grid">
          <div className="price-card">
            <h3>Cleaning & Exam</h3>
            <p>Regular checkup with professional cleaning</p>
            <div className="amount">$150</div>
            <button className="btn btn-primary" onClick={() => bookService('Cleaning & Exam')}>Book</button>
          </div>
          <div className="price-card">
            <h3>Cavity Filling</h3>
            <p>Treat and restore damaged teeth</p>
            <div className="amount">$250</div>
            <button className="btn btn-primary" onClick={() => bookService('Cavity Filling')}>Book</button>
          </div>
          <div className="price-card">
            <h3>Root Canal</h3>
            <p>Save infected or damaged teeth</p>
            <div className="amount">$1,000</div>
            <button className="btn btn-primary" onClick={() => bookService('Root Canal')}>Book</button>
          </div>
          <div className="price-card">
            <h3>Teeth Whitening</h3>
            <p>Professional whitening treatment</p>
            <div className="amount">$600</div>
            <button className="btn btn-primary" onClick={() => bookService('Teeth Whitening')}>Book</button>
          </div>
        </div>
      </section>

      {/* APPOINTMENT SECTION */}
      <section id="appointment" className="appointment">
        <h2>Book Your Appointment</h2>
        <div className="form-container">
          <form id="appointmentForm" onSubmit={handleFormSubmit}>
            <div className="form-group">
              <label htmlFor="name">Full Name</label>
              <input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleInputChange}
                required
              />
            </div>

            <div className="form-group">
              <label htmlFor="email">Email</label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleInputChange}
                required
              />
            </div>

            <div className="form-group">
              <label htmlFor="phone">Phone Number</label>
              <input
                type="tel"
                id="phone"
                name="phone"
                value={formData.phone}
                onChange={handleInputChange}
                required
              />
            </div>

            <div className="form-group">
              <label htmlFor="service">Service</label>
              <select
                id="service"
                name="service"
                value={formData.service}
                onChange={handleInputChange}
                required
              >
                <option value="">-- Select a service --</option>
                <option value="General Dentistry">General Dentistry</option>
                <option value="Cosmetic Dentistry">Cosmetic Dentistry</option>
                <option value="Restorative Procedures">Restorative Procedures</option>
                <option value="Root Canal Therapy">Root Canal Therapy</option>
              </select>
            </div>

            <div className="form-group">
              <label htmlFor="date">Preferred Date</label>
              <input
                type="date"
                id="date"
                name="date"
                value={formData.date}
                onChange={handleInputChange}
                required
              />
            </div>

            <div className="form-group">
              <label htmlFor="message">Additional Notes</label>
              <textarea
                id="message"
                name="message"
                value={formData.message}
                onChange={handleInputChange}
                rows="4"
                placeholder="Tell us more about your needs..."
              />
            </div>

            <button type="submit" className="btn btn-primary" style={{ width: '100%' }}>
              Submit Appointment Request
            </button>
            {showSuccessAlert && (
              <div className="alert success">
                ✓ Appointment request received! We will contact you shortly.
              </div>
            )}
          </form>
        </div>
      </section>

      {/* CONTACT SECTION */}
      <section id="contact" className="contact">
        <h2>Visit Us</h2>
        <div className="contact-grid">
          <div className="contact-card">
            <h3>📍 Location</h3>
            <p><strong>BrightSmile Dental Clinic</strong></p>
            <p>123 Bank Street</p>
            <p>Ottawa, ON K1R 3B2</p>
          </div>
          <div className="contact-card">
            <h3>📞 Phone</h3>
            <p><strong>(613) 555-1234</strong></p>
            <p>Monday - Friday: 8AM - 6PM</p>
            <p>Saturday: 9AM - 2PM</p>
          </div>
          <div className="contact-card">
            <h3>📧 Email</h3>
            <p><strong>info@brightsmile.ca</strong></p>
            <p>We typically respond within 24 hours</p>
          </div>
        </div>
      </section>

      {/* DESIGNER SECTION */}
      <section className="designer">
        <h2>About the Designer</h2>
        <p>This website was designed and developed by Nawab Amedi, a Software Engineering student at the University of Ottawa. This project was created for the SEG 3125 course to demonstrate UI/UX design [...]</p>
      </section>

      {/* FOOTER */}
      <footer>
        <p>&copy; 2024 BrightSmile Dental Clinic. All rights reserved.</p>
        <p>Designed by Nawab Amedi | University of Ottawa</p>
      </footer>
    </>
  );
}
