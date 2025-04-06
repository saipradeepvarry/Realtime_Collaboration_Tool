import React from "react";
import { FaInstagram, FaLinkedin, FaGithub, FaWhatsapp } from "react-icons/fa";
import "./ContactPopup.css";

function ContactPopup({ closePopup }) {
  const message = "Hello, I would like to know more!";

  const openWhatsappChat = () => {
    const whatsappUrl = `https://wa.me/+917997930250?text=${encodeURIComponent(message)}`;
    window.open(whatsappUrl, "_blank");
  };

  return (
    <div className="ContactPopupContainer" onClick={closePopup}>
      <div className="PopupWrapper" onClick={(e) => e.stopPropagation()}>
        <div className="PopupHeader">
          <h3>Contact Us</h3>
          <button className="CloseButton" onClick={closePopup}>
            &times;
          </button>
        </div>
        <div className="ContactList">
          <a
            className="ContactItem"
            href="https://www.instagram.com/pradeepsai799/"
            target="_blank"
            rel="noopener noreferrer"
          >
            <FaInstagram /> Instagram
          </a>
          <a
            className="ContactItem"
            href="https://www.linkedin.com/in/saipradeepvarry79979/"
            target="_blank"
            rel="noopener noreferrer"
          >
            <FaLinkedin /> LinkedIn
          </a>
          <a
            className="ContactItem"
            href="https://github.com/saipradeepvarry"
            target="_blank"
            rel="noopener noreferrer"
          >
            <FaGithub /> GitHub
          </a>
          <div className="ContactItem" onClick={openWhatsappChat} style={{ cursor: "pointer" }}>
            <FaWhatsapp /> WhatsApp
          </div>
        </div>
      </div>
    </div>
  );
}

export default ContactPopup;
