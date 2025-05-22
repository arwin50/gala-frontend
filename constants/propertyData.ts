import bgMetroManila from "@/assets/images/places_pic/places_metroManila.jpg";

const sampleProperties = [
  {
    id: "prop-001",
    title: "Harolds Evotel",
    address: "Las Piñas, Metro Manila",
    description:
      "Charming hotel in Las Piñas with cozy rooms and easy access to the city’s best malls and restaurants.",
    category_id: "hotels",
    price_per_night: 2500,
    max_guests: 3,
    created_at: "2024-09-18T08:45:00Z",
    updated_at: "2025-05-20T11:12:00Z",
    images: Array(6).fill(bgMetroManila),
    host: {
      name: "BINI Sheena",
      image: bgMetroManila,
    },
    rating: 4.5,
    totalReviews: 120,
    amenities: [
      { icon: "wifi", label: "Internet" },
      { icon: "tv", label: "Cable TV" },
      { icon: "snowflake", label: "Air Conditioning" },
    ],
    nearbyLandmarks: [
      { name: "SM Southmall", distance: "2.0KM" },
      { name: "Las Piñas Church", distance: "1.2KM" },
    ],
    reviews: [
      {
        user: { name: "BINI Colet", avatar: bgMetroManila },
        rating: 5,
        text: "Super comfy beds and the free breakfast was yum!",
        timeAgo: "2 months ago",
      },
    ],
    cancellationPolicy:
      "Free cancellation within 24 hours. Partial refund up to 3 days before check-in.",
    houseRules:
      "No smoking. Quiet hours after 10 PM. Respect neighbors and common areas.",
  },
  {
    id: "prop-002",
    title: "Midas Hotel and Casino",
    address: "Pasay, Metro Manila",
    description:
      "Luxury stay in the heart of Pasay, featuring a casino and rooftop dining.",
    category_id: "resorts",
    price_per_night: 3000,
    max_guests: 2,
    created_at: "2024-10-01T14:20:00Z",
    updated_at: "2025-05-18T18:10:00Z",
    images: Array(6).fill(bgMetroManila),
    host: {
      name: "BINI Stacey",
      image: bgMetroManila,
    },
    rating: 5.0,
    totalReviews: 240,
    amenities: [
      { icon: "wifi", label: "Internet" },
      { icon: "cocktail", label: "Mini Bar" },
      { icon: "car", label: "Free Parking" },
    ],
    nearbyLandmarks: [
      { name: "SM Mall of Asia", distance: "2.5KM" },
      { name: "City of Dreams", distance: "3.0KM" },
    ],
    reviews: [
      {
        user: { name: "BINI Maloi", avatar: bgMetroManila },
        rating: 5,
        text: "This place made me feel like a queen 😌✨",
        timeAgo: "3 weeks ago",
      },
    ],
    cancellationPolicy:
      "Cancel up to 7 days before check-in for a full refund. No refund after.",
    houseRules:
      "No pets. No parties. ID required upon check-in. Casino access for 21+ only.",
  },
  {
    id: "prop-003",
    title: "Park Hotels Group",
    address: "Pasay, Metro Manila",
    description:
      "Elegant rooms with fast WiFi and a peaceful ambiance perfect for business travelers.",
    category_id: "resorts",
    price_per_night: 1000000,
    max_guests: 4,
    created_at: "2024-12-05T12:30:00Z",
    updated_at: "2025-05-19T09:42:00Z",
    images: Array(6).fill(bgMetroManila),
    host: {
      name: "BINI Jhoanna",
      image: bgMetroManila,
    },
    rating: 4.5,
    totalReviews: 150,
    amenities: [
      { icon: "wifi", label: "Internet" },
      { icon: "coffee", label: "Café" },
      { icon: "briefcase", label: "Workspace" },
    ],
    nearbyLandmarks: [
      { name: "NAIA Terminal 3", distance: "2.8KM" },
      { name: "Newport Mall", distance: "2.2KM" },
    ],
    reviews: [
      {
        user: { name: "BINI Aiah", avatar: bgMetroManila },
        rating: 4,
        text: "Business trip made easy. Fast WiFi and peaceful vibes.",
        timeAgo: "6 months ago",
      },
    ],
    cancellationPolicy:
      "Full refund for cancellations made 48 hours in advance.",
    houseRules:
      "No loud music. Pets allowed upon request. Maintain cleanliness.",
  },
  {
    id: "prop-004",
    title: "Dumaguete Hotel and Suite",
    address: "Dumaguete, Negros Oriental",
    description:
      "Nestled by the sea, this relaxing hotel provides sunset views and a calm environment for digital nomads.",
    category_id: "hotels",
    price_per_night: 1000000,
    max_guests: 5,
    created_at: "2025-01-10T11:15:00Z",
    updated_at: "2025-05-21T08:01:00Z",
    images: Array(6).fill(bgMetroManila),
    host: {
      name: "BINI Gwen",
      image: bgMetroManila,
    },
    rating: 5.0,
    totalReviews: 90,
    amenities: [
      { icon: "wifi", label: "Internet" },
      { icon: "swimmer", label: "Pool" },
      { icon: "concierge-bell", label: "Room Service" },
    ],
    nearbyLandmarks: [
      { name: "Rizal Boulevard", distance: "0.5KM" },
      { name: "Silliman University", distance: "1.0KM" },
    ],
    reviews: [
      {
        user: { name: "BINI Mikha", avatar: bgMetroManila },
        rating: 5,
        text: "Sunsets were unreal. I meditated every morning 💆‍♀️",
        timeAgo: "2 weeks ago",
      },
    ],
    cancellationPolicy:
      "Cancel up to 3 days before check-in for full refund. 50% refund after.",
    houseRules:
      "Be mindful of other guests. No parties. Smoking allowed in designated areas.",
  },
  {
    id: "prop-005",
    title: "The Manila Hotel",
    address: "Ermita, Manila",
    description:
      "An iconic heritage hotel in Manila offering royal treatment and a deep dive into Filipino history.",
    category_id: "transients",
    price_per_night: 1000000,
    max_guests: 3,
    created_at: "2024-07-23T09:05:00Z",
    updated_at: "2025-05-19T17:30:00Z",
    images: Array(6).fill(bgMetroManila),
    host: {
      name: "BINI Aya",
      image: bgMetroManila,
    },
    rating: 5.0,
    totalReviews: 480,
    amenities: [
      { icon: "wifi", label: "Internet" },
      { icon: "spa", label: "Spa" },
      { icon: "utensils", label: "Fine Dining" },
    ],
    nearbyLandmarks: [
      { name: "Intramuros", distance: "0.9KM" },
      { name: "Rizal Park", distance: "0.4KM" },
    ],
    reviews: [
      {
        user: { name: "BINI Gwen-dolyn", avatar: bgMetroManila },
        rating: 5,
        text: "I felt like a queen from a telenovela. Historic and fancy!",
        timeAgo: "4 months ago",
      },
    ],
    cancellationPolicy:
      "Full refund 5 days before check-in. 50% refund thereafter.",
    houseRules:
      "Respect heritage pieces. No rowdy behavior. Dress appropriately in formal areas.",
  },
  {
    id: "prop-006",
    title: "The Cebu Hotel",
    address: "Cebu City, Cebu",
    description:
      "Modern hotel with panoramic views of the Cebu skyline. Great for vacation and remote work.",
    category_id: "hotels",
    price_per_night: 1000000,
    max_guests: 4,
    created_at: "2024-11-02T13:50:00Z",
    updated_at: "2025-05-22T06:00:00Z",
    images: Array(6).fill(bgMetroManila),
    host: {
      name: "BINI Jhoanna",
      image: bgMetroManila,
    },
    rating: 5.0,
    totalReviews: 310,
    amenities: [
      { icon: "wifi", label: "Internet" },
      { icon: "dumbbell", label: "Gym" },
      { icon: "coffee", label: "Breakfast Included" },
    ],
    nearbyLandmarks: [
      { name: "Magellan's Cross", distance: "1.5KM" },
      { name: "Ayala Center Cebu", distance: "1.8KM" },
    ],
    reviews: [
      {
        user: { name: "BINI Maloi", avatar: bgMetroManila },
        rating: 5,
        text: "Remote work has never been this comfy. A++ service!",
        timeAgo: "5 days ago",
      },
    ],
    cancellationPolicy: "Cancel anytime before check-in for a full refund.",
    houseRules:
      "Keep noise to a minimum. ID check at reception. No smoking inside rooms.",
  },
];

export default sampleProperties;
