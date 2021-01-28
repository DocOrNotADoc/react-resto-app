import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import './menu-list-item.scss';

const MenuListItem = ({menuItem, onAddToCart}) => {
    const {title, price, url, category} = menuItem;

    const LinkToItemPage = styled(Link)`
        text-decoration: none;
        color: black;
        &:focus, &:hover, &:visited, &:link, &:active {
            text-decoration: none;
        }
    `;

    return (
            <li className="menu__item">
                <LinkToItemPage to = {`/item/${menuItem.id}`}>
                    <div className="menu__title">{title}</div>
                    <img className="menu__img" src={url} alt={title}></img>
                </LinkToItemPage>
                    <div className="menu__wrapper">
                        <div className={`menu__category_icon ${category}`}/>
                        <div>
                            <div className="menu__category">Category: <span>{category}</span></div>
                            <div className="menu__price">Price: <span>{price}$</span></div>
                            <button onClick={() => onAddToCart()} className="menu__btn">Add to cart</button>
                        </div>
                    </div>
            </li>
    )
}

export default MenuListItem;