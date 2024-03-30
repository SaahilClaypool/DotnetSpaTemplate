import { Api } from "./generated/Api";

export function navigateToLogin() {
  window.location.assign(`/login?returnUrl=${window.location.href}`);
}
export const GatewayApi = new Api({
  customFetch: async (input, init) => {
    // This is inspired by Kent C. Dodds' custom fetch wrapper:
    // https://kentcdodds.com/blog/replace-axios-with-a-simple-custom-fetch-wrapper

    const apiUrl = "";
    const url = `${apiUrl}${input}`;
    const configHeader = localStorage.getItem("overrideConfig") ?? "true";

    const response = await window.fetch(url, {
      ...init,
      headers: {
        ...init?.headers,
        "override-config": configHeader,
      },
    });

    if (response.status === 401) {
      navigateToLogin();
      return response;
    }

    if (response.status === 403) {
      alert("403");
    }

    if (!response.ok) {
      console.log(response);
      return Promise.reject(response);
    }

    return response;
  },
});
