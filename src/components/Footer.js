// src/components/Footer.js
import React from "react";
import { ShareNetwork, Star, CopySimple } from "phosphor-react";
import "./Footer.css";

const Footer = ({ room, onDuplicateRoom }) => {
  if (!room) return null;

  return (
    <div className="footer-container">
      <div className="footer-left">
        <h3 className="footer-room-name">{room.name}</h3>
        <p className="footer-room-stats">
          Floor: {room.floor} • Walls: {room.walls}
        </p>
      </div>
      <div className="footer-right">
        <button className="footer-button">
          <ShareNetwork size={18} /> SHARE
        </button>
        <button className="footer-button">
          <Star size={18} /> FAVORITE
        </button>
        <button className="footer-button" onClick={() => onDuplicateRoom(room)}>
          <CopySimple size={18} /> DUPLICATE
        </button>
      </div>
    </div>
  );
};

export default Footer;
