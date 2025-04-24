
export enum UserStatus {
  ACTIVO = "ACTIVO",
  INACTIVO = "INACTIVO",
}

export interface User {
  id: string;
  estado: UserStatus;
  sector: number;
  usuario: string;
}




