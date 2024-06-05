interface NavItem {
  label: string;
  href: string;
  items?: NavItem[];
  external?: boolean;
}

export const navs: NavItem[] = [
  {
    label: "Explore",
    href: "/explore/items",
    items: [
      { href: "/explore/collections", label: "Collections" },
      { href: "/explore/items", label: "NFTs" },
      { href: "/explore/users", label: "Users" },
    ],
  },
  {
    label: "Create",
    href: "/create/nft",
    items: [
      { href: "/create/create", label: "Create" },
      { href: "/create/nft", label: "NFT" },
    ],
  },
  {
    label: "Launchpad",
    href: "/launchpad",
    items: [
      { href: "/launchpad", label: "Projects" },
      { href: "#" as string, external: true, label: "Apply" },
    ],
  },
];
