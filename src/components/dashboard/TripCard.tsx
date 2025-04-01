
import React from "react";
import { Link } from "react-router-dom";
import { Calendar, Clock } from "lucide-react";

export interface TripCardProps {
  id: number;
  destination: string;
  dateRange: string;
  image: string;
  status: string;
  days: number;
}

const TripCard = ({ id, destination, dateRange, image, status, days }: TripCardProps) => {
  return (
    <Link to={`/trip/${id}`} className="block">
      <div className="bg-white rounded-xl shadow-sm overflow-hidden border border-gray-100 card-hover">
        <div className="relative h-48">
          <img
            src={image}
            alt={destination}
            className="w-full h-full object-cover"
          />
          <div className="absolute top-4 right-4">
            <span className={`px-3 py-1 rounded-full text-xs font-medium ${
              status === 'upcoming' ? 'bg-green-100 text-green-800' :
              status === 'planning' ? 'bg-amber-100 text-amber-800' :
              'bg-purple-100 text-purple-800'
            }`}>
              {status.charAt(0).toUpperCase() + status.slice(1)}
            </span>
          </div>
        </div>
        <div className="p-6">
          <h3 className="text-lg font-semibold text-travel-dark mb-2">{destination}</h3>
          <div className="flex items-center text-gray-500 space-x-4 text-sm">
            <div className="flex items-center space-x-1">
              <Calendar className="h-4 w-4" />
              <span>{dateRange}</span>
            </div>
            <div className="flex items-center space-x-1">
              <Clock className="h-4 w-4" />
              <span>{days} days</span>
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default TripCard;
