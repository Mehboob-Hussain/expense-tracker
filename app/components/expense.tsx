import React from 'react';
import { Card, CardContent, Typography, Box } from '@mui/material';

interface Transaction {
  id: number;
  description: string;
  amount: number;
  category: string;
}

interface ExpenseCardProps {
  transactions: Transaction[];
}

const ExpenseCard: React.FC<ExpenseCardProps> = ({ transactions }) => {
  // Initialize total income and total expenses
  let totalIncome = 0;
  let totalExpenses = 0;

  // Calculate total income (sum of all salary transactions)
  totalIncome = transactions.reduce((total, transaction) => {
    if (transaction.category === 'Salary') {
      return total + transaction.amount;
    }
    return total;
  }, 0);

  // Calculate total expenses (sum of all transactions except salary)
  totalExpenses = transactions.reduce((total, transaction) => {
    if (transaction.category !== 'Salary') {
      return total + transaction.amount;
    }
    return total;
  }, 0);

  const balance = totalIncome - totalExpenses;

  return (
    <Box display="flex" gap={2} marginBottom={2}>
      <Card>
        <CardContent>
          <Typography>Income</Typography>
          <Typography style={{ color: 'green' }}>+₹{totalIncome}</Typography>
        </CardContent>
      </Card>
      <Card>
        <CardContent>
          <Typography>Expense</Typography>
          <Typography style={{ color: 'red' }}>-₹{totalExpenses}</Typography>
        </CardContent>
      </Card>
      <Card>
        <CardContent>
          <Typography>Balance</Typography>
          <Typography>₹{balance}</Typography>
        </CardContent>
      </Card>
    </Box>
  );
};

export default ExpenseCard;
