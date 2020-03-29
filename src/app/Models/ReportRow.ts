import {Transaction} from './Transaction';
import {IncomeStatementType} from './IncomeStatementType';

export class ReportRow {
  id: string;
  incomeStatementType: IncomeStatementType;
  sum: number;
  transactions: Transaction[];
}
