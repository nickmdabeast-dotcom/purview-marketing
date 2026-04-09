declare global {
  interface Window {
    fbq?: {
      (action: "init", pixelId: string): void;
      (action: "track", event: string, params?: Record<string, unknown>): void;
      (action: "consent", mode: "grant" | "revoke"): void;
    };
  }
}

export {};
