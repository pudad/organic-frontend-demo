export interface OrderModel {
    
    address: string;
    delivered: boolean;
    cart: {
        totalQty: number;
        totalCost: number;
        items: [
            {
                productId: string;
                qty: number;
                price: number;
            }
        ]
    }

}