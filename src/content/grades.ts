import type { GradeBand } from "@/types/content";

/** National certificate (mathematics) levels, lowest to highest. */
// TODO(client): ball oraliqlarini rasmiy jadval bilan solishtiring.
export const gradeBands: GradeBand[] = [
  { level: "C", from: 46, to: 49 },
  { level: "C+", from: 50, to: 54 },
  { level: "B", from: 55, to: 59 },
  { level: "B+", from: 60, to: 64 },
  { level: "A", from: 65, to: 69 },
  { level: "A+", from: 70 },
];
