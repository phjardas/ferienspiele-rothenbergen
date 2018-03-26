export interface Environment {
  production: boolean;
  hmr: boolean;
  locale: string;
  title: string;
  year: number;
  startDate: string;
  endDate: string;
  enableRouterTracing: boolean;
  firebase: FirebaseConfig;
  paypal: PayPalConfig;
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
