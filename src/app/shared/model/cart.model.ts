import { ProductModel } from "./product.model";

export interface CartRespone {
    _id: string;
    cart_qty: number;
    cart_totalPrice: number;
    createdAt: Date;
    updatedAt: Date;
    products: ProductModel[];
    userId: string;
}


export interface AmountProductRespone {
    isEmpty: boolean,
    msg: string,
    value: number
}