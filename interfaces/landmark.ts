import { Accommodation } from "@/interfaces/accommodation";

export interface Landmark {
  id: string;
  name: string;
  location: string;
  description: string;
  created_at: string;
  updated_at: string;
  latitude: number;
  longitude: number;
  images: any[]; // To be updated for other media types
  nearbyAccommodations: Accommodation[];
  otherNearbyLandmarks: Landmark[];
}
