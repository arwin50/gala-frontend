import bgMetroManila from "@/assets/images/places_pic/places_metroManila.jpg";
import { Landmark } from "@/interfaces/landmark";

export const sampleLandmarks: Landmark[] = [
  {
    id: "landmark-001",
    name: "Gynkui Killa Dormitory",
    location: "Alaminos, Pangasinan",
    description: "A peaceful dorm with a golden view of rice terraces.",
    entrance_fee: 3454.5,
    max_guests: 4,
    created_at: "2024-11-01T10:32:00Z",
    updated_at: "2025-05-20T15:47:00Z",
    latitude: 16.1612,
    longitude: 119.9826,
    images: [bgMetroManila, bgMetroManila, bgMetroManila],
    poster: {
      name: "BINI Aiah",
      image: bgMetroManila,
    },
    rating: 4.5,
    totalReviews: 6969,
    amenities: [
      { icon: "wifi", label: "Internet" },
      { icon: "bath", label: "Shower" },
      { icon: "coffee", label: "Café" },
    ],
    nearbyLocations: [
      { name: "Hundred Islands", distance: "1.5KM" },
      { name: "St. Vicente Ferrer Shrine", distance: "1.5KM" },
      { name: "Lucap Wharf", distance: "2.0KM" },
    ],
    otherNearbyLandmarks: [
      { name: "Alaminos Cathedral", distance: "3.0KM" },
      { name: "Enchanted Cave", distance: "3.5KM" },
      { name: "Tondol Beach", distance: "5.0KM" },
    ],
    reviews: [
      {
        user: { name: "BINI Mikha", avatar: bgMetroManila },
        rating: 4,
        text: "Saw a raccoon! LOL. Great stay though.",
        timeAgo: "1 month ago",
      },
      {
        user: { name: "BINI Gwen", avatar: bgMetroManila },
        rating: 4,
        text: "Please use me like a drug, I know I love you. Say you love me, say you love me. 세계의 끝까지 All or nothing, I want all of you. I know I love you.",
        timeAgo: "1 month ago",
      },
    ],
    houseRules:
      "No parties, no pets, no smoking inside. Respect neighbors and be hot.",
  },
  {
    id: "landmark-002",
    name: "Kamuning Hideout",
    location: "Quezon City, Metro Manila",
    description: "A cozy escape in the heart of the city.",
    entrance_fee: 1299.99,
    max_guests: 2,
    created_at: "2025-02-15T09:00:00Z",
    updated_at: "2025-04-01T18:00:00Z",
    latitude: 14.6422,
    longitude: 121.0573,
    images: [bgMetroManila],
    poster: {
      name: "Juan dela Cruz",
      image: bgMetroManila,
    },
    rating: 4.2,
    totalReviews: 203,
    amenities: [
      { icon: "tv", label: "Cable TV" },
      { icon: "snowflake", label: "Aircon" },
    ],
    nearbyLocations: [
      { name: "Kamuning Market", distance: "0.3KM" },
      { name: "GMA Network Center", distance: "1.2KM" },
    ],
    otherNearbyLandmarks: [
      { name: "ABS-CBN", distance: "2.0KM" },
      { name: "Maginhawa Street", distance: "3.5KM" },
    ],
    reviews: [
      {
        user: { name: "Ella Cruz", avatar: bgMetroManila },
        rating: 5,
        text: "Perfect for a short city break!",
        timeAgo: "2 weeks ago",
      },
    ],
    houseRules: "No smoking. Keep noise down after 10PM.",
  },
  {
    id: "landmark-003",
    name: "Cebu Hilltop Studio",
    location: "Busay, Cebu City",
    description:
      "A hillside escape overlooking Cebu with modern interiors and fresh breeze.",
    entrance_fee: 2199.0,
    max_guests: 3,
    created_at: "2025-01-10T08:00:00Z",
    updated_at: "2025-05-10T10:30:00Z",
    latitude: 10.3591,
    longitude: 123.8707,
    images: [bgMetroManila, bgMetroManila],
    poster: {
      name: "Liza Soberano",
      image: bgMetroManila,
    },
    rating: 4.8,
    totalReviews: 1090,
    amenities: [
      { icon: "wifi", label: "Free WiFi" },
      { icon: "tree", label: "Nature Views" },
    ],
    nearbyLocations: [
      { name: "Temple of Leah", distance: "2.1KM" },
      { name: "Sirao Garden", distance: "3.7KM" },
    ],
    otherNearbyLandmarks: [
      { name: "Tops Lookout", distance: "1.2KM" },
      { name: "Lahug IT Park", distance: "5.0KM" },
    ],
    reviews: [
      {
        user: { name: "Enrique Gil", avatar: bgMetroManila },
        rating: 5,
        text: "Amazing sunsets and very quiet. 10/10!",
        timeAgo: "3 days ago",
      },
    ],
    houseRules:
      "No loud music after 9PM. Keep windows closed to prevent insects.",
  },
  {
    id: "landmark-004",
    name: "Siargao Surf Shack",
    location: "General Luna, Siargao",
    description:
      "Steps from Cloud 9, this shack is a surfer’s paradise with bamboo decor and hammocks.",
    entrance_fee: 1899,
    max_guests: 2,
    created_at: "2024-12-05T12:45:00Z",
    updated_at: "2025-05-18T10:00:00Z",
    latitude: 9.7905,
    longitude: 126.1652,
    images: [bgMetroManila],
    poster: {
      name: "Andi Eigenmann",
      image: bgMetroManila,
    },
    rating: 4.9,
    totalReviews: 420,
    amenities: [
      { icon: "surfboard", label: "Surfboard Rental" },
      { icon: "leaf", label: "Eco-Friendly" },
    ],
    nearbyLocations: [
      { name: "Cloud 9 Pier", distance: "0.1KM" },
      { name: "General Luna Market", distance: "1.2KM" },
    ],
    otherNearbyLandmarks: [
      { name: "Sugba Lagoon", distance: "4.0KM" },
      { name: "Magpupungko Pools", distance: "5.5KM" },
    ],
    reviews: [
      {
        user: { name: "Kelsey Merritt", avatar: bgMetroManila },
        rating: 5,
        text: "Best vibes on the island!",
        timeAgo: "1 week ago",
      },
    ],
    houseRules:
      "No single-use plastics. Respect local customs. Surfboards must be returned by 6PM.",
  },
  {
    id: "landmark-005",
    name: "Baguio Alpine Nest",
    location: "Baguio City",
    description:
      "A cozy wooden cabin perfect for cool mornings and strawberry jam evenings.",
    entrance_fee: 2499,
    max_guests: 5,
    created_at: "2025-03-01T14:00:00Z",
    updated_at: "2025-05-21T09:45:00Z",
    latitude: 16.4023,
    longitude: 120.596,
    images: [bgMetroManila, bgMetroManila],
    poster: {
      name: "Ylona Garcia",
      image: bgMetroManila,
    },
    rating: 4.7,
    totalReviews: 812,
    amenities: [
      { icon: "fire", label: "Fireplace" },
      { icon: "mug-hot", label: "Hot Drinks" },
    ],
    nearbyLocations: [
      { name: "Burnham Park", distance: "1.0KM" },
      { name: "Session Road", distance: "1.3KM" },
    ],
    otherNearbyLandmarks: [
      { name: "Mines View Park", distance: "3.5KM" },
      { name: "Camp John Hay", distance: "4.2KM" },
    ],
    reviews: [
      {
        user: { name: "Maine Mendoza", avatar: bgMetroManila },
        rating: 5,
        text: "Super cozy and quiet. Perfect family weekend.",
        timeAgo: "5 days ago",
      },
    ],
    houseRules:
      "Quiet hours after 9PM. No outdoor fires. Keep heaters off when not in use.",
  },
  {
    id: "landmark-006",
    name: "Palawan Hidden Bay Villa",
    location: "El Nido, Palawan",
    description:
      "Private villa with sea view and kayak access to secret lagoons.",
    entrance_fee: 4899,
    max_guests: 6,
    created_at: "2025-04-05T16:30:00Z",
    updated_at: "2025-05-22T12:00:00Z",
    latitude: 11.1795,
    longitude: 119.3919,
    images: [bgMetroManila],
    poster: {
      name: "Anne Curtis",
      image: bgMetroManila,
    },
    rating: 5.0,
    totalReviews: 311,
    amenities: [
      { icon: "swimmer", label: "Private Pool" },
      { icon: "umbrella-beach", label: "Beachfront" },
    ],
    nearbyLocations: [
      { name: "Big Lagoon", distance: "2.0KM" },
      { name: "Small Lagoon", distance: "2.5KM" },
    ],
    otherNearbyLandmarks: [
      { name: "Secret Beach", distance: "4.0KM" },
      { name: "Seven Commandos Beach", distance: "3.0KM" },
    ],
    reviews: [
      {
        user: { name: "Solenn Heussaff", avatar: bgMetroManila },
        rating: 5,
        text: "Magical stay. Kayaking straight from the villa!",
        timeAgo: "2 weeks ago",
      },
    ],
    houseRules:
      "Keep gate locked at night. Do not feed wildlife. All seafood must be pre-ordered.",
  },
];
