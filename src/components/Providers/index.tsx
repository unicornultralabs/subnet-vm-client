import React from "react";
import { Flowbite } from "flowbite-react";
import appTheme from "../../config/flowbite";
import { SWRConfig } from "swr/_internal";

export default function Providers({ children }: { children: React.ReactNode }) {
  return (
    <SWRConfig
      value={{
        revalidateOnFocus: false,
        refreshInterval: 0,
      }}
    >
      <Flowbite theme={{ theme: appTheme }}>{children}</Flowbite>
    </SWRConfig>
  );
}
