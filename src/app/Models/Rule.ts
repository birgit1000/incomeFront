import {IncomeStatementType} from './IncomeStatementType';

export class Rule {
  id: string;
  name: string;
  transactionBeneficiaryOrPayerAccount: string;
  transactionBeneficiaryOrPayerName: string;
  transactionDetails: string;
  incomeStatementType: IncomeStatementType;
}
