import React, { useEffect }from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { startGetCart } from '../redux/actions';
import '../styles/purchases.css';

const Purchases = ({isPurchasesOpen}) => {
    
    const dispatch = useDispatch()

    const state = useSelector(state => state) 

   useEffect(() => {
     dispatch(startGetCart())
     
   }, [dispatch])
   

    return (
        <div className={`purchases-modal ${isPurchasesOpen ? 'open' : ''}`}>
            MY cart
        </div>
    );
};

export default Purchases;