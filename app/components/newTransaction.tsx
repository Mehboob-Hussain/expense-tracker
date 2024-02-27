"use client"
import React, { useState, ChangeEvent } from 'react';
import { Button, Dialog, DialogTitle, DialogContent, DialogActions, TextField, Select, MenuItem, FormControl, InputLabel, FormHelperText } from '@mui/material';

interface Transaction {
  id: number;
  description: string;
  amount: number;
  category: string;
  date: string;
}

interface Errors {
  description: string;
  amount: string;
  category: string;
}

interface Props {
  openModal: boolean;
  handleOpenModal: () => void;
  handleCloseModal: () => void;
  onAddTransaction: (transaction: Transaction) => void;
}

const NewTransaction: React.FC<Props> = ({ openModal, handleOpenModal, handleCloseModal, onAddTransaction }) => {
  const currentDate: string = new Date().toISOString().split('T')[0];

  const [transactionData, setTransactionData] = useState<Transaction>({
    id: 0,
    description: '',
    amount: 0,
    category: '',
    date: '',
  });

  const [errors, setErrors] = useState<Errors>({
    description: '',
    amount: '',
    category: ''
  });

  const handleChange = (event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = event.target;
    setTransactionData({
      ...transactionData,
      [name]: name === 'amount' ? parseFloat(value) : value
    });
    // Clear validation error when user starts typing
    setErrors({
      ...errors,
      [name]: ''
    });
  };

  const handleAddTransaction = () => {
    let hasError = false;

    // Check for empty fields
    const newErrors: Errors = {
      description: '',
      amount: '',
      category: ''
    };
    if (!transactionData.description) {
      newErrors.description = 'Description is required';
      hasError = true;
    }
    if (!transactionData.amount) {
      newErrors.amount = 'Amount is required';
      hasError = true;
    }
    if (!transactionData.category) {
      newErrors.category = 'Category is required';
      hasError = true;
    }

    // Check if amount is a valid number
    const amount: number = transactionData.amount;
    if (isNaN(amount) || amount <= 0) {
      newErrors.amount = 'Amount must be a valid positive number';
      hasError = true;
    }

    // Update errors state
    if (hasError) {
      setErrors(newErrors);
      return;
    }

    // Create a new transaction object with the current date
    const newTransaction: Transaction = {
      ...transactionData,
      date: currentDate 
    };

    // Call the callback function provided by the parent component to add the new transaction
    onAddTransaction(newTransaction);

    // Reset the form data and errors
    setTransactionData({
      id: 0, 
      description: '',
      amount: 0,
      category: '',
      date: currentDate
    });
    setErrors({
      description: '',
      amount: '',
      category: ''
    });

    // Close the modal
    handleCloseModal();
  };

  return (
    <>
      <Button onClick={handleOpenModal} variant="contained" sx={{ backgroundColor: 'black', color: 'white', height: '50px' }}>Add Transaction</Button>

      <Dialog open={openModal} onClose={handleCloseModal}>
        <DialogTitle sx={{ textAlign: 'center' }} >Add New Transaction</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            label="Description"
            type="text"
            fullWidth
            name="description"
            value={transactionData.description}
            onChange={handleChange}
            error={Boolean(errors.description)}
          />
          {errors.description && <FormHelperText error>{errors.description}</FormHelperText>}
          <TextField
            margin="dense"
            label="Amount"
            type="number"
            fullWidth
            name="amount"
            value={transactionData.amount}
            onChange={handleChange}
            error={Boolean(errors.amount)}
          />
          {errors.amount && <FormHelperText error>{errors.amount}</FormHelperText>}
          <FormControl fullWidth error={Boolean(errors.category)}>
            <InputLabel id="category-label">Category</InputLabel>
            <Select
              labelId="category-label"
              id="category"
              value={transactionData.category}
              label="Category"
              name="category"
              onChange={(e) => handleChange(e as ChangeEvent<HTMLTextAreaElement | HTMLInputElement>)} // Adjusted the type here
            >
              <MenuItem value="Salary">Salary</MenuItem>
              <MenuItem value="Groceries">Groceries</MenuItem>
              <MenuItem value="Rent">Rent</MenuItem>
              <MenuItem value="Other">Other Expenses</MenuItem>
            </Select>
            {errors.category && <FormHelperText>{errors.category}</FormHelperText>}
          </FormControl>
        </DialogContent>
        <DialogActions>
          <Button variant="outlined" onClick={handleCloseModal}>Cancel</Button>
          <Button variant="contained" onClick={handleAddTransaction} color="primary">Add</Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default NewTransaction;

