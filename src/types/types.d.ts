export {};

declare global {
  /**
   * Now declare things that go in the global namespace,
   * or augment existing declarations in the global namespace.
   */
  interface RoutesType {
    name: string;
    layout?: string;
    path: string;
    icon?: JSX.Element;
    component?: JSX.Element;
    links?: RouteType[];
    roles?: string[];
  }
}
