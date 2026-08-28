import HeroBanner from "../components/HeroBanner";
import CategoryCircles from "../components/CategoryCircles";
import NewDeals from "../components/NewDeals";
import Footer from "../components/Footer";

export default function Home() {
  return (
    <div>
      <HeroBanner />
      <CategoryCircles />
      <NewDeals />
      <Footer />
    </div>
  );
}
