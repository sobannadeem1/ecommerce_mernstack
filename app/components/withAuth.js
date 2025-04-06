import { getUser } from "@/reducers/userreducer";
import { usePathname } from "next/navigation";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

const withAuth = (WrappedComponent) => {
  const Auth = (props) => {
    const pathname = usePathname();
    const dispatch = useDispatch();
    const { user, loading } = useSelector((state) => state.user);

    const userId =
      typeof window !== "undefined" ? localStorage.getItem("token") : null;

    useEffect(() => {
      if (userId && !user) {
        dispatch(getUser(userId));
      }
    }, [userId, user, dispatch]);

    useEffect(() => {
      if (
        user &&
        user.role !== "admin" &&
        !loading &&
        (pathname.includes("/addcategory") || pathname.includes("/addproduct"))
      ) {
        window.location.href = "/";
      }
    }, [pathname, user, loading]);

    return <WrappedComponent {...props} />;
  };

  return Auth;
};

export default withAuth;
