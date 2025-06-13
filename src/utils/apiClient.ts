
import { supabase } from "@/integrations/supabase/client";

export const generateTravelRecommendations = async (preferences: {
  destination: string;
  travelerCount: string;
  tripDuration: string;
  interests: string[];
  budget: string;
  additionalInfo: string;
}) => {
  const { data, error } = await supabase.functions.invoke('generate-travel-recommendations', {
    body: preferences
  });
  
  if (error) {
    throw error;
  }
  
  return data;
};
