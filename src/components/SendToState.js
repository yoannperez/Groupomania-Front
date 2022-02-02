import React from 'react';

const SendToState = ({ cart, updateCart }) => {
    


    return (
        <div>
            {cart}
            <button onClick={() => updateCart(cart + 1)}>Vider le panier</button>
        </div>
    );
};

export default SendToState;