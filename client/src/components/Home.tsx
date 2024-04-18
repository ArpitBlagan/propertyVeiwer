import home from "@/home.jpg";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { Card, CardContent } from "./ui/card";
import { Link } from "react-router-dom";
const arr = [
  {
    title: "Personalized Dashboard",
    description:
      "Tailored user dashboards provide insights into favorite listings, recent searches, and personalized recommendations, empowering users to track their property journey with ease.",
  },
  {
    title: "Purrfect Property Matches:",
    description:
      "Our app uses a feline-friendly algorithm to find homes that match your unique preferences, ensuring you find the purrfect place to call home.",
  },
  {
    title: "Real-Time Notifications",
    description:
      "Stay ahead of the competition with real-time notifications on new listings, price drops, and open houses, keeping users informed about the latest opportunities in the market.",
  },
];
const Home = () => {
  return (
    <div className="min-h-screen">
      <div className="flex flex-col justify-around items-center gap-3 mt-5 w-full">
        <img src={home} className="rounded-xl object-fill md:w-1/2" />
        <div>
          <p className="text-[40px] text-gray-400 ">
            Unlock Your Dream Home: Explore, Discover, Find.❤️
          </p>
          <div className="w-full flex items-center justify-start">
            <Link to="/fav" className=" text-red-400 underline cursor-pointer">
              Your Favourite
            </Link>
          </div>
        </div>
      </div>
      <div className="flex justify-center items-center">
        <Carousel className="w-full max-w-xs">
          <CarouselContent>
            {arr.map((ele, index) => (
              <CarouselItem key={index}>
                <div className="p-1">
                  <Card>
                    <CardContent className="flex flex-col gap-2 aspect-square items-center justify-center p-6">
                      <p className="text-xl font-semibold flex items-center ">
                        {index + 1}. {ele.title}
                      </p>
                      <p className="text-md text-gray-300">{ele.description}</p>
                    </CardContent>
                  </Card>
                </div>
              </CarouselItem>
            ))}
          </CarouselContent>
          <CarouselPrevious />
          <CarouselNext />
        </Carousel>
      </div>
    </div>
  );
};

export default Home;
