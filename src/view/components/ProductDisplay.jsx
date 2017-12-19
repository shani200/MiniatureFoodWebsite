import React from 'react';
import '../css/productDisplay.css'



export default class ProductDisplay extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            value: '1'
        };
        this.renderProducts=this.renderProducts.bind(this);
        this.renderOverview=this.renderOverview.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.addToCart = this.addToCart.bind(this);
        this.onExit = this.onExit.bind(this);
        this._addNotification = this._addNotification.bind(this);
        this.clearAmount = this.clearAmount.bind(this);
       //  this.isIdExists = this.isIdExists.bind(this);
        this.handleOnClickAddToCart = this._handleOnClickAddToCart.bind(this);

    }




    _addNotification(event){
        event.preventDefault();
        this.props.notification.addNotification({
            message: 'Item added',
            level: 'success'
        });
    }

    renderOverview(){
        let list = [];
        let item = this.props.itemsArray[this.props.index];
         for (let i=0; i< item.desc.length; i++) {
              list.push(<li> {`${item.desc[i].key} : ${item.desc[i].value}`}</li>);
          }
        return list;
    }

    addToCart() {
        // let product =this.props.itemsArray[this.props.index];
        // localStorage.setItem("lastname", "Smith");
        let item = this.props.itemsArray[this.props.index];
        let productsStored = JSON.parse(localStorage.getItem("cart"));
        if (!productsStored) {
            let products = [];
            products[0] = {
                id: item.id,
                amount: this.state.value
            };

            localStorage.setItem("cart", JSON.stringify(products));

        } else {
            let product = {id: item.id, amount: this.state.value};
            let oldAmount;
            let newAmount;
            let index;

           // let index = this.isIdExists(product.id, productsStored);
            for (let i=0; i< productsStored.length; i++) {
                if(productsStored[i].id === product.id) {
                    index= i;
                  }
                }
            if (index) {
                // for (let i=0; i< productsStored.length; i++) {
                //     if(productsStored[i].id === product.id){
                oldAmount = productsStored[index].amount;
                newAmount = parseInt(oldAmount) + parseInt(product.amount);
                productsStored[index].amount = newAmount;
            }
            // }

            else {
                productsStored.push(product);
            }
            // productsStored.push(this.state.value);
            localStorage.setItem("cart", JSON.stringify(productsStored));
        }
    }

    // isIdExists(id, list){
    //     let index;
    //     for (let i = 0; i < list.length; i++) {
    //         if(list[i].id ===id){
    //             index=i;
    //         }
    //         else{
    //             index=null;
    //         }
    //     }
    //      return index;
    //     }


    handleChange(event) {
        this.setState({value: event.target.value});
    }

    _handleOnClickAddToCart(event) {
        this.addToCart();
        this._addNotification(event);
        this.clearAmount();
        this.onExit()
    }

    clearAmount(){
        this.setState({value: 1});
    }

    onExit(){
       this.props.closeModal();
    }

    renderProducts(){
        //render nothing if the prop show is false
        if(!this.props.show){
            return null;
        }
        let divStyle = {
            listStyleType: 'upper-roman'
        };

        return(
            <div className="ProductBackdrop">
                <div className="ProductModal">
                    <img className="images" src={this.props.itemsArray[this.props.index].image}/>
                    <div className="description">

                        <div className="title">
                            {this.props.itemsArray[this.props.index].title}
                        </div>

                        <div className="price">
                            <span className="price-tag">price:</span>
                            {this.props.itemsArray[this.props.index].price}$
                        </div>

                        <div className="amount">
                            <span className="quantity">Quantity:</span>
                            <input type="text"
                                   value={this.state.value}
                                   className="amount-box"
                                   onChange={this.handleChange}
                            />
                        </div>

                        <div className="cartBtn">
                            <button onClick={this.handleOnClickAddToCart} className="btn-cart" >
                                Add to cart
                            </button>

                        </div>

                        <div className="view">
                            <div className="overview">Overview</div>
                            <ul className="myUl" style={divStyle}>
                                {this.renderOverview()}
                            </ul>

                        </div>

                    </div>
                    <div className="btn-exit">
                        <button  className="btn-close" onClick={this.props.onClose}>
                            X
                        </button>
                    </div>

                </div>
            </div>
        );
    }


    render() {
        return (
            <div >
                {this.renderProducts()}
            </div>

        );


    }
}

