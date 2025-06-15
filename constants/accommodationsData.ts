import { Accommodation } from "@/interfaces/accommodation";

const sampleAccommodations: Accommodation[] = [
  {
    id: 1,
    name: "Mt. Kanlaon",
    description:
      "A tranquil riverside cabin perfect for a weekend escape. Surrounded by nature, yet close to the town center.",
    location: "Blue Ridge, Georgia, USA",
    latitude: 34.8632,
    longitude: -84.3247,
    category: {
      id: 2,
      name: "Nature Stay",
      description:
        "Lodgings immersed in nature like cabins, yurts, or eco-retreats.",
    },
    type: {
      id: 1,
      name: "Cabin",
      description: "Rustic wooden house in the forest or countryside.",
    },
    host: {
      id: 101,
      name: "Emily Dawson",
      image: "https://example.com/images/hosts/emily.jpg",
    },
    max_guests: 4,
    created_at: "2024-12-10T15:30:00Z",
    updated_at: "2025-05-20T12:45:00Z",
    media: [
      {
        url: "http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4",
        type: "video",
        caption: "Exterior view of the riverside cabin",
      },
      {
        url: "https://fastly.picsum.photos/id/28/4928/3264.jpg?hmac=GnYF-RnBUg44PFfU5pcw_Qs0ReOyStdnZ8MtQWJqTfA",
        type: "image",
        caption: "Exterior view of the riverside cabin",
      },
      {
        url: "https://example.com/videos/cabin-tour.mp4",
        type: "video",
        caption: "Full video tour of the cabin",
      },
    ],
    overall_rating: 4.8,
    total_review_count: 67,
    amenities: [
      {
        icon: "wifi",
        name: "Free Wi-Fi",
        description: "Unlimited high-speed internet access",
      },
      {
        icon: "fire",
        name: "Fireplace",
        description: "Indoor fireplace for cozy evenings",
      },
      {
        icon: "hot-tub",
        name: "Hot Tub",
        description: "Outdoor hot tub overlooking the river",
      },
    ],
    nearby_landmarks: [],
    reviews: [
      {
        user: {
          name: "Sarah M.",
          avatar: "https://example.com/images/users/sarah.jpg",
        },
        rating: 5,
        text: "Absolutely magical! The hot tub and view were unbeatable.",
        timeAgo: "2 weeks ago",
      },
      {
        user: {
          name: "Jake L.",
          avatar: "https://example.com/images/users/jake.jpg",
        },
        rating: 4.5,
        text: "Peaceful getaway with thoughtful amenities. Would return!",
        timeAgo: "1 month ago",
      },
    ],
    cancellation_policy: [
      {
        title: "Flexible",
        description: "Full refund if canceled 3 days before check-in.",
        refund_rules:
          "Cancel within 3 days of check-in for full refund, after that 50% refund.",
      },
    ],
    house_rules:
      "No smoking. No loud music after 10 PM. Pets allowed with prior notice.",
    total_price: 420,
    is_favorite: true,
    favorite_count: 128,
  },
];

export default sampleAccommodations;
