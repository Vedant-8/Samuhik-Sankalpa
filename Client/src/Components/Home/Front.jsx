import { useState } from "react";
import SearchBar from "./SearchBar";
import front_world from "../../assets/home/Greenish_BG1.jpg";

export default function Front() {
  const [searchBar, setSearchBar] = useState(false);

  return (
    <section className="relative z-10 m-3">
      <div className="sm:w-11/12 mx-auto">
        <div
          className={`py-8 sm:rounded-3xl relative w-full h-[620px] bg-cover lg:bg-center bg-no-repeat bg-left`}
          style={{ backgroundImage: `url(${front_world})` }} // Use imported image here
        >
          <article className="absolute top-0 left-0 w-full p-4 flex items-center justify-center text-center">
            <div className="bg-white bg-opacity-70 p-6 rounded-xl shadow-lg max-w-full">
              <div className="text-green-800 text-2xl sm:text-3xl md:text-4xl font-bold leading-tight mb-4">
                Empower local change: Discover green projects, connect with
                partners, and fund sustainability for a better future.
              </div>
            </div>
          </article>
        </div>
      </div>
    </section>
  );
}
