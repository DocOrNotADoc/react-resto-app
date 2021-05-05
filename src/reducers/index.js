const initialState = {
  error: false,
  menu: [],
  loading: true,
  items: [],
  itemsPcsPrice: 0,
  totalPrice: 0
}

const reducer = (state = initialState, action) => {
  // console.log(state);
  const idx = action.payload;
  const itemIdx = state.items.findIndex(item => item.id === idx);
  const currentItem = state.items.find(item => item.id === idx);

  switch (action.type) {

    case 'MENU_LOADED':
      return {
        ...state,
        menu: action.payload,
        loading: false,
        error: false
      };

    case 'MENU_REQUESTED':
      return {
        ...state,
        menu: state.menu,
        loading: true,
        error: false
      };

    case 'ITEM_ADD_TO_CART':
      if (itemIdx >= 0){                    // если товар уже есть в корзине
        const newItem = {
          ...currentItem,
          pcs: ++currentItem.pcs,
          itemsPcsPrice: currentItem.price * currentItem.pcs
        }
        return {
          ...state, 
          items: [
            ...state.items.slice(0, itemIdx),
            newItem,
            ...state.items.slice(itemIdx + 1)
          ],
          totalPrice: state.totalPrice + newItem.price
        }
      }
      const item = state.menu.find(item => item.id === idx);      // если товара раньше не было в корзине
      const newItem = {
        title: item.title,
        price: item.price,
        url: item.url,
        id: item.id,
        pcs: 1,
        itemsPcsPrice: item.price
      };
      return {
        ...state,
        items: [
          ...state.items,
          newItem
        ],
        totalPrice: state.totalPrice + newItem.price
      };

    case 'ITEM_REMOVE_FROM_CART':
      const event = action.event;
      const totalPriceDec = state.totalPrice - currentItem.price;
      const deleteCurrentItem = {
        ...state,
          items: [
            ...state.items.filter(item => item.id !== idx)
          ],
          totalPrice: totalPriceDec
      };
      if (event === 'one') {                    // На случай если надо уменьшить количество одноименных товаров в корзине
        if (currentItem.pcs === 1) {              // Если товар один, то при нажатии минуса он полностью удаляется из корзины
          return deleteCurrentItem
        }
        const newItemPcs = {
          ...currentItem,
          pcs: --currentItem.pcs,
          itemsPcsPrice: currentItem.price * currentItem.pcs
        }
        return {
          ...state,
          items: [
            ...state.items.slice(0, itemIdx),
            newItemPcs,
            ...state.items.slice(itemIdx + 1)
          ],
          totalPrice: totalPriceDec
        }
      }
      return deleteCurrentItem;

    case 'MENU_ERROR':
      return {
        ...state,
        menu: state.menu,
        error: true
      };
      
    default:
      return state;
  }
}

export default reducer;