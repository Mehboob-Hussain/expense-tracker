"use client"
import React, { useState } from 'react';
import { Typography, Box, styled } from '@mui/material';
import ExpenseCard from './components/expense';
import NewTransaction from './components/newTransaction';
import TransactionList from './components/transactionList';

const CenteredTypography = styled(Typography)({
  textAlign: 'center',
});

interface Transaction {
  id: number;
  description: string;
  amount: number;
  category: string;
  date: string; 
}

function Home() {
  const [transactions, setTransactions] = useState<Transaction[]>([]);

  // Function to add new transaction
  const addTransaction = (newTransaction: Transaction) => {
    console.log('New Transaction Data:', newTransaction);
    setTransactions([...transactions, newTransaction]);
  };

  const [openModal, setOpenModal] = useState<boolean>(false);

  const handleOpenModal = () => {
    setOpenModal(true);
  };

  const handleCloseModal = () => {
    setOpenModal(false);
  };

  return (
    <Box mx="auto" maxWidth="1000px">
      <CenteredTypography variant="h2">Expense Tracker</CenteredTypography>
      <Box display="flex" justifyContent="space-between" mt={2}>
        <Box>
          <ExpenseCard transactions={transactions} />
        </Box>
        <Box>
          <NewTransaction
            onAddTransaction={addTransaction}
            openModal={openModal}
            handleOpenModal={handleOpenModal}
            handleCloseModal={handleCloseModal}
          />
        </Box>
      </Box>
      <Box mt={2}>
        <TransactionList transactions={transactions} />
      </Box>
    </Box>
  );
}

export default Home;
