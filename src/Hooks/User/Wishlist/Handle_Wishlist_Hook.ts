import { MouseEvent, useCallback, useEffect, useState } from "react";
import { useGetLoggedUserQuery } from "../../../Redux/RTK Query/logged_users_slice";
import { useAddToWishlistMutation, useDeleteWishlistMutation } from "../../../Redux/RTK Query/wishlist_slice";
import Notify from "../../../Utils/UseNotifaction";

function HandleWishlistHook(productId: string | undefined) {
  const [addToWishlist, { isSuccess: isAddSuccess, error: addError }] = useAddToWishlistMutation();
  const [deleteWishlist, { isSuccess: isDeleteSuccess, error: deleteError }] = useDeleteWishlistMutation();
  const { data: userData } = useGetLoggedUserQuery();

  const [isWishlist, setIsWishlist] = useState(false);

  // Check if the product is in the wishlist
  useEffect(() => {
    if (userData?.data?.wishlist?.some((item) => item === productId)) {
      setIsWishlist(true);
    }
  }, [productId, userData?.data?.wishlist]);

  // Handle notifications after adding to wishlist
  useEffect(() => {
    if (isAddSuccess) {
      Notify({ msg: "Added to wishlist successfully", type: "success" });
    } else if (addError) {
      setIsWishlist(false);
      Notify({ msg: "Failed to add to wishlist", type: "error" });
    }
  }, [isAddSuccess, addError]);

  // Handle notifications after removing from wishlist
  useEffect(() => {
    if (isDeleteSuccess) {
      Notify({ msg: "Removed from wishlist successfully", type: "success" });
    } else if (deleteError) {
      Notify({ msg: "Failed to remove from wishlist", type: "error" });
    }
  }, [isDeleteSuccess, deleteError]);

  const addProductToWishlist = useCallback(async (productId: string) => {
    await addToWishlist({ productId });
    setIsWishlist(true);
  },
    [addToWishlist]
  );

  const deleteProductFromWishlist = useCallback(async (productId: string) => {
    await deleteWishlist(productId);
    setIsWishlist(false);
  },
    [deleteWishlist]
  );

  const handleProductToWishlist = useCallback(async (e: MouseEvent<HTMLSpanElement>, productId: string) => {
    e.preventDefault();
    if (!userData?.data) {
      Notify({ msg: "Please log in to manage your wishlist", type: "error" });
      return;
    }
    if (userData?.data.role === 'admin') {
      setIsWishlist(false);
      Notify({ msg: "As an admin, you cannot add products to the wishlist.", type: "error" });
    } else if (isWishlist) {
      await deleteProductFromWishlist(productId);
    } else {
      await addProductToWishlist(productId);
    }
  },
    [isWishlist, deleteProductFromWishlist, addProductToWishlist, userData,]
  );

  return [isWishlist, handleProductToWishlist] as const
}

export default HandleWishlistHook
