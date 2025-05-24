import eventSpacesImg from "@/assets/images/category_eventSpaces.png";
import recreationalImg from "@/assets/images/category_exp.png";
import homestaysImg from "@/assets/images/category_homestay.png";
import hotelImg from "@/assets/images/category_hotels.png";
import resortsImg from "@/assets/images/category_resorts.png";

export const categories = [
  { id: "hotels", title: "Hotels", color: "#D3E7FF", image: hotelImg },
  { id: "resorts", title: "Resorts", color: "#D9FFC0", image: resortsImg },
  {
    id: "recreational",
    title: "Recreational",
    color: "#F9C2D2",
    image: recreationalImg,
  },
  {
    id: "event_places",
    title: "Event Places",
    color: "#F1D1FA",
    image: eventSpacesImg,
  },
  {
    id: "transients",
    title: "Transients",
    color: "#FFF2C0",
    image: homestaysImg,
  },
];
