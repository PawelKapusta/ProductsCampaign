import React, { forwardRef, useContext, useEffect, useState } from 'react';
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
import TableBodyContent from '../TableBodyContent/TableBodyContent';
import ProductsContext from '../../context/ProductsContext';

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
});

const Transition = forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

const ProductsList = () => {
  const classes = useStyles();
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [open, setOpen] = useState(false);
  const [editRowId, setEditRowId] = useState(0);
  const [editProductData, setEditProductData] = useState({});
  const { products, refetchData } = useContext(ProductsContext);

  useEffect(() => {
    const product = products.find((product) => product.id === editRowId);
    setEditProductData(product);
  }, [editRowId]);

  const handleClickOpen = (id) => {
    setEditRowId(id);
    setOpen(true);
  };

  const handleClickOpenCreate = () => {
    setEditRowId(-1);
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
    refetchData();
    setEditRowId(-1);
    setOpen(false);
  };

  const handleRemoveProduct = async (id) => {
    if (window.confirm('Are you sure you want to remove this product?')) {
      await deleteProduct(id);
      refetchData();
      setEditRowId(-1);
      setOpen(false);
    }
  };

  const handleEditProduct = async (id, data) => {
    await updateProduct(id, data);
    refetchData();
    setEditRowId(-1);
    setOpen(false);
  };

  return (
    <div className={classes.root}>
      <Paper className={classes.paper}>
        <IconButton type="create_btn" text="Create Product" onClick={handleClickOpenCreate} />
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
              <TableBodyContent
                page={page}
                rowsPerPage={rowsPerPage}
                columns={columns}
                handleClickOpen={handleClickOpen}
                handleRemoveProduct={handleRemoveProduct}
              />
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
