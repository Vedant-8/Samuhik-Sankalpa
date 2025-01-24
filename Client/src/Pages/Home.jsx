import Footer from "../Components/Footer";
import Discover from "../components/Home/Discover";
import Front from "../components/Home/Front";
import HowItWorks from "../components/Home/HowItWorks";
import Quiz from "../components/Home/Quiz";
import Stats from "../components/Home/Stats";
import Stories from "../components/Home/Stories";
import Trusted from "../components/Home/Trusted";
import Navbar from "../Components/Navbar";

export default function Home() {
  return (
    <main>
      <Navbar />
      <Front />
      <Stats />
      <Quiz />
      <Discover />
      <HowItWorks />
      <Stories />
      <Footer />
    </main>
  );
}
