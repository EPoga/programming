export type Language = 'lv' | 'en';

export interface MarkerPoint {
  x: number;
  y: number;
}

export interface SeatingAssignment {
  table: string;
  seat?: string;
  direction: string;
  marker?: MarkerPoint;
}

export interface SleepingAssignment {
  house: string;
  roomBed?: string;
  direction: string;
  marker?: MarkerPoint;
}

export interface Guest {
  id: string;
  name: string;
  surname: string;
  seating: SeatingAssignment;
  sleeping: SleepingAssignment;
  notes?: string;
}

export interface MapConfig {
  image: string;
  alt: string;
  fallbackLegend: string;
}

export interface AppConfig {
  seatingMap: MapConfig;
  sleepingMap: MapConfig;
}
