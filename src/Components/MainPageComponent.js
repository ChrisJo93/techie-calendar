import React, { Component } from 'react';
import ProductCellComponent from './ProductCellComponent';

class MainPageComponent extends Component {

    render() {
        return (
            <div>
                <h2>Here are all my cool products!</h2>
                
                <ProductCellComponent/>
                <ProductCellComponent/>
                <ProductCellComponent/>
                <ProductCellComponent/>
                <ProductCellComponent/>
                <ProductCellComponent/>
                
            </div>
        )
    }
}

export default MainPageComponent;