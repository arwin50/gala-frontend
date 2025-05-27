import { Landmark } from "@/interfaces/landmark";

export interface Accommodation {
  id: string;
  title: string;
  location: string;
  description: string;
  category_id: string;
  price_per_night: number;
  max_guests: number;
  created_at: string;
  updated_at: string;
  latitude: number;
  longitude: number;
  images: any[]; // To be updated for other media types
  host: {
    name: string;
    image: any; // Type is any for now, can be updated to a specific type later
  };
  rating: number;
  totalReviews: number;
  amenities: {
    icon: string;
    label: string;
  }[];
  nearbyLandmarks: Landmark[];
  reviews: {
    user: {
      name: string;
      avatar: any;
    };
    rating: number;
    text: string;
    timeAgo: string;
  }[];
  cancellationPolicy: string;
  houseRules: string;
}
