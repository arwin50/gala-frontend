export interface Property {
  id: string;
  title: string;
  address: string;
  description: string;
  category_id: string;
  price_per_night: number;
  max_guests: number;
  created_at: string;
  updated_at: string;
  images: any[];
  host: {
    name: string;
    image: any;
  };
  rating: number;
  totalReviews: number;
  amenities: {
    icon: string;
    label: string;
  }[];
  nearbyLandmarks: {
    name: string;
    distance: string;
  }[];
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
