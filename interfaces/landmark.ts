export interface Landmark {
  id: string;
  name: string;
  location: string;
  description: string;
  entrance_fee: number;
  max_guests: number;
  created_at: string;
  updated_at: string;
  latitude: number;
  longitude: number;
  images: any[]; // To be updated for other media types
  poster: {
    name: string;
    image: any; // Type is any for now, can be updated to a specific type later
  };
  rating: number;
  totalReviews: number;
  amenities: {
    icon: string;
    label: string;
  }[];
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
  reviews: {
    user: {
      name: string;
      avatar: string;
    };
    rating: number;
    text: string;
    timeAgo: string;
  }[];
  houseRules: string;
}
