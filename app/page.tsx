import Navbar from "./(mian-app)/components/Navbar";
import Landing from "./landing/page";
import Footer from "./(mian-app)/components/Footer";

export default function Home() {
  return (
    <div className="flex flex-col items-center justify-center
     bg-zinc-50 font-sans dark:bg-black
     ">
      <Navbar />
      <Landing />
      <Footer />
    </div>
  );
}
