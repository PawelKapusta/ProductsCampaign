import React, { useState } from 'react';
import InputLabel from '@material-ui/core/InputLabel';
import Input from '@material-ui/core/Input';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import makeStyles from '@material-ui/core/styles/makeStyles';
import FormControl from '@material-ui/core/FormControl';
import { cities, isEmptyObject } from '../../utils';
import DialogActions from '@material-ui/core/DialogActions';
import IconButton from '../Button/IconButton';
import DialogTitle from '@material-ui/core/DialogTitle';

const useStyles = makeStyles((theme) => ({
  root: {
    [theme.breakpoints.down('sm')]: {
      minHeight: '100%',
    },
    [theme.breakpoints.up('lg')]: {
      width: 400,
      minHeight: 600,
    },
  },
  editDialogTitle: {
    textAlign: 'center',
  },
  input: {
    marginTop: 5,
    marginBottom: 25,
  },
  selects: {
    display: 'flex',
    flexDirection: 'column',
  },
  formControl: {
    marginTop: 12,
    marginBottom: 12,
    minWidth: 200,
  },
  buttons: {
    position: 'relative',
    right: -20,
    bottom: -5,
  },
}));

const FormPaper = ({ product = {}, handleClose, handleEditProduct, handleCreateProduct }) => {
  const classes = useStyles();
  const [data, setData] = useState({
    name: product.name,
    campaign: product.campaign,
    keywords: product.keywords,
    bidAmount: product.bidAmount,
    campaignFund: product.campaignFund,
    status: product.status,
    town: product.town,
    radius: product.radius,
  });
  return (
    <div className={classes.root}>
      <DialogTitle className={classes.editDialogTitle} id="alert-dialog-slide-title">
        {isEmptyObject(product) ? 'CREATE' : 'EDIT THIS'} PRODUCT
      </DialogTitle>
      <InputLabel>Name</InputLabel>
      <Input
        className={classes.input}
        value={data?.name}
        onChange={(e) => setData({ ...data, name: e.target.value })}
        fullWidth
      />
      <InputLabel>Campaign</InputLabel>
      <Input
        className={classes.input}
        value={data?.campaign}
        onChange={(e) => setData({ ...data, campaign: e.target.value })}
        fullWidth
      />
      <InputLabel>Keywords</InputLabel>
      <Input
        className={classes.input}
        value={data?.keywords}
        onChange={(e) => setData({ ...data, keywords: e.target.value })}
        fullWidth
      />
      <InputLabel>Bid amount</InputLabel>
      <Input
        className={classes.input}
        value={data?.bidAmount}
        onChange={(e) => setData({ ...data, bidAmount: parseInt(e.target.value) })}
        type="number"
      />
      <InputLabel>Campaign fund</InputLabel>
      <Input
        className={classes.input}
        value={data?.campaignFund}
        onChange={(e) => setData({ ...data, campaignFund: parseInt(e.target.value) })}
        type="number"
      />
      <div className={classes.selects}>
        <FormControl variant="outlined" className={classes.formControl}>
          <InputLabel id="demo-simple-select-outlined-label">Status</InputLabel>
          <Select
            labelId="demo-simple-select-outlined-label"
            id="demo-simple-select-outlined"
            value={data?.status}
            onChange={(e) => setData({ ...data, status: e.target.value })}
            label="Status"
          >
            <MenuItem value="on">on</MenuItem>
            <MenuItem value="off">off</MenuItem>
          </Select>
        </FormControl>
        <FormControl variant="outlined" className={classes.formControl}>
          <InputLabel id="demo-simple-select-outlined-label2">Town</InputLabel>
          <Select
            labelId="demo-simple-select-outlined-label2"
            id="demo-simple-select-outlined2"
            value={data?.town}
            onChange={(e) => setData({ ...data, town: e.target.value })}
            label="Town"
          >
            {cities?.map((city) => (
              <MenuItem value={city}>{city}</MenuItem>
            ))}
          </Select>
        </FormControl>
      </div>
      <InputLabel>Radius</InputLabel>
      <Input
        className={classes.input}
        value={data?.radius}
        onChange={(e) => setData({ ...data, radius: parseInt(e.target.value) })}
        type="number"
      />
      <DialogActions className={classes.buttons}>
        <IconButton onClick={handleClose} type="cancel_btn" text="Cancel">
          Cancel
        </IconButton>
        <IconButton
          onClick={
            isEmptyObject(product)
              ? () => handleCreateProduct(data)
              : () => handleEditProduct(product.id, data)
          }
          type="save_btn"
          text="Save"
        >
          Save
        </IconButton>
      </DialogActions>
    </div>
  );
};

export default FormPaper;
