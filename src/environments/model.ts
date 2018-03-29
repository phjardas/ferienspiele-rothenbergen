export interface Environment {
  production: boolean;
  hmr: boolean;
  locale: string;
  title: string;
  year: number;
  startDate: string;
  endDate: string;
  price: PriceConfig;
  enableRouterTracing: boolean;
  firebase: FirebaseConfig;
  paypal: PayPalConfig;
}

export interface PriceConfig {
  base: number;
  sibling: number;
  kuchen: number;
}

export interface FirebaseConfig {
  apiKey: string;
  authDomain: string;
  databaseURL: string;
  projectId: string;
  storageBucket: string;
  messagingSenderId: string;
}

export interface PayPalConfig {
  enabled: boolean;
  environment?: string;
  clientId?: string;
  testUser?: { email: string; password: string };
}
