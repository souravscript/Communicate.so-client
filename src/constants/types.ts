export interface Member {
  id: string;
  name: string;
  category: string;
  createdAt: string;
  lastLogin: string;
}

export interface Category {
  id: string;
  name: string;
}

export interface DataSource {
  id: string;
  type: string;
  name: string;
  isEnabled: boolean;
  status: string;
}

export interface Stat {
  title: string;
  value: number | string;
  icon: React.ReactNode;
}

export interface FileData {
  id: string;
  name: string;
  type: string;
  size: string;
  lastSync: string;
  dataSource: string;
  status: 'synced' | 'failed' | 'syncing';
}
