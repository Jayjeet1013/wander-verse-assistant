import React from "react";
import { Link } from "react-router-dom";
import { PlusCircle } from "lucide-react";

const CreateTripCard = () => {
  return (
    <Link to="/create-trip">
      <div className="bg-white rounded-xl shadow-sm overflow-hidden border border-gray-100 h-full flex items-center justify-center p-6 card-hover">
        <div className="text-center">
          <div className="bg-gray-100 rounded-full p-6 inline-flex mb-4">
            <PlusCircle className="h-8 w-8 text-travel-primary" />
          </div>
          <h3 className="text-lg font-semibold text-travel-dark">
            Create New Trip
          </h3>
          <p className="text-gray-500 mt-2">Plan your next adventure</p>
        </div>
      </div>
    </Link>
  );
};

export default CreateTripCard;
