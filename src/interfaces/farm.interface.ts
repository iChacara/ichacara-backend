export interface Farm {
  title: string;
  name: string;
  cep: string;
  street: string;
  number: string;
  complement?: string;
  district: string;
  city: string;
  state: string;
  numRooms: number;
  numBeds: number;
  numBathrooms: number;
  maxOccupancy: number;
  services: string;
  highlights: string;
  photos?: string;
  dailyPrice: number;
  lessorId: number;
}
