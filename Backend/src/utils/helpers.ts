// Time calculation 
export function getDurationInSeconds(start: number, end: number): number {
  return Math.round(((end - start) / 1000) * 10) / 10;
}