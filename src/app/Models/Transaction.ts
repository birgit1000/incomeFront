import {IncomeStatementType} from './IncomeStatementType';
import {CsvFile} from './CsvFile';

export class Transaction {
  id: string;
  accountNumber: string;
  date: Date;
  beneficiaryOrPayerAccount: string;
  beneficiaryOrPayerName: string;
  details: string;
  amount: number;
  currency: string;
  debitOrCredit: string;
  incomeStatementType: IncomeStatementType;
}
