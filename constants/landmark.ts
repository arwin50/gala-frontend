import bgMetroManila from "@/assets/images/places_pic/places_metroManila.jpg";
import { Landmark } from "@/interfaces/landmark";

export const sampleLandmarks: Landmark[] = [
  {
    id: "landmark-001",
    name: "Gynkui Killa Dormitory",
    location: "Alaminos, Pangasinan",
    description: "A peaceful dorm with a golden view of rice terraces.",
    created_at: "2024-11-01T10:32:00Z",
    updated_at: "2025-05-20T15:47:00Z",
    latitude: 16.1612,
    longitude: 119.9826,
    images: [bgMetroManila, bgMetroManila, bgMetroManila],
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
  },
  {
    id: "landmark-002",
    name: "Kamuning Hideout",
    location: "Quezon City, Metro Manila",
    description: "A cozy escape in the heart of the city.",
    created_at: "2025-02-15T09:00:00Z",
    updated_at: "2025-04-01T18:00:00Z",
    latitude: 14.6422,
    longitude: 121.0573,
    images: [bgMetroManila],
    nearbyLocations: [
      { name: "Kamuning Market", distance: "0.3KM" },
      { name: "GMA Network Center", distance: "1.2KM" },
    ],
    otherNearbyLandmarks: [
      { name: "ABS-CBN", distance: "2.0KM" },
      { name: "Maginhawa Street", distance: "3.5KM" },
    ],
  },
  {
    id: "landmark-003",
    name: "Cebu Hilltop Studio",
    location: "Busay, Cebu City",
    description:
      "A hillside escape overlooking Cebu with modern interiors and fresh breeze.",
    created_at: "2025-01-10T08:00:00Z",
    updated_at: "2025-05-10T10:30:00Z",
    latitude: 10.3591,
    longitude: 123.8707,
    images: [bgMetroManila, bgMetroManila],
    nearbyLocations: [
      { name: "Temple of Leah", distance: "2.1KM" },
      { name: "Sirao Garden", distance: "3.7KM" },
    ],
    otherNearbyLandmarks: [
      { name: "Tops Lookout", distance: "1.2KM" },
      { name: "Lahug IT Park", distance: "5.0KM" },
    ],
  },
  {
    id: "landmark-004",
    name: "Siargao Surf Shack",
    location: "General Luna, Siargao",
    description:
      "Steps from Cloud 9, this shack is a surfer’s paradise with bamboo decor and hammocks.",
    created_at: "2024-12-05T12:45:00Z",
    updated_at: "2025-05-18T10:00:00Z",
    latitude: 9.7905,
    longitude: 126.1652,
    images: [bgMetroManila],
    nearbyLocations: [
      { name: "Cloud 9 Pier", distance: "0.1KM" },
      { name: "General Luna Market", distance: "1.2KM" },
    ],
    otherNearbyLandmarks: [
      { name: "Sugba Lagoon", distance: "4.0KM" },
      { name: "Magpupungko Pools", distance: "5.5KM" },
    ],
  },
  {
    id: "landmark-005",
    name: "Baguio Alpine Nest",
    location: "Baguio City",
    description:
      "A cozy wooden cabin perfect for cool mornings and strawberry jam evenings.",
    created_at: "2025-03-01T14:00:00Z",
    updated_at: "2025-05-21T09:45:00Z",
    latitude: 16.4023,
    longitude: 120.596,
    images: [bgMetroManila, bgMetroManila],
    nearbyLocations: [
      { name: "Burnham Park", distance: "1.0KM" },
      { name: "Session Road", distance: "1.3KM" },
    ],
    otherNearbyLandmarks: [
      { name: "Mines View Park", distance: "3.5KM" },
      { name: "Camp John Hay", distance: "4.2KM" },
    ],
  },
  {
    id: "landmark-006",
    name: "Palawan Hidden Bay Villa",
    location: "El Nido, Palawan",
    description:
      "Private villa with sea view and kayak access to secret lagoons.",
    created_at: "2025-04-05T16:30:00Z",
    updated_at: "2025-05-22T12:00:00Z",
    latitude: 11.1795,
    longitude: 119.3919,
    images: [bgMetroManila],
    nearbyLocations: [
      { name: "Big Lagoon", distance: "2.0KM" },
      { name: "Small Lagoon", distance: "2.5KM" },
    ],
    otherNearbyLandmarks: [
      { name: "Secret Beach", distance: "4.0KM" },
      { name: "Seven Commandos Beach", distance: "3.0KM" },
    ],
  },
];
