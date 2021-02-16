export interface ProductModel {

    pCategory: string;
    pName: string;
    pCost: number;
    pPrice: number;
    pPriceSale: number;
    pDetail: string;
    qty: number;
    imagesUrl: string;
    _id: string;



}

export interface ProductRespone {
    products: ProductModel[],
    totalPage: number,
    totalProducts: number
}