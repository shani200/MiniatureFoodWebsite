import React from 'react';
import websiteCommonService from '../../controller/WebsiteCommonService';
import '../css/shoppingCartMobile.css'

/*import ProductTable from './ProductTable';*/



export default class ShoppingCartMobile extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            amountValue: '1'
        };
        this._getLoaclStorage = websiteCommonService.getLocalStorage;
        this._deleteCart = websiteCommonService.deleteCart;
        this.state={
            galleryArray: websiteCommonService.galleryItemArr
        };
        this.removeItem = this.removeItem.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.findIndex = this.findIndex.bind(this);
        this._addNotification = this._addNotification.bind(this);
        //  this.handleOnClickDelete = this._handleOnClickDelete.bind(this);
        this.onOutsideClick = this.onOutsideClick.bind(this);
    }

    componentDidMount(){
        this._deleteCart();
    }


    _addNotification(event){
        event.preventDefault();
        this.props.notification.addNotification({
            message: 'Item deleted',
            level: 'error',
            position: 'bl'
        });
    }

    renderCart(){
        let listItems;
        let productsStored = JSON.parse(this._getLoaclStorage());
        if(!productsStored || !productsStored.length){
            return(
                <div className="emptyCartMobile">
                    <div>Your shopping cart is empty,</div>
                    <div>but it doesn't have to be.</div>
                </div>);
        }
        else {

            listItems = productsStored.map((product, i) =>
                (
                    <div className="cartProductMobile">
                        {this.renderProduct(this.findIndex(product.id) , i)}
                    </div>
                )
            );}
        return listItems;
    }

    /*  {indexId = this.findIndex(product.id)}*/

    findIndex(id){
        let index;
        this.state.galleryArray.map((listItem,i) =>
            {
                if (listItem.id === id)
                    index = i
            }
        );
        return index;
    }

    handleChange(event) {
        this.setState({amountValue: event.target.value});
    }
    // onClick={()=>{ this.removeItem() ; this._addNotification()}}

    renderProduct(index, indexInModal){
        let productsStored = JSON.parse(this._getLoaclStorage());
        let amount = productsStored[indexInModal].amount;
        // this.setState({amountValue: amount});
        const classes = `indexInModal_${indexInModal} btn-remove-mobile`;
        return(
            <div className="cartDisplayMobile">
                <span className="cartImageMobile"><img className="imageMobileProduct" src={this.state.galleryArray[index].image}/></span>
                <span className="cartTitleMobile">{this.state.galleryArray[index].title}</span>
                <span className="cartQuantity">Quantity:
                    <input type="text"
                           value={amount}
                           className="amount-box"
                           onChange={this.handleChange}
                    />
                </span>
                <span className="cartPrice">Price:{this.state.galleryArray[index].price}$</span>

                <div className="btn-remove-cart">
                    <button className={classes}  onClick={this.removeItem}>
                        Remove
                    </button>
                </div>
            </div>
        );
    }

    /*  _handleOnClickDelete(event){
          this.removeItem(event);
          this._addNotification(event);
      }*/

    removeItem(event){
        let products = JSON.parse(this._getLoaclStorage());
        let indexInModal = event.target.classList[0].split('_')[1];
        products.splice(indexInModal, 1);
        localStorage.setItem('cart', JSON.stringify(products));
        this._addNotification(event);
        this.forceUpdate();
    }




    renderTotalPrice(){
        let price=0;
        let productsStored = JSON.parse(this._getLoaclStorage());
        if(!productsStored || !productsStored.length){
            return(
                undefined
            )
        }
        else{
            let index;
            productsStored.map((product,i) =>
                (
                    <div className="totalPrice">
                        {index= this.findIndex(product.id)}
                        {price += this.state.galleryArray[index].price * [product.amount]}
                    </div>
                )
            );}
        let strPrice = JSON.stringify(price);
        let dot = strPrice.indexOf('.');
        if(dot !== -1){
            let decimal = strPrice.substr(0 , dot);
            let remainder = strPrice.substr(dot, dot+1);
            return(
                <div className="price-zone-mobile">
                    <span>{`Total: ${decimal}${remainder}$`}</span>
                </div>
            );}
        else{
            return(
                <div className="price-zone-mobile">
                    <span>{`Total: ${strPrice}$`}</span>
                </div>
            );
        }
    }

    onOutsideClick(event) {
        let className = event.target.className;
        if (className === 'cartBackdrop') {
            this.props.onClose();
        }
    }

    render() {
        //render nothing if the prop show is false
        if (!this.props.show) {
            return null;
        }
        return (
            <div className="cartBackdrop" onClick={this.onOutsideClick}>
                <div className="cartModalMobile">
                    <div className="cartProductsMobile">
                        {this.renderCart()}
                    </div>
                    {this.renderTotalPrice()}
                    <div className="btn-exit-cart-mobile">
                        <button className="btn-close-cart-mobile" onClick={this.props.onClose}>
                            X
                        </button>
                    </div>

                </div>
            </div>


        );
    }
}