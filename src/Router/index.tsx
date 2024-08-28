import {
  Route,
  createBrowserRouter,
  createRoutesFromElements,
} from "react-router-dom";
import PageNotFound from "../Utils/PageNotFound";
import RootLayout from "../Utils/Layout";
import ErrorHandler from "../Components/errors/ErrorHandler";
// import ProtectedRoute from "../Components/Auth/ProtectedRoute";
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

// const storageKey = "user";
// const userDataString = localStorage.getItem(storageKey);
// const userData = userDataString ? JSON.parse(userDataString) : null;

const router = createBrowserRouter(
  createRoutesFromElements(
    <>
      {/* Root Layout */}
      <Route path="/" element={<RootLayout />} errorElement={<ErrorHandler />}>

        <Route
          index
          element={
            // <ProtectedRoute
            //   isAllowed={userData?.jwt}
            //   redirectPath="/login"
            //   data={userData}
            // >
            <HomePage />
            // </ProtectedRoute>
          }
        />

        <Route
          path="categories"
          element={
            // <ProtectedRoute
            // isAllowed={userData?.jwt}
            // redirectPath="/login"
            // data={userData}
            // >
            <CategoriesPage />
            // </ProtectedRoute>
          }
        />

        <Route
          path="products"
          element={
            // <ProtectedRoute
            // isAllowed={userData?.jwt}
            // redirectPath="/login"
            // data={userData}
            // >
            <ShopProductsPage />
            // </ProtectedRoute>
          }
        />

        <Route
          path="product-details/:id"
          element={
            // <ProtectedRoute
            //   isAllowed={userData?.jwt}
            //   redirectPath="/login"
            //   data={userData}
            // >
            <ProductDetailsPage />
            // </ProtectedRoute>
          }
        />

        <Route
          path="brands"
          element={
            // <ProtectedRoute
            // isAllowed={userData?.jwt}
            // redirectPath="/login"
            // data={userData}
            // >
            <BrandsPage />
            // </ProtectedRoute>
          }
        />

        {/* admin routes */}
        <Route
          path="admin/dash-board"
          element={
            // <ProtectedRoute
            // isAllowed={userData?.jwt}
            // redirectPath="/login"
            // data={userData}
            // >
            <DashBoardAdminPage />
            // </ProtectedRoute>
          }
        />

        <Route
          path="admin/products"
          element={
            // <ProtectedRoute
            // isAllowed={userData?.jwt}
            // redirectPath="/login"
            // data={userData}
            // >
            <AdminProductsPage />
            // </ProtectedRoute>
          }
        />

        <Route
          path="admin/categories"
          element={
            // <ProtectedRoute
            // isAllowed={userData?.jwt}
            // redirectPath="/login"
            // data={userData}
            // >
            <AdminCategoriesPage />
            // </ProtectedRoute>
          }
        />

        <Route
          path="admin/subcategories"
          element={
            // <ProtectedRoute
            // isAllowed={userData?.jwt}
            // redirectPath="/login"
            // data={userData}
            // >
            <AdminSubCategoriesPage />
            // </ProtectedRoute>
          }
        />

        <Route
          path="admin/brands"
          element={
            // <ProtectedRoute
            // isAllowed={userData?.jwt}
            // redirectPath="/login"
            // data={userData}
            // >
            <AdminBrandsPage />
            // </ProtectedRoute>
          }
        />

        <Route
          path="admin/coupons"
          element={
            // <ProtectedRoute
            // isAllowed={userData?.jwt}
            // redirectPath="/login"
            // data={userData}
            // >
            <AdminCouponsPage />
            // </ProtectedRoute>
          }
        />

        {/* user routes */}
        <Route
          path="user/orders"
          element={
            // <ProtectedRoute
            // isAllowed={userData?.jwt}
            // redirectPath="/login"
            // data={userData}
            // >
            <UserOrdersPage />
            // </ProtectedRoute>
          }
        />

        <Route
          path="user/wish-list"
          element={
            // <ProtectedRoute
            // isAllowed={userData?.jwt}
            // redirectPath="/login"
            // data={userData}
            // >
            <UserWishListPage />
            // </ProtectedRoute>
          }
        />

        <Route
          path="user/addresses"
          element={
            // <ProtectedRoute
            // isAllowed={userData?.jwt}
            // redirectPath="/login"
            // data={userData}
            // >
            <UserAddressesPage />
            // </ProtectedRoute>
          }
        />

        <Route
          path="user/profile"
          element={
            // <ProtectedRoute
            // isAllowed={userData?.jwt}
            // redirectPath="/login"
            // data={userData}
            // >
            <UserProfilePage />
            // </ProtectedRoute>
          }
        />

      </Route>




      {/* Page Not Found */}
      <Route path="*" element={<PageNotFound />} />
    </>,
  ),
);

export default router;
