import { CustomFlowbiteTheme } from "flowbite-react";

const table: CustomFlowbiteTheme["table"] = {
  root: {
    base: "w-full text-left text-sm text-secondary rounded-2xl",
    shadow:
      "absolute bg-white w-full h-full top-0 left-0 rounded-lg shadow -z-10",
  },
  head: {
    base: "group/head text-heading-xs uppercase text-secondary font-semibold",
  },
};

const accordion: CustomFlowbiteTheme["accordion"] = {
  content: {
    base: "py-5 px-5 last:rounded-b-lg first:rounded-t-lg",
  },
  title: {
    flush: {
      on: "",
      off: "",
    },
  },
};

const modal: CustomFlowbiteTheme["modal"] = {
  content: {
    inner:
      "relative rounded-lg bg-white shadow flex flex-col tablet:h-auto h-full desktop:h-auto max-h-[90vh]",
    base: "relative h-full w-full p-4 desktop:h-auto tablet:h-auto",
  },
};

const carousel: CustomFlowbiteTheme["carousel"] = {
  root: {
    base: "relative h-full w-full",
    leftControl:
      "absolute top-0 left-0 flex h-full items-center justify-center px-4 focus:outline-none",
    rightControl:
      "absolute top-0 right-0 flex h-full items-center justify-center px-4 focus:outline-none",
  },
};

const appTheme: CustomFlowbiteTheme = {
  table,
  accordion,
  modal,
  carousel,
};

export default appTheme;
