import ENDPOINT__URLS from "../constants/endpoints";

const AuthService = {
  async login(userToLogin) {
    return await fetch(ENDPOINT__URLS.LOGIN, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(userToLogin),
    }).then(async (response) => {
      const requestResult = await response.json();

      if (requestResult.statusCode === 200) return requestResult.jwtToken;
      else throw new Error("error");
    });
  },

  async register(userToRegister) {
    return await fetch(ENDPOINT__URLS.REGISTER, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        ...userToRegister,
      }),
    }).then(async (response) => {
      const requestResult = await response.json();

      if (requestResult.statusCode === 200) return;
      else throw new Error("error");
    });
  },
};

export default AuthService;
