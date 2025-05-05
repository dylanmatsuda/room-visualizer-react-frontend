// src/App.js
import React, { useCallback, useState } from "react";
import "./styles.css";
import RoomVisualizer from "./components/RoomVisualizer";

export default function App() {
  // In practice, fetch from api with rooms as local state
  const initialRooms = [
    {
      id: 1,
      name: "Kitchen",
      imageUrl: "/images/Kitchen.jpg",
      floor: "Dark herringbone",
      walls: "Painted white",
    },
    {
      id: 2,
      name: "Living Room",
      imageUrl: "/images/living_room.jpg",
      floor: "Warm oak",
      walls: "Light grey",
    },
    {
      id: 3,
      name: "Bedroom",
      imageUrl: "/images/bedroom.jpg",
      floor: "Floor colour",
      walls: "Wall colour",
    },
  ];

  const [rooms, setRooms] = useState(initialRooms);
  const [isRoomsMode, setIsRoomsMode] = useState(true); // Dictates whether in single room mode or room overview StrictMode
  const [selectedRoom, setSelectedRoom] = useState(initialRooms[0]); // Current room selected from carousel.

  const toggleRoomsMode = useCallback(
    () => setIsRoomsMode((prev) => !prev),
    []
  );

  const handleSelectRoom = useCallback((room) => {
    setSelectedRoom(room);
    setIsRoomsMode(false);
  }, []);

  const handleDuplicateRoom = useCallback((room) => {
    const newRoom = {
      ...room,
      id: Date.now(),
      name: `${room.name} Copy`,
    };
    setRooms((prev) => [...prev, newRoom]);
  }, []);

  const handleDeleteRoom = useCallback(
    (roomToDelete) => {
      setRooms((prevRooms) => {
        const updatedRooms = prevRooms.filter(
          (room) => room.id !== roomToDelete.id
        );

        if (roomToDelete.id === selectedRoom.id) {
          const deletedIndex = prevRooms.findIndex(
            (r) => r.id === roomToDelete.id
          );
          const fallbackRoom =
            updatedRooms[Math.max(0, deletedIndex - 1)] || updatedRooms[0];
          setSelectedRoom(fallbackRoom);
        }

        return updatedRooms;
      });

      setIsRoomsMode(true);
    },
    [selectedRoom]
  );

  const handleEnterSingleRoom = useCallback((room) => {
    setSelectedRoom(room);
    setIsRoomsMode(false);
  }, []);

  return (
    <div className="app">
      <RoomVisualizer
        isRoomsMode={isRoomsMode}
        rooms={rooms}
        selectedRoom={selectedRoom}
        onSelectRoom={handleSelectRoom}
        onRooms={toggleRoomsMode}
        onDelete={handleDeleteRoom}
        onDuplicateRoom={handleDuplicateRoom}
        onEnterSingleRoom={handleEnterSingleRoom}
      />
    </div>
  );
}
