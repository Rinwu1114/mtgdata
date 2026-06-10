import SearchBar from "../landing/components/searchbar";
import Image from "next/image";
import BlueMana from "../../assets/pngegg.png";
import GreenMana from "../../assets/pngegg (1).png";
import BlackMana from "../../assets/pngegg (2).png";
import WhiteMana from "../../assets/pngegg (3).png";
import RedMana from "../../assets/pngegg (4).png";
export default function Landing() {
    return (
        <main className="flex w-full h-full max-w-3xl flex-col justify-center
         items-center bg-white dark:bg-black sm:items-start 
         mt-16  px-4">
        <h1 className="text-6xl font-bold text-center mt-16">
          Welcome to the <span className="text-purple-800">MTG Database</span>
        </h1>
        <div className="flex w-full max-w-2xl 
         bg-gray-900 rounded-lg shadow-lg 
         items-center justify-center my-8 mx-auto
        border-transparent hover:border-purple-800 border-2 transition duration-200
       ">
        <SearchBar />
         </div> 
       <div className="w-80 h-80 flex justify-center items-center rounded-full relative orbit
       mx-auto mb-8">
  <div className="orbit-item">
    <div className="orbit-inner">
      <Image src={BlueMana} alt="Blue Mana" className="w-14 h-14"/>
    </div>
  </div>
  <div className="orbit-item">
    <div className="orbit-inner">
      <Image src={GreenMana} alt="Green Mana" className="w-14 h-14" />
    </div>
  </div>
  <div className="orbit-item">
    <div className="orbit-inner">
      <Image src={BlackMana} alt="Black Mana" className="w-14 h-14" />
    </div>
  </div>
  <div className="orbit-item">
    <div className="orbit-inner">
      <Image src={WhiteMana} alt="White Mana" className="w-14 h-14" />
    </div>
  </div>
  <div className="orbit-item">
    <div className="orbit-inner">
      <Image src={RedMana} alt="Red Mana" className="w-14 h-14" />
    </div>
  </div>
</div>

        <p className="mt-3 text-xl text-center flex items-center
        justify-center text-gray-600 dark:text-gray-400
        mx-auto max-w-2xl
        pb-8">
          Explore the world of Magic: The Gathering cards and sets.
        </p>
      </main>
    )
}