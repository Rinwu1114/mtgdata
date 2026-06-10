import Navbar from "./(mian-app)/components/Navbar";

export default function Home() {
  return (
    <div className="flex flex-col flex-1 items-center justify-center bg-zinc-50 font-sans dark:bg-black">
      <Navbar />

      <main className="flex flex-1 w-full max-w-3xl flex-col items-center justify-between py-32 px-16 bg-white dark:bg-black sm:items-start">
        <h1 className="text-6xl font-bold text-center">
          Welcome to the <span className="text-purple-800">MTG Database</span>
        </h1>
        <p className="mt-3 text-2xl text-center">
          Explore the world of Magic: The Gathering cards and sets.
        </p>
      </main>
    </div>
  );
}
