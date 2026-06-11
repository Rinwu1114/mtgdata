"use client";
import Image from "next/image";
import { useEffect, useRef } from "react";
import React from "react";

interface ScryfallCard {
  id: string;
  name: string;
  mana_cost?: string;
  type_line: string;
  image_uris?: {
    normal: string;
    small: string;
  };
}

interface ScryfallSearchResponse {
  object: string;
  total_cards: number;
  has_more: boolean;
  data: ScryfallCard[];
}

 const baseUrl = `https://api.scryfall.com`;
  const headers = {
    "User-Agent": `Mtg-Database/1.0 (Contact: rinwu1114@gmail.com)`,
    Accept: `application/json`,
  };

export default function PopularCards() {
  const scrollContainerRef = useRef<HTMLUListElement>(null);

  useEffect(() => {
    const container = scrollContainerRef.current;
    if (!container) return;

    const handleWheel = (e: WheelEvent) => {
      e.preventDefault();
      const scrollSpeed = 2; 
      container.scrollLeft += e.deltaY * scrollSpeed;
    };

    container.addEventListener("wheel", handleWheel);
    return () => container.removeEventListener("wheel", handleWheel);
  }, []);

 

  const [popularCards, setPopularCards] = React.useState<ScryfallCard[]>([]);
  const [hasFetchError, setHasFetchError] = React.useState(false);

  useEffect(() => {
    const fetchCards = async () => {
      try {
        const res = await fetch(
          `${baseUrl}/cards/search?q=legal:commander&order=edhrec&dir=asc`,
          {
            method: "GET",
            headers: headers,
          },
        );

        if (!res.ok) {
          const errorDetails = await res.json().catch(() => ({}));
          console.error(
            `Failed to fetch popular cards: ${res.status} ${res.statusText}`,
            errorDetails,
          );
          setHasFetchError(true);
        } else {
          const responseData: ScryfallSearchResponse = await res.json();
          setPopularCards(responseData.data.slice(0, 10));
        }
      } catch (error) {
        console.error("Error fetching popular cards:", error);
        setHasFetchError(true);
      }
    };

    fetchCards();
  }, []);

  if (hasFetchError) {
    return (
      <div className="w-full max-w-2xl bg-gray-900 rounded-lg shadow-lg p-4 text-center text-gray-300">
        <p className="text-lg">
          Failed to load popular cards. Please try again later.
        </p>
      </div>
    );
  }

  const AllPopularCards = popularCards;
  console.log("Fetched popular cards:", AllPopularCards);
  return (
    <div className="flex flex-col w-full rounded-lg shadow-lg p-6 text-white">
      <h2 className="text-xl font-bold mb-4 text-center ">
        Popular Commander Cards
      </h2>
      <ul
        ref={scrollContainerRef}
        className="gap-6 flex flex-nowrap overflow-x-auto w-full py-4 pb-6 scroll-smooth scrollbar-hide"
        style={{
          scrollbarWidth: "none",
          msOverflowStyle: "none",
        }}
      >
        {AllPopularCards.map((card) => (
          <li
            key={card.id}
            className="flex flex-col items-center justify-center gap-3 shrink-0"
          >
            <span className="font-semibold text-center px-2 text-sm w-56 line-clamp-2">
              {card.name}
            </span>
            <Image
              width={300}
              height={400}
              src={card.image_uris?.normal || "/placeholder-card.png"}
              alt={card.name}
              className="w-56 h-80 object-contain "
            />
            <span className="text-gray-500 text-sm text-center w-56 line-clamp-3">
              {card.type_line}
            </span>
          </li>
        ))}
      </ul>
    </div>
  );
}
