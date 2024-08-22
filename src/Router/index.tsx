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

      </Route>

      {/* Page Not Found */}
      <Route path="*" element={<PageNotFound />} />
    </>,
  ),
);

export default router;
