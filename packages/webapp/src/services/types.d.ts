declare module '@twocats/services' {
  export type Services = typeof import('./index').default;
}
