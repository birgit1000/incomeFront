export class Transaction {
  accountNumber: string;
  date: Date;
  beneficiaryOrPayerAccount: string;
  beneficiaryOrPayerName: string;
  details: string;
  amount: number;
  currency: string;
  debitOrCredit: string;
  incomeStatementType: string;
}
