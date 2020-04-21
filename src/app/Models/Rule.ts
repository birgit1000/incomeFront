import {IncomeStatementType} from './IncomeStatementType';
import {User} from './User';

export class Rule {
  id: string;
  name: string;
  transactionBeneficiaryOrPayerAccount: string;
  transactionBeneficiaryOrPayerName: string;
  transactionDetails: string;
  incomeStatementType: IncomeStatementType;
  user: User;
  type: string;
}
