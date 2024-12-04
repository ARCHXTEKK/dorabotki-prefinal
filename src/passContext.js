import { useRouteNavigator } from "@vkontakte/vk-mini-apps-router";
import React, { createContext, useEffect } from "react";
import { useStore } from "./hooks/useStore";

const PassContext = createContext("");

/**
 * возвращает на главную страницу если нет доступа
 */

export default function PassContextProvider({ children }) {
  const routeNavigator = useRouteNavigator();
  const { state } = useStore();

  useEffect(() => {
    if (!state.pass) {
      routeNavigator.replace("/");
    }
  }, [state.pass]);

  return <PassContext.Provider>{children}</PassContext.Provider>;
}
