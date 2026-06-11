import SearchBar from "../landing/components/searchbar";
import ManaAnimation from "../landing/components/manaAnimation";
import PopularCards from "../landing/components/popularCards";

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
       <ManaAnimation />
        <p className="mt-3 text-xl text-center flex items-center
        justify-center text-gray-600 dark:text-gray-400
        mx-auto max-w-2xl
        mb-8">
          Explore the world of Magic: The Gathering cards, sets, and community made decks.
        </p>

        <PopularCards />
      </main>
     
    )
}