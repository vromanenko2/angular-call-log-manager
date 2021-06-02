import { Status } from './status.type';

export type CallLog = {
  id: number;
  user: string;
  phone?: string;
  email?: string;
  created: Date;
  resolved?: Date;
  closed?: Date;
  title: string;
  problem: string;
  solution?: string;
  status: Status;
};
