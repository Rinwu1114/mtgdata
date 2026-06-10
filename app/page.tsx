import Navbar from "./(mian-app)/components/Navbar";
import Landing from "./landing/page";
export default function Home() {
  return (
    <div className="flex flex-col items-center justify-center
     bg-zinc-50 font-sans dark:bg-black
     ">
      <Navbar />
      <Landing />
    </div>
  );
}
