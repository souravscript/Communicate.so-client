export interface Stat {
    title: string;
    value: string | number;
    icon: JSX.Element;
  }

  export interface FileData {
    fileName: string;
    fileSizeKB: number;
  }

  export interface Member {
    id: string ;
    name: string;
    category: string;
    joinedOn: string;
    lastLogin: string;
  }
  
  export interface Category {
    name: string;
  }

  export interface QueryData {
    date: string;
    sales: number;
    technology: number;
    business: number;
    total: number;
  }