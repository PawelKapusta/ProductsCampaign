import React, { forwardRef, useEffect, useState } from 'react';
import Paper from '@material-ui/core/Paper';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TablePagination from '@material-ui/core/TablePagination';
import TableRow from '@material-ui/core/TableRow';
import uuid from 'react-uuid';
import { makeStyles } from '@material-ui/core/styles';
import Dialog from '@material-ui/core/Dialog';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import Slide from '@material-ui/core/Slide';
import FormPaper from '../FormPaper/FormPaper';
import { createProduct, deleteProduct, updateProduct } from '../../api';
import IconButton from '../Button/IconButton';

const columns = [
  { id: 'name', label: 'Name', minWidth: 100, align: 'center' },
  { id: 'campaign', label: 'Campaign', minWidth: 120, align: 'center' },
  { id: 'keywords', label: 'Keywords', minWidth: 120, align: 'center' },
  { id: 'bidAmount', label: 'Bid amount', minWidth: 80, align: 'center' },
  { id: 'campaignFund', label: 'Campaign fund', minWidth: 80, align: 'center' },
  { id: 'status', label: 'Status', minWidth: 30, align: 'center' },
  { id: 'town', label: 'Town', minWidth: 120, align: 'center' },
  { id: 'radius', label: 'Radius', minWidth: 30, align: 'center' },
];
const useStyles = makeStyles({
  root: {
    display: 'flex',
    justifyContent: 'center',
  },
  paper: {
    width: '80%',
    marginTop: '3%',
    boxShadow: '.5em .7em #888888',
  },
  container: {
    maxHeight: 740,
  },
  buttons: {
    display: 'flex',
    justifyContent: 'center',
    margin: 10,
  },
  row: {
    fontSize: '.9rem',
  },
});

const Transition = forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

const ProductsList = ({ products }) => {
  const classes = useStyles();
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [open, setOpen] = useState(false);
  const [editRowId, setEditRowId] = useState(0);
  const [editProductData, setEditProductData] = useState({});

  useEffect(() => {
    const product = products.find((product) => product.id === editRowId);
    setEditProductData(product);
  }, [editRowId]);

  const handleClickOpen = (id) => {
    setEditRowId(id);
    setOpen(true);
  };
  const handleClickOpenCreate = () => {
    setEditRowId(uuid());
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };
  const handleCreateProduct = async (product) => {
    await createProduct(product);

    window.location.reload(true);
  };
  const handleRemoveProduct = async (id) => {
    if (window.confirm('Are you sure you want to remove this product?')) {
      await deleteProduct(id);

      window.location.reload(true);
    }
  };
  const handleEditProduct = async (id, data) => {
    if (window.confirm('Are you sure you want to edit/save this changes?')) {
      await updateProduct(id, data);

      window.location.reload(true);
    }
  };
  return (
    <div className={classes.root}>
      <Paper className={classes.paper}>
        <IconButton
          type="create_btn"
          text="Create Product"
          onClick={() => handleClickOpenCreate()}
        />
        <TableContainer className={classes.container}>
          <Table stickyHeader aria-label="sticky table">
            <TableHead>
              <TableRow>
                {columns.map((column) => (
                  <TableCell
                    key={uuid()}
                    align={column.align}
                    style={{ minWidth: column.minWidth, fontWeight: 'bold', fontSize: '1.1rem' }}
                  >
                    {column.label}
                  </TableCell>
                ))}
              </TableRow>
            </TableHead>
            <TableBody>
              {products.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((row) => {
                return (
                  <TableRow hover role="checkbox" tabIndex={-1} key={uuid()}>
                    {columns.map((column) => {
                      const value = row[column.id];
                      return (
                        <TableCell className={classes.row} key={uuid()} align={column.align}>
                          {column.format && typeof value === 'number'
                            ? column.format(value)
                            : value}
                        </TableCell>
                      );
                    })}
                    <span className={classes.buttons}>
                      <IconButton
                        onClick={() => {
                          handleClickOpen(row.id);
                        }}
                        type="edit_btn"
                        text="Edit"
                      />
                      <IconButton
                        onClick={() => handleRemoveProduct(row.id)}
                        type="delete_btn"
                        text="Delete"
                      />
                    </span>
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
        </TableContainer>
        <TablePagination
          rowsPerPageOptions={[10, 25, 100]}
          component="div"
          count={products.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onChangePage={handleChangePage}
          onChangeRowsPerPage={handleChangeRowsPerPage}
        />
        <Dialog
          open={open}
          TransitionComponent={Transition}
          onClose={handleClose}
          aria-labelledby="alert-dialog-slide-title"
          aria-describedby="alert-dialog-slide-description"
        >
          <DialogContent>
            <DialogContentText id="alert-dialog-slide-description">
              <FormPaper
                product={editProductData}
                handleClose={handleClose}
                handleEditProduct={handleEditProduct}
                handleCreateProduct={handleCreateProduct}
              />
            </DialogContentText>
          </DialogContent>
        </Dialog>
      </Paper>
    </div>
  );
};

export default ProductsList;
