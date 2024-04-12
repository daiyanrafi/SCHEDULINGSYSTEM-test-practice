import React, { useState, useRef, useEffect } from 'react';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper } from '@mui/material';

interface Cell {
  row: number;
  col: number;
}

const TestTable: React.FC = () => {
  const [selectedCells, setSelectedCells] = useState<Cell[]>([]);
  const [isMouseDown, setIsMouseDown] = useState(false);
  const tableRef = useRef<HTMLTableElement>(null);

  const handleMouseDown = (rowIndex: number, colIndex: number) => {
    const cell: Cell = { row: rowIndex, col: colIndex };
    setSelectedCells([cell]);
    setIsMouseDown(true);
  };

  const handleMouseMove = (rowIndex: number, colIndex: number) => {
    if (isMouseDown) {
      const cell: Cell = { row: rowIndex, col: colIndex };
      if (!selectedCells.some((c) => c.row === cell.row && c.col === cell.col)) {
        setSelectedCells([...selectedCells, cell]);
      }
    }
  };

  const handleMouseUp = () => {
    setIsMouseDown(false);
  };

  const handleClickOutside = (event: MouseEvent) => {
    if (tableRef.current && !tableRef.current.contains(event.target as Node)) {
      setSelectedCells([]);
    }
  };

  useEffect(() => {
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const isCellSelected = (rowIndex: number, colIndex: number) => {
    return selectedCells.some((c) => c.row === rowIndex && c.col === colIndex);
  };

  return (
    <TableContainer component={Paper}>
      <Table ref={tableRef} style={{ userSelect: 'none', borderCollapse: 'collapse' }}>
        <TableHead>
          <TableRow>
            <TableCell></TableCell>
            <TableCell style={{ borderRight: '1px solid black' }}>Header 1</TableCell>
            <TableCell style={{ borderRight: '1px solid black' }}>Header 2</TableCell>
            <TableCell>Header 3</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {[...Array(5)].map((_, rowIndex) => (
            <TableRow key={rowIndex}>
              <TableCell style={{ borderRight: '1px solid black' }}>Row {rowIndex + 1}</TableCell>
              {[...Array(3)].map((_, colIndex) => (
                <TableCell
                  key={colIndex}
                  onMouseDown={() => handleMouseDown(rowIndex, colIndex)}
                  onMouseMove={() => handleMouseMove(rowIndex, colIndex)}
                  onMouseUp={handleMouseUp}
                  style={{
                    backgroundColor: isCellSelected(rowIndex, colIndex) ? '#0078D4' : 'white',
                    borderRight: '1px solid black',
                  }}
                >
                  Cell {colIndex + 1}
                </TableCell>
              ))}
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default TestTable;

