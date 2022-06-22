import type { HeadersFunction, LoaderFunction } from "@remix-run/node";
import { json } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";
import axios from "axios";
import { capitalize } from "lodash";

export const loader: LoaderFunction = async ({ params }) => {
  const { data } = await axios.get(`/people/${params.personId}`);

  return json(
    { person: data },
    {
      headers: {
        "Cache-Control": "max-age=60000",
      },
    }
  );
};

export const headers: HeadersFunction = ({ loaderHeaders }) => {
  return {
    "Cache-Control": loaderHeaders.get("Cache-Control") || "",
  };
};

export default function Person() {
  const { person } = useLoaderData();

  return (
    <>
      <div className="px-4 pt-6 pb-4 sm:px-6">
        <h3 className="text-lg font-medium text-gray-900">{person?.name}</h3>
      </div>
      <div className="px-6 py-2 border-t border-gray-200">
        <dl className="sm:divide-y sm:divide-gray-200">
          <div className="py-4 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4">
            <dt className="text-sm font-medium text-gray-500">Birth Year</dt>
            <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
              {person?.birth_year}
            </dd>
          </div>
          <div className="py-4 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4">
            <dt className="text-sm font-medium text-gray-500">Height</dt>
            <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
              {person?.height}cm
            </dd>
          </div>
          <div className="py-4 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4">
            <dt className="text-sm font-medium text-gray-500">Hair Color</dt>
            <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
              {capitalize(person?.hair_color)}
            </dd>
          </div>
          <div className="py-4 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4">
            <dt className="text-sm font-medium text-gray-500">Eye Color</dt>
            <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
              {capitalize(person?.eye_color)}
            </dd>
          </div>
          <div className="py-4 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4">
            <dt className="text-sm font-medium text-gray-500">Gender</dt>
            <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
              {capitalize(person?.gender)}
            </dd>
          </div>
          <div className="py-4 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4">
            <dt className="text-sm font-medium text-gray-500">Mass</dt>
            <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
              {capitalize(person?.mass)}kg
            </dd>
          </div>
          <div className="py-4 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4">
            <dt className="text-sm font-medium text-gray-500">Skin Color</dt>
            <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
              {capitalize(person?.skin_color)}
            </dd>
          </div>
        </dl>
      </div>
    </>
  );
}
