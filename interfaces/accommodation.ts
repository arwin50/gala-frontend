import { Landmark } from "@/interfaces/landmark";

export interface AccommodationMedia {
  url: string;
  type: "image" | "video";
  caption: string;
}

export interface Amenity {
  icon: string;
  name: string;
  description: string;
}

export interface Policy {
  title: string;
  description: string;
  rules: string;
}

export interface CancellationPolicy {
  title: string;
  description: string;
  refund_rules: string;
}

export interface Review {
  user: {
    name: string;
    avatar: string;
  };
  rating: number;
  text: string;
  timeAgo: string;
}

export interface Accommodation {
  id: number;
  name: string;
  description: string;
  location: string;
  latitude: number;
  longitude: number;
  category: {
    id: number;
    name: string;
    description: string;
  };
  type?: {
    id: number;
    name: string;
    description: string;
  };
  host: {
    id: number;
    name: string;
    image: string;
  };
  max_guests: number;
  created_at: string;
  updated_at: string;
  media: AccommodationMedia[];
  overall_rating: number | null;
  total_review_count: number;
  amenities: Amenity[];
  nearby_landmarks: Landmark[];
  reviews: Review[];
  cancellation_policy: CancellationPolicy[];
  house_rules: string | null;
  total_price?: number;
  is_favorite?: boolean;
  favorite_count?: number;
}
