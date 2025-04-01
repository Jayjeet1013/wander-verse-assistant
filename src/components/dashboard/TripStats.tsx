
import React from "react";
import { Calendar, Clock, MapPin, CreditCard } from "lucide-react";

const TripStats = () => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
      <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
        <div className="flex items-center space-x-4">
          <div className="bg-blue-100 rounded-full p-3">
            <Calendar className="h-6 w-6 text-blue-600" />
          </div>
          <div>
            <p className="text-gray-500 text-sm">All Trips</p>
            <p className="text-2xl font-bold text-travel-dark">3</p>
          </div>
        </div>
      </div>
      
      <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
        <div className="flex items-center space-x-4">
          <div className="bg-green-100 rounded-full p-3">
            <Clock className="h-6 w-6 text-green-600" />
          </div>
          <div>
            <p className="text-gray-500 text-sm">Upcoming</p>
            <p className="text-2xl font-bold text-travel-dark">1</p>
          </div>
        </div>
      </div>
      
      <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
        <div className="flex items-center space-x-4">
          <div className="bg-amber-100 rounded-full p-3">
            <MapPin className="h-6 w-6 text-amber-600" />
          </div>
          <div>
            <p className="text-gray-500 text-sm">Planning</p>
            <p className="text-2xl font-bold text-travel-dark">1</p>
          </div>
        </div>
      </div>
      
      <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
        <div className="flex items-center space-x-4">
          <div className="bg-purple-100 rounded-full p-3">
            <CreditCard className="h-6 w-6 text-purple-600" />
          </div>
          <div>
            <p className="text-gray-500 text-sm">Completed</p>
            <p className="text-2xl font-bold text-travel-dark">1</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TripStats;
