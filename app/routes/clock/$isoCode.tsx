import type { MetaFunction, LoaderFunction } from "remix";
import { useParams } from "@remix-run/react";
import { json } from "remix";
import { formatInTimeZone } from "date-fns-tz";
import { useEffect, useState } from "react";
const { countryCodeEmoji } = require("country-code-emoji");

type IndexData = {
  resources: Array<{ name: string; url: string }>;
  demos: Array<{ name: string; to: string }>;
};

// Loaders provide data to components and are only ever called on the server, so
// you can connect to a database or run any server side code you want right next
// to the component that renders it.
// https://remix.run/api/conventions#loader
export let loader: LoaderFunction = () => {
  return json("hello");
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
  // let data = useLoaderData<IndexData>();
  const [uiTime, setUiTime] = useState("");
  const params = useParams();

  useEffect(() => {
    const interval = setInterval(() => {
      const now = new Date();
      const zonedDate = formatInTimeZone(now, "Asia/Seoul", "HH:mm:ss");
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
