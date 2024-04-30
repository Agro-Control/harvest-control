import Cookie from "js-cookie";

const useCookie = () => {

  const getCookie = (key: string) => Cookie.get(key);

  const setCookie = (key: string, value: string) =>
    Cookie.set(key, value, {
      expires: 2,
      sameSite: "None",
      secure: true,
    });

  const removeCookie = (key: string) => Cookie.remove(key);

  return { setCookie, getCookie, removeCookie };
};

export default useCookie;