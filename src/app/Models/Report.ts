import {ReportRow} from './ReportRow';
import {User} from './User';

export class Report {
  id: string;
  rows: ReportRow[];
  dateMade: Date;
  startDate: Date;
  endDate: Date;
  user: User;
}
