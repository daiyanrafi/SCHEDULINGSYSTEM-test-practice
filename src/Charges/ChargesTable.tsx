import React from 'react';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Checkbox, styled } from '@mui/material';

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  '&:hover': {
    backgroundColor: '#f5f5f5',
  },
  height: '40px', // Adjust the height here as per your requirement
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
    <TableContainer component={Paper} style={{ marginTop: '20px', overflowX: 'auto' }}>
      <Table style={{ fontFamily: 'Calibri' }}>
        <TableHead>
          <TableRow>
            <TableCell style={{ padding: '10px', fontFamily: 'Calibri' }}>ID</TableCell>
            <TableCell style={{ padding: '10px', fontFamily: 'Calibri' }}>Created</TableCell>
            <TableCell style={{ padding: '10px', fontFamily: 'Calibri' }}>Amount</TableCell>
            <TableCell style={{ padding: '10px', fontFamily: 'Calibri' }}>Currency</TableCell>
            <TableCell style={{ padding: '10px', fontFamily: 'Calibri' }}>Customer</TableCell>
            <TableCell style={{ padding: '10px', fontFamily: 'Calibri' }}>Paid</TableCell>
            <TableCell style={{ padding: '10px', fontFamily: 'Calibri' }}>Document No.</TableCell>
            <TableCell style={{ padding: '10px', fontFamily: 'Calibri' }}>Journal Document No.</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {charges.map((charge) => (
            <StyledTableRow key={charge.id}>
              <TableCell style={{ fontFamily: 'Calibri', padding: '10px', color: 'blue', textDecoration: 'underline', cursor: 'pointer' }}>
                {charge.id}
              </TableCell>
              <TableCell style={{ padding: '10px', fontFamily: 'Calibri' }}>{new Date(charge.created * 1000).toLocaleString()}</TableCell>
              <TableCell style={{ padding: '10px', fontFamily: 'Calibri' }}>{charge.amount}</TableCell>
              <TableCell style={{ padding: '10px', fontFamily: 'Calibri' }}>{charge.currency}</TableCell>
              <TableCell style={{ padding: '10px', fontFamily: 'Calibri' }}>{charge.customer}</TableCell>
              <TableCell style={{ padding: '10px', fontFamily: 'Calibri' }}>
                <Checkbox checked={charge.paid} disabled />
              </TableCell>
              <TableCell style={{ padding: '10px', fontFamily: 'Calibri' }}>{charge.invoice}</TableCell>
              <TableCell style={{ padding: '10px', fontFamily: 'Calibri' }}>{charge.invoice}</TableCell>
            </StyledTableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default ChargesTable;
