import {Transaction} from './Transaction';
import {User} from './User';

export class CsvFile {
  id: string;
  name: string;
  transactions: Transaction[];
  uploadDate: Date;
  user: User;
}
