interface SeedData {
  entries: SeedEntry[];
}

interface SeedEntry {
  description: string;
  status: string;
  createdAt: number;
}

export const seedData: SeedData = {
  entries: [
    {
      description: "Penditene  EStasd dejnjnefjbrf snd skndsd ",
      status: "pending",
      createdAt: Date.now(),
    },
    {
      description: "Progresooo  EStasd dejnjnefjbrf snd skndsd ",
      status: "in-progress",
      createdAt: Date.now(),
    },
    {
      description: "Finisihed   EStasd dejnjnefjbrf snd skndsd ",
      status: "finished",
      createdAt: Date.now(),
    },
  ],
};
