import Banner from "@/components/home/Banner";
import Features from "@/components/home/Features";
import Gallery from "@/components/home/Gallery";
import Newsletter from "@/components/home/Newsletter";
import RecentEvents from "@/components/home/RecentEvents";

export default function Home() {
  return (
    <div>
      <Banner></Banner>
      <Features></Features>
      <RecentEvents></RecentEvents>
      <Gallery></Gallery>
      <Newsletter></Newsletter>
    </div>
  );
}
