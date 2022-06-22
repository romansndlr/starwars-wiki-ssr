import { FilmIcon } from "@heroicons/react/solid";
import type { LoaderFunction } from "@remix-run/node";
import { json } from "@remix-run/node";
import { NavLink, Outlet, useLoaderData } from "@remix-run/react";
import axios from "axios";
import clsx from "clsx";
import dayjs from "dayjs";
import { last, compact } from "lodash";

interface Person {
  birth_year: string;
  created: string;
  edited: string;
  eye_color: string;
  films: string[];
  gender: string;
  hair_color: string;
  height: string;
  homeworld: string;
  mass: string;
  name: string;
  skin_color: string;
  species: string[];
  starships: string[];
  url: string;
  vehicles: string[];
}

export const loader: LoaderFunction = async () => {
  const { data } = await axios.get("/people");

  return json({ people: data });
};

export default function People() {
  const { people } = useLoaderData();

  return (
    <>
      <div className="flex flex-col flex-1 h-screen max-w-3xl min-h-0 bg-white border-r lg:min-w-0 lg:flex-1">
        <div className="pt-4 pb-4 pl-4 pr-6 border-t border-b border-gray-200 sm:pl-6 lg:pl-8 xl:pl-6 xl:pt-6 xl:border-t-0">
          <div className="flex items-center">
            <h1 className="flex-1 text-lg font-medium text-gray-900">People</h1>
          </div>
        </div>
        <ul className="relative z-0 flex-1 min-h-0 overflow-y-auto border-b border-gray-200 divide-y divide-gray-200">
          {people.results.map((person: Person) => {
            const id = last(compact(person.url.split("/"))) as string;

            return (
              <li key={person.name}>
                <NavLink
                  prefetch="intent"
                  className={({ isActive }) =>
                    clsx(
                      "relative flex justify-between py-5 pl-4 pr-6 hover:bg-gray-50 sm:py-6 sm:pl-6 lg:pl-8 xl:pl-6",
                      isActive && "bg-gray-50"
                    )
                  }
                  to={id}
                >
                  <div>
                    <h4 className="text-lg font-semibold text-gray-800">
                      {person.name}
                    </h4>
                    <div className="flex mt-4">
                      <div className="flex items-center">
                        <FilmIcon className="h-5 text-gray-400" />
                        <span className="ml-2 text-sm text-gray-800">
                          Appeared in {person.films.length} films
                        </span>
                      </div>
                    </div>
                  </div>
                  <div>
                    <p className="text-gray-400">
                      Added {dayjs(person.created).fromNow()}
                    </p>
                  </div>
                </NavLink>
              </li>
            );
          })}
        </ul>
      </div>
      <div className="flex-1">
        <Outlet />
      </div>
    </>
  );
}
