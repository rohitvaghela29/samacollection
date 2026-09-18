import React from "react";
import "../styles/About.css";
import shopImage from "../assets/shop/storefront.jpg";

const GOOGLE_MAPS_EMBED_URL =
  "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3669.0!2d71.6309864!3d22.7260348!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x39594172bd4fe819%3A0xb539efe3f6a790dd!2sSAMA%20COLLECTION!5e0!3m2!1sen!2sin!4v1695067200000!5m2!1sen!2sin";

const GOOGLE_MAPS_LINK =
  "https://www.google.com/maps/place/SAMA+COLLECTION/@22.7260348,71.6309864,17z/data=!4m15!1m8!3m7!1s0x39594172bd4fe819:0xb539efe3f6a790dd!2sSAMA+COLLECTION!8m2!3d22.7260348!4d71.6309864!10e1!16s%2Fg%2F11y_jst1gh!3m5!1s0x39594172bd4fe819:0xb539efe3f6a790dd!8m2!3d22.7260348!4d71.6309864!16s%2Fg%2F11y_jst1gh?entry=ttu";

const WHATSAPP_NUMBER = "9925736357";
const WHATSAPP_LINK = `https://wa.me/91${WHATSAPP_NUMBER}?text=Hi%20Sama%20Collection!%20I%27d%20like%20to%20enquire%20about%20your%20products.`;

const About = () => {
  return (
    <section className="about-section" id="about">
      <div className="about-container">
        {/* Section Header */}
        <div className="about-header">
          <span className="about-eyebrow">Visit Us</span>
          <h2 className="about-title">Our Store</h2>
          <p className="about-subtitle">
            Step into Sama Collection — where tradition meets modern grace.
            Visit our boutique to experience our handcrafted collection in
            person.
          </p>
        </div>

        {/* Main About Grid — Image + Details */}
        <div className="about-grid">
          {/* Shop Image */}
          <div className="about-image-wrap">
            <img
              src={shopImage}
              alt="Sama Collection storefront in Surendranagar"
              className="about-shop-image"
              loading="lazy"
            />
            <div className="about-image-overlay">
              <span className="image-overlay-text">સમા કલેક્શન</span>
            </div>
          </div>

          {/* Store Details */}
          <div className="about-details">
            {/* Store Name */}
            <div className="store-name-block">
              <h3 className="store-name">Sama Collection</h3>
              <span className="store-tagline">
                Artisan Luxury &amp; Modern Ethnic Wear
              </span>
            </div>

            {/* Contact Info Cards */}
            <div className="about-info-cards">
              {/* Address Card */}
              <div className="info-card">
                <div className="info-card-icon">
                  <svg
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path>
                    <circle cx="12" cy="10" r="3"></circle>
                  </svg>
                </div>
                <div className="info-card-content">
                  <h4 className="info-card-label">Store Address</h4>
                  <p className="info-card-value">
                    2nd Floor, Ram Complex,
                    <br />
                    Javahar Rd, Opp. Ajay Arcade,
                    <br />
                    Vadhavan, Surendranagar,
                    <br />
                    Gujarat 363001
                  </p>
                  <a
                    href={GOOGLE_MAPS_LINK}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="info-card-action"
                  >
                    Get Directions &rarr;
                  </a>
                </div>
              </div>

              {/* WhatsApp Card */}
              <div className="info-card info-card--whatsapp">
                <div className="info-card-icon info-card-icon--whatsapp">
                  <svg viewBox="0 0 24 24" fill="currentColor">
                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
                  </svg>
                </div>
                <div className="info-card-content">
                  <h4 className="info-card-label">WhatsApp Us</h4>
                  <p className="info-card-value info-card-value--phone">
                    +91 99257 36357
                  </p>
                  <a
                    href={WHATSAPP_LINK}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn-whatsapp"
                  >
                    <svg
                      viewBox="0 0 24 24"
                      fill="currentColor"
                      className="whatsapp-btn-icon"
                    >
                      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
                    </svg>
                    <span>Chat on WhatsApp</span>
                  </a>
                </div>
              </div>

              {/* Store Hours Card */}
              <div className="info-card">
                <div className="info-card-icon">
                  <svg
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <circle cx="12" cy="12" r="10"></circle>
                    <polyline points="12 6 12 12 16 14"></polyline>
                  </svg>
                </div>
                <div className="info-card-content">
                  <h4 className="info-card-label">Store Hours</h4>
                  <div className="store-hours-list">
                    <div className="hours-row">
                      <span className="hours-day">Mon – Sat</span>
                      <span className="hours-time">10:00 AM – 9:00 PM</span>
                    </div>
                    <div className="hours-row">
                      <span className="hours-day">Sunday</span>
                      <span className="hours-time">11:00 AM – 7:00 PM</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Interactive Google Map */}
        <div className="about-map-section">
          <div className="map-header">
            <h3 className="map-title">Find Us On The Map</h3>
            <a
              href={GOOGLE_MAPS_LINK}
              target="_blank"
              rel="noopener noreferrer"
              className="map-external-link"
            >
              Open in Google Maps &rarr;
            </a>
          </div>
          <div className="map-embed-wrap">
            <iframe
              src={GOOGLE_MAPS_EMBED_URL}
              className="map-iframe"
              title="Sama Collection Store Location - Google Maps"
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              allowFullScreen
            ></iframe>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
