import React from 'react';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Checkbox, styled } from '@mui/material';

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  '&:hover': {
    backgroundColor: '#f5f5f5',
  },
  height: '40px', // Adjust the height here as per your requirement
}));

// Custom styled checkbox
const CustomCheckbox = styled(Checkbox)(({ theme }) => ({
  padding: 0,
  '& .MuiSvgIcon-root': {
    fontSize: '16px', // Adjust the size here
  },
}));

interface Charge {
  id: string;
  amount: number;
  created: number;
  currency: string;
  customer: string;
  paid: boolean;
  invoice: string;
}

interface Props {
  charges: Charge[];
}

const ChargesTable: React.FC<Props> = ({ charges }) => {
  return (
    <TableContainer component={Paper} style={{ marginTop: '40px', overflowX: 'auto', margin: '20px auto', width: '95%', maxWidth: '1500px' }}>
      <Table style={{ fontFamily: 'Calibri', border: '1px solid #ccc' }}>
        <TableHead>
          <TableRow>
            <TableCell style={{ padding: '10px', fontFamily: 'Calibri', width: '10%' }}>ID</TableCell>
            <TableCell style={{ padding: '10px', fontFamily: 'Calibri', width: '15%' }}>Created</TableCell>
            <TableCell style={{ padding: '10px', fontFamily: 'Calibri', width: '5%' }}>Amount</TableCell>
            <TableCell style={{ padding: '10px', fontFamily: 'Calibri', width: '5%' }}>Currency</TableCell>
            <TableCell style={{ padding: '10px', fontFamily: 'Calibri', width: '10%' }}>Customer</TableCell>
            <TableCell style={{ padding: '10px', fontFamily: 'Calibri', width: '5%' }}>Paid</TableCell>
            <TableCell style={{ padding: '10px', fontFamily: 'Calibri', width: '10%' }}>Document No.</TableCell>
            <TableCell style={{ padding: '10px', fontFamily: 'Calibri', width: '5%' }}>Journal Document No.</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {charges.map((charge) => (
            <StyledTableRow key={charge.id}>
              <TableCell style={{ fontFamily: 'Calibri', padding: '10px', color: 'blue', textDecoration: 'underline', cursor: 'pointer', width: '10%' }}>
                {charge.id}
              </TableCell>
              <TableCell style={{ padding: '10px', fontFamily: 'Calibri' }}>{new Date(charge.created * 1000).toLocaleString()}</TableCell>
              <TableCell style={{ padding: '10px', fontFamily: 'Calibri' }}>{charge.amount}</TableCell>
              <TableCell style={{ padding: '10px', fontFamily: 'Calibri' }}>{charge.currency}</TableCell>
              <TableCell style={{ padding: '10px', fontFamily: 'Calibri' }}>{charge.customer}</TableCell>
              <TableCell style={{ padding: '10px', fontFamily: 'Calibri' }}>
                <CustomCheckbox checked={charge.paid} disabled /> {/* Use custom styled checkbox */}
              </TableCell>
              <TableCell style={{ padding: '10px', fontFamily: 'Calibri', width: '10%' }}>{charge.invoice}</TableCell>
              <TableCell style={{ padding: '10px', fontFamily: 'Calibri', width: '5%' }}>{charge.invoice}</TableCell>
            </StyledTableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default ChargesTable;
