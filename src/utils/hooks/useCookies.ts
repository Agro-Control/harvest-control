import Cookie from "js-cookie";

const EXPIRE_TIME = 1;

const useCookie = () => {
  const getCookie = (key: string) => Cookie.get(key);

  const setCookie = (key: string, value: string) =>
    Cookie.set(key, value, {
      expires: EXPIRE_TIME,
      sameSite: "Lax",
      secure: false,
    });

  const removeCookie = (key: string) => Cookie.remove(key);

  return { setCookie, getCookie, removeCookie };
};

export default useCookie;