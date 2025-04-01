
import React from "react";
import TripCard, { TripCardProps } from "./TripCard";
import CreateTripCard from "./CreateTripCard";

interface TripsListProps {
  trips: TripCardProps[];
}

const TripsList = ({ trips }: TripsListProps) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {trips.map((trip) => (
        <TripCard key={trip.id} {...trip} />
      ))}
      
      {/* Create new trip card */}
      <CreateTripCard />
    </div>
  );
};

export default TripsList;
