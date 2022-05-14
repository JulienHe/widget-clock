import type { MetaFunction, LoaderFunction } from "remix";
import { useLoaderData, useParams } from "@remix-run/react";
import { json } from "remix";
import { formatInTimeZone } from "date-fns-tz";
import { useEffect, useState } from "react";
const { countryCodeEmoji } = require("country-code-emoji");

type IndexData = {
  timezone: string;
};

export let loader: LoaderFunction = async ({ request }) => {
  const url = new URL(request.url);
  const tz = url.searchParams.get("tz") || "";
  let data: IndexData = { timezone: tz };
  return json(data);
};

// https://remix.run/api/conventions#meta
export let meta: MetaFunction = () => {
  return {
    title: "Remix Starter",
    description: "Welcome to remix!",
  };
};

// https://remix.run/guides/routing#index-routes
export default function Index() {
  let data = useLoaderData<IndexData>();

  const [uiTime, setUiTime] = useState("");
  const params = useParams();

  useEffect(() => {
    const interval = setInterval(() => {
      const now = new Date();
      const zonedDate = formatInTimeZone(now, data.timezone, "HH:mm:ss");
      setUiTime(zonedDate);
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  const currentFlag = () => {
    return <span>{countryCodeEmoji(params.isoCode)}</span>;
  };

  const the_time = () => {
    return uiTime;
  };

  return (
    <div className="clock">
      <p className="clock__thetime">
        {currentFlag()} {the_time()}
      </p>
    </div>
  );
}
