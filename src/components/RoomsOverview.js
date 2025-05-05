// src/components/RoomsOverview.js
import React, { useState, useRef } from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { Check } from "phosphor-react";

import RoomCard from "./RoomCard";
import Footer from "./Footer";
import "./RoomsOverview.css";

const defaultImageUrl = "/images/default_room.jpg";

const RoomsOverview = ({
  rooms,
  selectedRoom,
  onSelectRoom,
  onEnterSingleRoom,
  onDuplicateRoom,
}) => {
  const [isDragging, setIsDragging] = useState(false);
  const selectedIndex = rooms.findIndex((room) => room.id === selectedRoom?.id);
  const [currentIndex, setCurrentIndex] = useState(selectedIndex);

  const sliderRef = useRef();
  const settings = {
    centerMode: true,
    slidesToShow: 1,
    infinite: false,
    arrows: false,
    dots: false,
    swipeToSlide: true,
    initialSlide: selectedIndex || 0,
    beforeChange: () => setIsDragging(true),
    afterChange: (index) => {
      setCurrentIndex(index);
      setIsDragging(false);
    },
  };

  const handleEnterClick = () => {
    if (rooms.length > 0) {
      onEnterSingleRoom(rooms[currentIndex]);
    }
  };

  return (
    <div className="rooms-overview-wrapper">
      <button className="overview-enter-btn" onClick={handleEnterClick}>
        <Check size={18} weight="bold" />
        DONE
      </button>

      <div className="carousel-wrapper">
        <Slider {...settings} ref={sliderRef}>
          {rooms.map((room) => (
            <div key={room.id} className="slide-wrapper">
              <RoomCard
                room={room}
                onSelect={onSelectRoom}
                onDuplicate={() => onDuplicateRoom(room)}
              />
            </div>
          ))}
        </Slider>
      </div>

      {currentIndex === rooms.length - 1 && !isDragging && (
        <button
          className="add-room-floating-btn"
          onClick={() => {
            const newRoom = {
              id: Date.now(),
              name: "New Room",
              imageUrl: defaultImageUrl,
              floor: "New floor",
              walls: "New walls",
            };
            onDuplicateRoom(newRoom);
            setTimeout(() => {
              if (sliderRef.current) {
                sliderRef.current.slickGoTo(rooms.length); // rooms.length is the index of the new room
              }
            }, 0); // Small delay to ensure room has rendered
          }}
        >
          +
        </button>
      )}

      <Footer room={rooms[currentIndex]} onDuplicateRoom={onDuplicateRoom} />
    </div>
  );
};

export default RoomsOverview;
