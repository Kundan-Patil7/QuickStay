import React, { useState } from 'react';
import { roomsDummyData } from '../../assets/assets';
import Title from '../../components/Title';

const ListRoom = () => {
  const [rooms, setRooms] = useState(roomsDummyData);

  return (
    <div className="p-6 bg-gray-50 shadow-md rounded-lg space-y-6">
      <Title
        align="left"
        font="outfit"
        title="Room Listings"
        subTitle="Manage your hotel rooms"
      />
      <p className="text-gray-800 text-lg font-semibold">All Rooms</p>
      <div className="w-full mt-4 max-w-3xl text-left border border-gray-300 rounded-lg max-h-80 overflow-y-scroll shadow-sm">
        <table className="w-full">
          <thead className="bg-gray-100">
            <tr>
              <th className="py-3 px-4 text-gray-800 font-medium">Name</th>
              <th className="py-3 px-4 text-gray-800 font-medium max-sm:hidden">Facility</th>
              <th className="py-3 px-4 text-gray-800 font-medium text-center">Price / Night</th>
              <th className="py-3 px-4 text-gray-800 font-medium text-center">Action</th>
            </tr>
          </thead>
          <tbody className="text-sm bg-white divide-y divide-gray-200">
            {rooms.map((item, index) => (
              <tr key={index} className="hover:bg-gray-50 transition duration-200">
                <td className="py-3 px-4 text-gray-800">{item.roomType}</td>
                <td className="py-3 px-4 text-gray-800 max-sm:hidden">
                  {item.amenities.join(', ')}
                </td>
                <td className="py-3 px-4 text-gray-800 text-center">{item.pricePerNight}</td>
                <td className="py-3 px-4 text-center">
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input
                      type="checkbox"
                      className="sr-only peer"
                      checked={item.isAvailable}
                    // onChange={() => {
                    //   const updatedRooms = [...rooms];
                    //   updatedRooms[index].isAvailable = !updatedRooms[index].isAvailable;
                    //   setRooms(updatedRooms);
                    // }}
                    />
                    <div className="w-12 h-7 bg-slate-300 rounded-full peer-checked:bg-blue-600 transition-colors duration-200">
                      <span className="dot absolute left-1 top-1 w-5 h-5 bg-white rounded-full transition-transform duration-200 ease-in-out peer-checked:translate-x-5"></span>
                    </div>
                  </label>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ListRoom;
