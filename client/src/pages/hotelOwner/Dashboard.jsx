import React, { useState } from 'react';
import Title from '../../components/Title';
import { assets, dashboardDummyData } from '../../assets/assets';

const Dashboard = () => {
  const [dashboardData, setDashboardData] = useState(dashboardDummyData);

  return (
    <div className="p-6">
      {/* Title */}
      <Title
        align="left"
        font="outfit"
        title="Dashboard"
        subTitle="Monitor your hotel room bookings, analyze revenue, and manage bookings"
      />

      {/* Stats Cards */}
      <div className="flex flex-wrap gap-4 my-8">
        {/* Total Bookings */}
        <div className="bg-primary/3 border border-primary/10 rounded flex p-4 pr-8 items-center">
          <img
            src={assets.totalBookingIcon}
            alt="Total Bookings"
            className="max-sm:hidden h-10"
          />
          <div className="flex flex-col md:ml-4 font-medium">
            <p className="text-blue-500 px-2">Total Bookings</p>
            <p className="text-neutral-400 text-base px-2">
              {dashboardData.totalBookings}
            </p>
          </div>
        </div>

        {/* Total Revenue */}
        <div className="bg-primary/3 border border-primary/10 rounded flex p-4 pr-8 items-center">
          <img
            src={assets.totalRevenueIcon}
            alt="Total Revenue"
            className="max-sm:hidden h-10"
          />
          <div className="flex flex-col md:ml-4 font-medium">
            <p className="text-blue-500 px-2">Total Revenue</p>
            <p className="text-neutral-400 text-base px-2">
              ₹ {dashboardData.totalRevenue}
            </p>
          </div>
        </div>
      </div>

      {/* Recent Bookings */}
      <h2 className="text-xl text-blue-950/70 font-medium">Recent Bookings</h2>
      <div className="w-full max-w-3xl mt-4 text-left border border-gray-300 rounded-lg max-h-80 overflow-y-scroll">
        <table className="w-full">
          <thead className="bg-gray-50">
            <tr>
              <th className="py-3 px-4 text-gray-800 font-medium">User Name</th>
              <th className="py-3 px-4 text-gray-800 font-medium max-sm:hidden">
                Room Name
              </th>
              <th className="py-3 px-4 text-gray-800 font-medium text-center">
                Total Amount
              </th>
              <th className="py-3 px-4 text-gray-800 font-medium text-center">
                Payment Status
              </th>
            </tr>
          </thead>
          <tbody className="text-sm">
            {dashboardData.bookings.map((item, index) => (
              <tr key={index}>
                <td className="py-3 px-4 text-gray-700 border-t border-gray-300">
                  {item.user.username}
                </td>
                <td className="py-3 px-4 text-gray-700 border-t border-gray-300 max-sm:hidden">
                  {item.room.roomType}
                </td>
                <td className="py-3 px-4 text-gray-700 border-t border-gray-300 text-center">
                  ₹ {item.totalPrice}
                </td>
                <td className="py-3 px-4 border-t border-gray-300 text-center">
                  <button
                    className={`py-1 px-3 text-xs rounded-full ${
                      item.isPaid
                        ? 'bg-green-200 text-green-600'
                        : 'bg-amber-200 text-yellow-600'
                    }`}
                  >
                    {item.isPaid ? 'Completed' : 'Pending'}
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Dashboard;



// import React, { useState } from 'react';
// import Title from '../../components/Title';
// import { assets, dashboardDummyData } from '../../assets/assets';

// const Dashboard = () => {
//   const [dashboardData, setDashboardData] = useState(dashboardDummyData);

//   return (
//     <div className="p-6 bg-gradient-to-br from-blue-50 via-white to-blue-100 min-h-screen">
//       {/* Title */}
//       <Title
//         align="left"
//         font="outfit"
//         title="Dashboard"
//         subTitle="Monitor your hotel room bookings, analyze revenue, and manage bookings"
//       />

//       {/* Stats Cards */}
//       <div className="flex flex-wrap gap-6 my-10">
//         {/* Total Bookings */}
//         <div className="bg-gradient-to-r from-blue-200 to-blue-300 border border-blue-400/50 rounded-lg shadow-lg flex items-center p-6 pr-10 hover:scale-105 transform transition duration-300">
//           <img
//             src={assets.totalBookingIcon}
//             alt="Total Bookings"
//             className="hidden md:block h-12"
//           />
//           <div className="flex flex-col ml-6 font-medium">
//             <p className="text-blue-900 text-lg">Total Bookings</p>
//             <p className="text-gray-700 text-xl font-semibold">
//               {dashboardData.totalBookings}
//             </p>
//           </div>
//         </div>

//         {/* Total Revenue */}
//         <div className="bg-gradient-to-r from-green-200 to-green-300 border border-green-400/50 rounded-lg shadow-lg flex items-center p-6 pr-10 hover:scale-105 transform transition duration-300">
//           <img
//             src={assets.totalRevenueIcon}
//             alt="Total Revenue"
//             className="hidden md:block h-12"
//           />
//           <div className="flex flex-col ml-6 font-medium">
//             <p className="text-green-900 text-lg">Total Revenue</p>
//             <p className="text-gray-700 text-xl font-semibold">
//               ₹ {dashboardData.totalRevenue}
//             </p>
//           </div>
//         </div>
//       </div>

//       {/* Recent Bookings */}
//       <h2 className="text-2xl text-blue-800 font-semibold mb-6">
//         Recent Bookings
//       </h2>
//       <div className="w-full max-w-4xl bg-white border border-gray-200 rounded-lg shadow-md overflow-hidden">
//         <table className="w-full">
//           <thead className="bg-blue-100 text-blue-900">
//             <tr>
//               <th className="py-4 px-6 text-left text-lg font-medium">
//                 User Name
//               </th>
//               <th className="py-4 px-6 text-left text-lg font-medium hidden sm:table-cell">
//                 Room Name
//               </th>
//               <th className="py-4 px-6 text-center text-lg font-medium">
//                 Total Amount
//               </th>
//               <th className="py-4 px-6 text-center text-lg font-medium">
//                 Payment Status
//               </th>
//             </tr>
//           </thead>
//           <tbody className="divide-y divide-gray-200">
//             {dashboardData.bookings.map((item, index) => (
//               <tr
//                 key={index}
//                 className="hover:bg-gray-50 transition-colors duration-200"
//               >
//                 <td className="py-4 px-6 text-gray-800">
//                   {item.user.username}
//                 </td>
//                 <td className="py-4 px-6 text-gray-800 hidden sm:table-cell">
//                   {item.room.roomType}
//                 </td>
//                 <td className="py-4 px-6 text-center text-gray-800">
//                   ₹ {item.totalPrice}
//                 </td>
//                 <td className="py-4 px-6 text-center">
//                   <span
//                     className={`py-1 px-4 text-sm rounded-full font-semibold ${
//                       item.isPaid
//                         ? 'bg-green-100 text-green-600'
//                         : 'bg-yellow-100 text-yellow-600'
//                     }`}
//                   >
//                     {item.isPaid ? 'Completed' : 'Pending'}
//                   </span>
//                 </td>
//               </tr>
//             ))}
//           </tbody>
//         </table>
//       </div>
//     </div>
//   );
// };

// export default Dashboard;
