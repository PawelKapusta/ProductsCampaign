import React, { useContext } from 'react';
import TableRow from '@material-ui/core/TableRow';
import uuid from 'react-uuid';
import TableCell from '@material-ui/core/TableCell';
import IconButton from '../Button/IconButton';
import { makeStyles } from '@material-ui/core/styles';
import ProductsContext from '../../context/ProductsContext';

const useStyles = makeStyles({
  buttons: {
    display: 'flex',
    justifyContent: 'center',
    margin: 10,
  },
  row: {
    fontSize: '.9rem',
  },
});

const TableBodyContent = ({ page, rowsPerPage, columns, handleClickOpen, handleRemoveProduct }) => {
  const classes = useStyles();
  const { products } = useContext(ProductsContext);

  return (
    <>
      {products.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((row) => {
        return (
          <TableRow hover role="checkbox" tabIndex={-1} key={uuid()}>
            {columns.map((column) => {
              const value = row[column.id];
              const formattedValue =
                column.format && typeof value === 'number' ? column.format(value) : value;

              return (
                <TableCell className={classes.row} key={uuid()} align={column.align}>
                  {formattedValue}
                </TableCell>
              );
            })}
            <span className={classes.buttons}>
              <IconButton onClick={() => handleClickOpen(row.id)} type="edit_btn" text="Edit" />
              <IconButton
                onClick={() => handleRemoveProduct(row.id)}
                type="delete_btn"
                text="Delete"
              />
            </span>
          </TableRow>
        );
      })}
    </>
  );
};

export default TableBodyContent;
