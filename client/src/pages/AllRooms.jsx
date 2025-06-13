import React, { useState } from 'react';
import { assets, facilityIcons, roomsDummyData } from '../assets/assets';
import { useNavigate } from 'react-router-dom';
import StarRating from '../components/StarRating';

const CheckBox = ({ label, selected = false, onChange = () => {} }) => {
    return (
        <label className='flex items-center gap-3 cursor-pointer mt-2 text-sm'>
            <input 
                type="checkbox" 
                checked={selected}  
                onChange={(e) => onChange(e.target.checked, label)}
                className='cursor-pointer'
            />
            <span className='font-light select-none'>{label}</span>
        </label>
    );
};

const RadioButton = ({ label, selected = false, onChange = () => {} }) => {
    return (
        <label className='flex items-center gap-3 cursor-pointer mt-2 text-sm'>
            <input 
                type="radio" 
                name="sortoption" 
                checked={selected}  
                onChange={() => onChange(label)}
                className='cursor-pointer'
            />
            <span className='font-light select-none'>{label}</span>
        </label>
    );
};

const AllRooms = () => {
    const navigate = useNavigate();
    const [openFilters, setOpenFilters] = useState(false);
    const [selectedRoomTypes, setSelectedRoomTypes] = useState([]);
    const [selectedPriceRange, setSelectedPriceRange] = useState([]);
    const [selectedSortOption, setSelectedSortOption] = useState("");

    const roomTypes = [
        "Single Bed",
        "Double Bed",
        "Luxury Room",
        "Family Suite"
    ];

    const priceRanges = [
        "0 to 500",
        "500 to 1000",
        "1000 to 2000",
        "2000 to 3000",
    ];

    const sortOptions = [
        "Price Low to High",
        "Price High to Low",
        "Newest First",
    ];

    const handleRoomTypeChange = (checked, roomType) => {
        if (checked) {
            setSelectedRoomTypes([...selectedRoomTypes, roomType]);
        } else {
            setSelectedRoomTypes(selectedRoomTypes.filter(type => type !== roomType));
        }
    };

    const handlePriceRangeChange = (checked, range) => {
        if (checked) {
            setSelectedPriceRange([...selectedPriceRange, range]);
        } else {
            setSelectedPriceRange(selectedPriceRange.filter(r => r !== range));
        }
    };

    const handleSortOptionChange = (option) => {
        setSelectedSortOption(option);
    };

    const clearFilters = () => {
        setSelectedRoomTypes([]);
        setSelectedPriceRange([]);
        setSelectedSortOption("");
    };

    return (
        <div className='flex flex-col-reverse lg:flex-row items-start justify-between pt-28 md:pt-35 px-4 md:px-16 lg:px-24 gap-8'>

            {/* LEFT - Rooms List */}
            <div className='w-full lg:w-2/3'>
                <div className='flex flex-col items-start text-left mb-8'>
                    <h1 className='font-playfair text-4xl md:text-[40px]'>Hotel Rooms</h1>
                    <p className='text-sm md:text-base text-gray-500/90 mt-2 md:max-w-[500px]'>
                        Take advantage of our limited-time offer and special packages to enhance your stay and create unforgettable memories
                    </p>
                </div>

                {roomsDummyData.map((room) => (
                    <div key={room._id} className='flex flex-col md:flex-row items-start py-10 gap-6 border-b border-gray-300 last:pb-30 last:border-0'>
                        <img
                            onClick={() => { navigate(`/rooms/${room._id}`); window.scrollTo(0, 0) }}
                            
                            src={room.images[0]} 
                            alt="hotel-Img" 
                            title='View Room Details'
                            className='w-full md:w-1/2 h-64 md:h-80 rounded-xl shadow-lg object-cover cursor-pointer hover:scale-[1.01] transition-all'
                        />
                        <div className='md:w-1/2 flex flex-col gap-2'>
                            <p className='text-gray-500'>{room.hotel.city}</p>
                            <p
                                onClick={() => { navigate(`/rooms/${room._id}`); window.scrollTo(0, 0) }}
                                className='text-gray-800 text-3xl font-playfair cursor-pointer hover:text-primary'
                            >
                                {room.hotel.name}
                            </p>
                            <div className='flex items-center'>
                                <StarRating rating={room.rating} />
                                <p className='ml-2 text-sm text-gray-500'>({room.reviews} reviews)</p>
                            </div>
                            <div className='flex items-center gap-1 text-gray-500 mt-2 text-sm'>
                                <img src={assets.locationIcon} alt="location-icon" className='w-4 h-4' />
                                <span>{room.hotel.address}</span>
                            </div>
                            
                            {/* Room amenities */}
                            <div className='flex flex-wrap items-center mt-3 mb-6 gap-2'>
                                {room.amenities.map((item, index) => (
                                    <div key={index} className='flex items-center gap-2 px-3 py-2 rounded-lg bg-[#F5F5FF]/70'>
                                        <img src={facilityIcons[item]} alt={item} className='h-4 w-4' />
                                        <p className='text-xs'>{item}</p>
                                    </div>
                                ))}
                            </div>
                            
                            {/* Room price per night */}
                            <p className='text-xl font-medium text-gray-700'>₹{room.pricePerNight}/night</p>
                        </div>
                    </div>
                ))}
            </div>

            {/* RIGHT - Filters */}
            <div className='w-full lg:w-80 bg-white border border-gray-300 rounded-lg sticky top-32'>
                <div className={`flex items-center justify-between px-5 py-3 border-gray-300 ${openFilters ? "border-b" : ""}`}>
                    <p className='text-base font-medium text-gray-800'>FILTERS</p>
                    <div className='flex gap-4'>
                        <span 
                            onClick={() => setOpenFilters(!openFilters)}
                            className='text-xs cursor-pointer lg:hidden'
                        >
                            {openFilters ? 'HIDE' : "SHOW"}
                        </span>
                        <span 
                            onClick={clearFilters}
                            className='text-xs cursor-pointer hidden lg:block hover:text-primary'
                        >
                            CLEAR ALL
                        </span>
                    </div>
                </div>

                <div className={`${openFilters ? "block" : "hidden lg:block"} transition-all duration-300`}>
                    {/* Room Types Filter */}
                    <div className='px-5 pt-5'>
                        <p className='font-medium text-gray-800 pb-2'>Room Types</p>
                        {roomTypes.map((room, index) => (
                            <CheckBox 
                                key={index} 
                                label={room}
                                selected={selectedRoomTypes.includes(room)}
                                onChange={handleRoomTypeChange}
                            />
                        ))}
                    </div>

                    {/* Price Range Filter */}
                    <div className='px-5 pt-5'>
                        <p className='font-medium text-gray-800 pb-2'>Price Range</p>
                        {priceRanges.map((range, index) => (
                            <CheckBox 
                                key={index} 
                                label={`₹${range}`}
                                selected={selectedPriceRange.includes(range)}
                                onChange={handlePriceRangeChange}
                            />
                        ))}
                    </div>

                    {/* Sort Options */}
                    <div className='px-5 pt-5 pb-7'>
                        <p className='font-medium text-gray-800 pb-2'>Sort By</p>
                        {sortOptions.map((option, index) => (
                            <RadioButton 
                                key={index} 
                                label={option}
                                selected={selectedSortOption === option}
                                onChange={handleSortOptionChange}
                            />
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AllRooms;