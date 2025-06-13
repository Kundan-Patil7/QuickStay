import React, { useEffect, useState } from 'react';
import { assets, facilityIcons, roomCommonData, roomsDummyData } from '../assets/assets';
import { useParams } from 'react-router-dom';
import StarRating from '../components/StarRating';

const RoomDetails = () => {
  const { id } = useParams();
  const [room, setRoom] = useState(null);
  const [mainImage, setMainImage] = useState(null);

  useEffect(() => {
    const fetchRoom = roomsDummyData.find((room) => room._id === id);
    if (fetchRoom) {
      setRoom(fetchRoom);
      setMainImage(fetchRoom.images[0]);
    }
  }, [id]);

  return (
    room && (
      <div className="py-28 md:py-35 px-4 md:px-16 lg:px-24 xl:px-32">
        {/* Room Title */}
        <div className="flex flex-col md:flex-row items-start md:items-center gap-2">
          <h1 className="text-4xl md:text-4xl font-playfair">
            {room.hotel.name}{' '}
            <span className="font-inter text-sm">({room.roomType})</span>
          </h1>
          <p className="text-xs font-inter py-1.5 px-5 text-white bg-orange-500 rounded-full">
            20% OFF
          </p>
        </div>

        {/* Room Rating */}
        <div className="flex items-center gap-1 mt-2">
          <StarRating rating={room.hotel.rating || 4.5} />
          <p className="ml-2">200+ reviews</p>
        </div>

        {/* Room Address */}
        <div className="flex items-center gap-2 mt-4">
          <img src={assets.locationIcon} alt="Location Icon" />
          <span>{room.hotel.address}</span>
        </div>

        {/* Room Images */}
        <div className="flex flex-col lg:flex-row mt-6 gap-6">
          <div className="lg:w-1/2 w-full">
            <img
              src={mainImage}
              alt="Main Room"
              className="w-full rounded-xl shadow-lg object-cover"
            />
          </div>
          <div className="grid grid-cols-2 gap-4 lg:w-1/2 w-full">
            {room.images.length > 1 &&
              room.images.map((image, index) => (
                <img
                  key={index}
                  src={image}
                  alt={`Room Image ${index + 1}`}
                  className={`w-full rounded-xl shadow-md object-cover cursor-pointer ${mainImage === image ? 'outline-3 outline-orange-500' : ''
                    }`}
                  onClick={() => setMainImage(image)}
                />
              ))}
          </div>
        </div>

        {/* Room Highlights */}
        <div className="flex flex-col md:flex-row md:justify-between mt-10">
          <div className="flex flex-col">
            <h1 className="text-3xl md:text-4xl font-playfair">
              Experience Luxury Like Never Before
            </h1>
            <div className="flex items-center flex-wrap mt-3 mb-6 gap-4">
              {room.amenities.map((item, index) => (
                <div
                  key={index}
                  className="flex items-center gap-2 px-3 py-2 rounded-lg bg-gray-100"
                >
                  <img
                    src={facilityIcons[item] || assets.placeholderIcon}
                    alt={item}
                    className="w-5 h-5"
                  />
                  <p className="text-sm">{item}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Room Price */}
          <p className="text-2xl font-medium">₹{room.pricePerNight}/night</p>
        </div>

        {/* Check-in/Check-out Form */}
        <form className="flex flex-col md:flex-row items-start md:items-center justify-between bg-gradient-to-r from-gray-50 to-gray-100 shadow-2xl hover:shadow-3xl transition-shadow duration-300 p-8 rounded-3xl mx-auto mt-16 max-w-6xl">
          <div className="flex flex-col flex-wrap md:flex-row items-start md:items-center gap-8 md:gap-10 text-gray-700 w-full">
            <div className="w-full md:w-auto">
              <label
                htmlFor="checkInDate"
                className="font-semibold text-sm text-gray-600 mb-2 block"
              >
                Check In
              </label>
              <input
                type="date"
                id="checkInDate"
                className="w-full rounded-lg border border-gray-300 px-4 py-3 text-gray-700 bg-gray-50 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-blue-400 hover:scale-105 transition-all duration-300"
                required
              />
            </div>
            <div className="w-full md:w-auto">
              <label
                htmlFor="checkOutDate"
                className="font-semibold text-sm text-gray-600 mb-2 block"
              >
                Check Out
              </label>
              <input
                type="date"
                id="checkOutDate"
                className="w-full rounded-lg border border-gray-300 px-4 py-3 text-gray-700 bg-gray-50 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-blue-400 hover:scale-105 transition-all duration-300"
                required
              />
            </div>
            <div className="w-full md:w-auto">
              <label
                htmlFor="guests"
                className="font-semibold text-sm text-gray-600 mb-2 block"
              >
                Guests
              </label>
              <input
                type="number"
                id="guests"
                placeholder="Number of Guests"
                className="w-full rounded-lg border border-gray-300 px-4 py-3 text-gray-700 bg-gray-50 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-blue-400 hover:scale-105 transition-all duration-300"
                required
              />
            </div>
          </div>
          <button
            type="submit"
            className="mt-8 md:mt-0 bg-gradient-to-r from-blue-500 via-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-500 active:scale-95 transition-all text-white rounded-full px-10 py-4 text-lg font-bold shadow-lg hover:shadow-[0_0_15px_rgba(59,130,246,0.8)] hover:animate-pulse max-md:w-full"
          >
            Book Now
          </button>
        </form>

        {/* Common Specifications */}
        <div className="mt-25 space-y-4">
          {roomCommonData.map((spec, index) => (
            <div key={index} className="flex items-start gap-2">
              <img src={spec.icon} alt={`${spec.title}-icon`} />
              <p className="text-base">{spec.title}</p>
              <p className="text-gray-500">{spec.description}</p>
            </div>
          ))}
        </div>

        {/* Room Description */}
        <div className="max-2-3xl border-y border-gray-300 my-15 py-10 text-gray-500">
          <p>
            Guests will be allocated on the ground floor according to
            availability. You get a comfortable two-bedroom apartment with a true city feeling. The price quoted is for two guests. At the guest slot, please mark the number of guests to get the exact price for groups.
          </p>
        </div>

        {/* Hosted By */}
        <div className="flex flex-col items-start gap-4">
          <div className="flex gap-4">
            <img
              src={room.hotel.owner.image}
              alt="host"
              className="w-14 h-14 rounded-full"
            />
            <div>
              <p className="text-lg md:text-xl">Hosted by {room.hotel.name}</p>
              <div className="flex items-center mt-1">
                <StarRating />
                <p className="ml-2">200+ reviews</p>
              </div>
            </div>
            <button className="px-6 py-2.5 mt-4 rounded text-white bg-primary hover:bg-primary-dull transition-all cursor-pointer">
              Contact Now
            </button>
          </div>
        </div>
      </div>
    )
  );
};

export default RoomDetails;
