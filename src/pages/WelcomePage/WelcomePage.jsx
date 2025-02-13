import React, { useEffect, useState } from "react";

import sadcat from "../../assets/images/sad-cat.png";
import clearlogo from "../../assets/images/clearlogo.png";
import { Div } from "@vkontakte/vkui";
import { useRouteNavigator } from "@vkontakte/vk-mini-apps-router";
import axios from "axios";
import bridge from "@vkontakte/vk-bridge";
import { useStore } from "../../lib/store/useStore";

export default function WelcomePage() {
  const routeNavigator = useRouteNavigator();

  const { state, dispatch } = useStore();

  const handlePass = () => {
    dispatch({ type: "set-pass" });
    routeNavigator.replace("/rubricator");
  };

  const pass = state.pass;

  const [username, setUsername] = useState("Имя пользователя");

  useEffect(() => {
    if (pass) {
      bridge.send("VKWebAppGetLaunchParams").then((r) => {
        axios
          .post("https://lawrs.ru/legal_main/api/count_cases_add/donut", {
            params: {
              user_id: r.vk_user_id,
            },
          })
          .then((r2) => {
            if (r2.results) {
              handlePass();
            }
          })
          .catch((e) => {
            console.log(e);
          });
      });
    }
  }, []);

  useEffect(() => {
    bridge.send("VKWebAppGetUserInfo").then((r) => {
      setUsername(r.first_name);
    });
  }, []);

  return !pass ? (
    <div className="app-wrapper">
      <Div>
        <img src={clearlogo} className="logo-top" />
        <div className="welcome-block">
          <div className="welcome-block-content">
            <img src={sadcat} className="logo-cat" />
            <div className="welcome-title">
              <h2>
                Здравствуйте, <span id="user-name">{username}</span>!
              </h2>
              <h2>К сожалению у Вас нет доступа к данному приложению.</h2>
            </div>
            <div className="welcome-desc">
              <span>
                Энциклопедия судебных актов доступна донам сообщества Мир
                юриспруденции.
              </span>
              <span>
                Для получения доступа вам необходимо оплатить подписку
              </span>
            </div>
            <div className="Welcome-buttons">
              <button
                style={{ marginBottom: "15px", backgroundColor: "#3871e0" }}
                onClick={handlePass}
                className="uibtn"
              >
                Оплатить подписку
              </button>
              <button
                style={{ marginBottom: "15px" }}
                className="uibtn uibtn--outline"
              >
                Чем ещё полезна подписка?
              </button>
              <button
                style={{ marginBottom: "15px" }}
                className="uibtn uibtn--outline"
              >
                Написать в службу поддержки
              </button>
              <button
                style={{ marginBottom: "15px" }}
                className="uibtn uibtn--outline"
              >
                Перейти в сообщество
              </button>
            </div>
          </div>
        </div>
      </Div>
    </div>
  ) : (
    <div className="app-wrapper">
      <div className="center">
        Подождите! Загружаем данные о пользователе...
      </div>
    </div>
  );
}
