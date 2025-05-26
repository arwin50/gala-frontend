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
  nearbyLocations: {
    // Only here for sample purposes
    name: string;
    distance: string;
  }[];
  otherNearbyLandmarks: {
    // Only here for sample purposes
    name: string;
    distance: string;
  }[];
}
