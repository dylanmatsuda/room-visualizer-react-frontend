// src/components/RoomCard.js
import React from "react";
import "./RoomCard.css";

const RoomCard = ({ room }) => {
  return (
    <div className="room-card">
      <div className="room-card-image-container">
        <img src={room.imageUrl} alt={room.name} className="room-card-image" />
      </div>
    </div>
  );
};

export default RoomCard;
