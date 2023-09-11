"use client"
import { conlog, getAuth } from "@/components/cookieSetter";
import { useEffect, useState } from "react";
import { getAuthEnv } from "../actions/actions";
import { fetchEjecutados } from "../actions/budget-actions";
import ReduxProvider from "@/components/provider";
import Cookies from 'js-cookie';

const Layout =({ index, login }) => {
  const isLoggedIn = Cookies.get('access_token');

  return isLoggedIn? index : login;
};

export default Layout;
