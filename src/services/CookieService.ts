/* eslint-disable @typescript-eslint/no-explicit-any */
import base64url from "base64url";

import Cookies from "js-cookie";
import { CookieParams } from "../types/CookieParams";
import { Payload } from "../types/Payload";
import { Roles } from "../constants/Roles";
import { Token } from "../types/Token";

export default class CookieService {
  public SetCookies = (data: Token) => {
    const params: any = {
      secure: true,
      expires: 2,
      sameSite: "lax",
    };

    const parts = data.accessToken.split(".");
    if (parts.length !== 3) {
      throw new Error("INvalid access token");
    }

    const payload = base64url.decode(parts[1]);
    const parsedPayload: Payload = JSON.parse(payload) as Payload;

    Cookies.set(CookieParams.accessToken, data.accessToken, params);
    Cookies.set(CookieParams.refreshToken, data.refreshToken, params);
    if (parsedPayload.role?.includes(Roles.Admin)) {
      Cookies.set(
        CookieParams.role,
        parsedPayload.role?.includes(Roles.Admin) ? Roles.Admin : "",
        params
      );
    }
    if (parsedPayload.role?.includes(Roles.Supervisor)) {
      Cookies.set(
        CookieParams.role,
        parsedPayload.role?.includes(Roles.Supervisor) ? Roles.Supervisor : "",
        params
      );
    }
    if (parsedPayload.role?.includes(Roles.Worker)) {
      Cookies.set(
        CookieParams.role,
        parsedPayload.role?.includes(Roles.Worker) ? Roles.Worker : "",
        params
      );
    }

    return;
  };

  public clearCookies() {
    Object.keys(CookieParams).map((e) => Cookies.remove(e));
    return;
  }

  public accessToken = () => Cookies.get(CookieParams.accessToken);
  public refreshToken = () => Cookies.get(CookieParams.refreshToken);
}
