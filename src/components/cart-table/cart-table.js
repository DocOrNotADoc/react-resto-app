import React from 'react';
import './cart-table.scss';
import {connect} from 'react-redux';
import {addedToCart, deleteFromCart} from '../../actions';

const CartTable = ({items, addedToCart, deleteFromCart}) => {
    return (
        <>
            <div className="cart__title">Ваш заказ:</div>
            <div className="cart__list">
                {
                    items.map(item => {
                        const {title, price, url, id, pcs, itemsPcsPrice} = item;

                        return (
                            <div key={id} className="cart__item">
                                <img src={url} className="cart__item-img" alt={title}></img>
                                <div className="cart__item-title">{title}</div>
                                <div className="cart__item-price_wrapper">
                                    <div className="cart__item-price-counter">
                                        <div onClick={() => deleteFromCart(id, 'one')} className="cart__item-dec">-</div>
                                        {price}$ / {pcs}x
                                        <div onClick={() => addedToCart(id)} className="cart__item-inc">+</div>
                                    </div>
                                    <div className="cart__item-totalprice">{`${itemsPcsPrice}`}$</div>
                                </div>
                                <div onClick={() => deleteFromCart(id)} className="cart__close">&times;</div>
                            </div>
                        )
                    })
                }
            </div>
        </>
    );
};

const mapStateToProps = ({items}) => {
    return {
        items
    }
};
const mapDispatchToProps = {
    addedToCart,
    deleteFromCart
};

export default connect(mapStateToProps, mapDispatchToProps)(CartTable);