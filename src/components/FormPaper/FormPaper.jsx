import React, {useState} from 'react';
import InputLabel from '@material-ui/core/InputLabel';
import makeStyles from '@material-ui/core/styles/makeStyles';
import FormControl from '@material-ui/core/FormControl';
import {isEmptyObject} from '../../utils';
import DialogActions from '@material-ui/core/DialogActions';
import IconButton from '../Button/IconButton';
import DialogTitle from '@material-ui/core/DialogTitle';
import uuid from 'react-uuid';
import {useForm} from 'react-hook-form';
import {yupResolver} from "@hookform/resolvers/yup";
import * as yup from "yup";

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
  label: {
    marginTop: 10,
    marginBottom: 10,
    fontSize: "1.2em"
  },
  input: {
    padding: "1% 1%",
    fontSize: '1em',
    width: "90%",
    minHeight: "30px",
    backgroundColor: "white",
    border: "1px solid black",
  },
  span: {
    display: "block",
    marginTop: 5,
    color: "red"
  },
  select: {
    width: "90%",
    height: "40px",
    background: "white",
    color: "gray",
    paddingLeft: "5px",
    fontSize: "1em",
  },
  selectsBox: {
    display: 'flex',
    flexDirection: 'column',
    marginTop: 12
  },
  option: {
    color: "black",
    background: "white",
    display: "flex",
    whiteSpace: "pre",
    minHeight: "20px",
    padding: "0px 2px 1px",
  },
  formControl: {
    marginTop: 12,
    marginBottom: 12,
    minWidth: 200,
  },
  buttons: {
    position: 'relative',
    left: 20,
    top: 10,
  },
  submitButton: {
    color: "red",
    fontSize: "1em",
    width: "25%",
    height: "34px",
    borderRadius: "7%",
    cursor: "pointer",
    border: "1px solid red",
    marginBottom: 1,
    padding: 0,
    background: "white",
    '&:hover': {
      background: "red",
      color: "white"
    },
  }
}));

const cities = [
  'Kraków',
  'Wrocław',
  'Warszawa',
  'Łódź',
  'Poznań',
  'Gdańsk',
  'Szczecin',
  'Bydgoszcz',
  'Lublin',
  'Białystok',
  'Rzeszów',
];

const statuses = ["off", "on"];

const FormPaper = ({product = {}, handleClose, handleEditProduct, handleCreateProduct}) => {
  const classes = useStyles();
  const [campaignFund, setCampaignFund] = useState(product.campaignFund ? product.campaignFund : 0);
  const [bidAmount, setBidAmount] = useState(product.bidAmount ? product.bidAmount : 0);

  const schema = yup.object().shape({
    name: yup.string().required("Name is a required field"),
    campaign: yup.string().required("Campaign is a required field"),
    keywords: yup.string().required("Keywords is a required field"),
    bidAmount: yup.number().required().typeError('You must specify a number')
     .min(0, 'Min value 0.')
     .max(campaignFund, `Bid amount can not be bigger than Campaign fund: ${Number.isNaN(campaignFund) ? 0 : campaignFund}`),
    campaignFund: yup.number().required().typeError('You must specify a number')
     .min(bidAmount, `Campaign fund can not be lower than Bid amount: ${Number.isNaN(bidAmount) ? 0 : bidAmount}`),
    status: yup.string().required(),
    town: yup.string(),
    radius: yup.number().required().typeError('You must specify a number')
     .min(0, 'Number have to be positive'),
  });

  const {register, handleSubmit, formState: {errors}} = useForm({
    resolver: yupResolver(schema),
    defaultValues: product
  });

  const onSubmit = (values) => {
    if (isEmptyObject(product)) {
      handleCreateProduct(values);
    } else {
      handleEditProduct(product.id, values);
    }
  }

  return (
   <div className={classes.root}>
     <form onSubmit={handleSubmit(onSubmit)}>
       <DialogTitle className={classes.editDialogTitle} id="alert-dialog-slide-title">
         {isEmptyObject(product) ? 'CREATE' : 'EDIT THIS'} PRODUCT
       </DialogTitle>
       <InputLabel className={classes.label}>Name</InputLabel>
       <input
        {...register('name')}
        className={classes.input}
        name="name"
        type="text"
       />
       <span className={classes.span}>{errors.name?.message}</span>
       <InputLabel className={classes.label}>Campaign</InputLabel>
       <input
        className={classes.input}
        {...register(`campaign`)}
        type="text"
       />
       <span className={classes.span}>{errors.campaign?.message}</span>
       <InputLabel className={classes.label}>Keywords</InputLabel>
       <input
        className={classes.input}
        {...register(`keywords`)}
        type="text"
       />
       <span className={classes.span}>{errors.keywords?.message}</span>
       <InputLabel className={classes.label}>Bid amount</InputLabel>
       <input
        className={classes.input}
        {...register(`bidAmount`)}
        onChange={(e) => setBidAmount(e.target.value)}
        type="number"
       />
       <span className={classes.span}>{errors.bidAmount?.message}</span>
       <InputLabel className={classes.label}>Campaign fund</InputLabel>
       <input
        className={classes.input}
        {...register(`campaignFund`)}
        onChange={(e) => setCampaignFund(e.target.value)}
        type="number"
       />
       <span className={classes.span}>{errors.campaignFund?.message}</span>
       <div className={classes.selectsBox}>
         <InputLabel className={classes.label}>Status</InputLabel>
         <FormControl variant="outlined" className={classes.formControl}>
           <select
            {...register(`status`)}
            className={classes.select}
           >
             {statuses?.map((status) => (
              <option className={classes.option} key={uuid()} value={status}>
                {status}
              </option>
             ))}
           </select>
         </FormControl>
         <InputLabel className={classes.label}>Town</InputLabel>
         <FormControl variant="outlined" className={classes.formControl}>
           <select
            {...register(`town`)}
            className={classes.select}
            id="demo-simple-select-outlined"
            name='town'
           >
             {cities?.map((city) => (
              <option className={classes.option} key={uuid()} value={city}>
                {city}
              </option>
             ))}
           </select>
         </FormControl>
       </div>
       <InputLabel className={classes.label}>Radius in km</InputLabel>
       <input
        {...register(`radius`)}
        className={classes.input}
        type="number"
       />
       <span className={classes.span}>{errors.radius?.message}</span>
       <DialogActions className={classes.buttons}>
         <IconButton onClick={handleClose} type="cancel_btn" text="Cancel"/>
         <input className={classes.submitButton} type="submit" value="Save"/>
       </DialogActions>
     </form>
   </div>
  );
};

export default FormPaper;