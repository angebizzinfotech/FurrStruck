import {Injectable} from '@angular/core';

@Injectable({
    providedIn: 'root'
})
export class ApiService {
    // Admin -> Login
    login = 'users/login';

    // Admin -> User
    getUserList = 'users/getAllUsers';
    addUser = 'users/addUser';
    editUser = 'users/editUser/'
    getUserRole = 'users/getUserRole';
    getuserById = 'users/getUser/';

    // Admin -> vendor
    getVendorList = 'vendor/getAllVendor';
    saveVendor = 'vendor/addVendor';
    editVendor = 'vendor/editVendor/';
    deletevendor = 'vendor/deleteVendor/';
    getVendorById = 'vendor/getVendorById/';

    // Admin -> Category
    getCategoryList = 'category/getAllCategory';
    addCategory = 'category/addCategory';
    editCategory = 'category/editCategory/';
    deleteCategory = 'category/deleteCategory/';
    getCategoryDetail = 'category/getCategoryById/';

    // Admin -> Sub Category
    getSubCategoryList = 'subCategory/getAllSubCategory';
    addSubCategory = 'subCategory/addSubCategory';
    editSubCategory = 'subCategory/editSubCategory/';
    deleteSubCategory = 'subCategory/deleteSubCategory/';
    getSubcategoryByCatId = 'category/getSubcategory/';
    getSubCatDetail = 'subcategory/viewSubCategory/';

    // Admin -> Manufecturer
    getManafecturerList = 'manufacturer/getAllManufacturer';
    getManufacturerByVidList = 'manufacturer/getManufacturerByVid/';
    deleteManafecturer = 'manufacturer/deleteManufacturer/';
    addManafecturer = 'manufacturer/addManufacturer';
    editManafecturer = 'manufacturer/editManufacturer/';
    getManufacturerById = 'manufacturer/getManufacturerById/';

    // Admin -> Product
    getproductList = 'product/searchProduct';
    addProduct = 'product/image_product';
    deleteProduct = 'product/deleteProduct/';
    editProduct = 'product/image_product/';
    viewProduct = 'product/viewProduct/';
    searchProduct = 'product/searchProduct';
    deletProductImages = 'product/deleteProductImage/';

    constructor() {
    }
}
