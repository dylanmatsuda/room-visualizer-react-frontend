// src/components/SingleRoomView.js
import React from "react";
import { motion } from "framer-motion";
import { X, ArrowsClockwise, List, Trash } from "phosphor-react";
import "./SingleRoomView.css";

const backgroundVariants = {
  initial: { scale: 1, opacity: 0 },
  animate: { scale: 1, opacity: 1 },
  exit: { scale: 0.8, opacity: 1, transition: { duration: 0.4 } },
};

const SingleRoomView = ({ room, onExit, onChangeRoom, onRooms, onDelete }) => {
  return (
    <div className="single-room-container">
      <div className="single-room-header">
        <button className="header-button" onClick={onExit}>
          <X size={18} /> EXIT
        </button>
        <button className="header-button" onClick={onChangeRoom}>
          <ArrowsClockwise size={18} /> CHANGE ROOM
        </button>
        <button className="header-button" onClick={onRooms}>
          <List size={18} /> ROOMS
        </button>
        <button className="header-button" onClick={() => onDelete(room)}>
          <Trash size={18} /> DELETE
        </button>
      </div>

      <motion.div
        className="single-room-background"
        style={{ backgroundImage: `url(${room.imageUrl})` }}
        variants={backgroundVariants}
        initial="initial"
        animate="animate"
        exit="exit"
      />
    </div>
  );
};

export default SingleRoomView;
