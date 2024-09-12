import {Route, createBrowserRouter, createRoutesFromElements} from "react-router-dom";

import PageNotFound from "../Utils/PageNotFound";
import RootLayout from "../Utils/Layout";
import ErrorHandler from "../Components/errors/ErrorHandler";
import HomePage from "../Pages/Home/HomePage";
import ProductDetailsPage from "../Pages/Products/ProductDetailsPage";
import CategoriesPage from "../Pages/Categories/CategoriesPage";
import ShopProductsPage from "../Pages/Products/ShopProductsPage";
import BrandsPage from "../Pages/Brands/BrandsPage";
import DashBoardAdminPage from "../Pages/Admin/DashBoardAdminPage";
import AdminProductsPage from "../Pages/Admin/AdminProductsPage";
import AdminCategoriesPage from "../Pages/Admin/AdminCategoriesPage";
import AdminSubCategoriesPage from "../Pages/Admin/AdminSubCategoriesPage";
import AdminBrandsPage from "../Pages/Admin/AdminBrandsPage";
import AdminCouponsPage from "../Pages/Admin/AdminCouponsPage";
import UserOrdersPage from "../Pages/User/UserOrdersPage";
import UserWishListPage from "../Pages/User/UserWishListPage";
import UserAddressesPage from "../Pages/User/UserAddressesPage";
import UserProfilePage from "../Pages/User/UserProfilePage";
import CartPage from "../Pages/Cart/CartPage";
import LoginPage from "../Pages/Auth/LoginPage";
import RegisterPage from "../Pages/Auth/RegisterPage";


const router = createBrowserRouter(
  createRoutesFromElements(
    <>
      {/* Root Layout */}
      <Route path="/" element={<RootLayout />} errorElement={<ErrorHandler />}>

        <Route index element={<HomePage />} />

        <Route path="categories" element={<CategoriesPage />} />
        <Route path="products" element={<ShopProductsPage />} />
        <Route path="product-details/:id" element={<ProductDetailsPage />} />
        <Route path="brands" element={<BrandsPage />} />

        {/* admin routes */}
        <Route path="admin/dash-board" element={<DashBoardAdminPage />} />
        <Route path="admin/products" element={<AdminProductsPage />} />
        <Route path="admin/categories" element={<AdminCategoriesPage />} />
        <Route path="admin/subcategories" element={<AdminSubCategoriesPage />} />
        <Route path="admin/brands" element={<AdminBrandsPage />} />
        <Route path="admin/coupons" element={<AdminCouponsPage />} />

        {/* user routes */}
        <Route path="user/orders" element={<UserOrdersPage />} />
        <Route path="user/wish-list" element={<UserWishListPage />} />
        <Route path="user/addresses" element={<UserAddressesPage />} />
        <Route path="user/profile" element={<UserProfilePage />} />

        <Route path="cart" element={<CartPage />} />

        <Route path="auth/login" element={<LoginPage />} />
        <Route path="auth/register" element={<RegisterPage />} />

      </Route>




      {/* Page Not Found */}
      <Route path="*" element={<PageNotFound />} />
    </>,
  ),
);

export default router;
