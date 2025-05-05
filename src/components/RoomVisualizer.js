// src/components/RoomVisualizer.js
import React from "react";
import SingleRoomView from "./SingleRoomView";
import RoomsOverview from "./RoomsOverview";
import { AnimatePresence, motion } from "framer-motion";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import "./RoomVisualizer.css";

const singleRoomVariants = {
  initial: { scale: 0.8, opacity: 0 },
  animate: { scale: 1, opacity: 1, transition: { duration: 0.4 } },
  exit: { scale: 0.95, opacity: 0.5, transition: { duration: 0.3 } },
};

const roomsOverviewVariants = {
  initial: { opacity: 0 },
  animate: { opacity: 1, transition: { duration: 0.4 } },
  exit: { opacity: 0, transition: { duration: 0.4 } },
};

const RoomVisualizer = ({
  isRoomsMode,
  rooms,
  selectedRoom,
  onSelectRoom,
  onRooms,
  onDelete,
  onDuplicateRoom,
  onEnterSingleRoom,
}) => {
  return (
    <div className="room-visualizer">
      <AnimatePresence mode="wait">
        {isRoomsMode ? (
          <motion.div
            key="roomsOverview"
            variants={roomsOverviewVariants}
            initial="initial"
            animate="animate"
            exit="exit"
          >
            <RoomsOverview
              rooms={rooms}
              selectedRoom={selectedRoom}
              onSelectRoom={onSelectRoom}
              onEnterSingleRoom={onEnterSingleRoom}
              onDuplicateRoom={onDuplicateRoom}
            />
          </motion.div>
        ) : (
          <motion.div
            key="singleRoom"
            variants={singleRoomVariants}
            initial="initial"
            animate="animate"
            exit="exit"
          >
            <SingleRoomView
              room={selectedRoom}
              onExit={() => console.log("Exit")}
              onChangeRoom={() => console.log("Change Room")}
              onRooms={onRooms}
              onDelete={onDelete}
            />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default RoomVisualizer;
