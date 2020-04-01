import {Transaction} from './Transaction';

export class CsvFile {
  id: string;
  name: string;
  transactions: Transaction[];
  uploadDate: Date;
}
