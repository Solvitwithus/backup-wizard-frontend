import axios, { AxiosError } from "axios";

type Payload = {
  fullName: string;
  email: string;
  username: string;
  password: string;
  confirmPassword: string;
};

export function AuthenticationLogic() {
  const url = process.env.NEXT_PUBLIC_API_URL;

  function axiosErr(err: unknown) {
    if (err instanceof AxiosError) {
      return {
        data: err.response?.data,
        status: err.response?.status,
      };
    }
    return { data: null, status: undefined };
  }

  async function signup(payload: Payload) {
    try {
      const res = await axios.post(`${url}/signup`, payload, {
        headers: { "Content-Type": "application/json" },
      });
      return { data: res.data, error: null };
    } catch (err) {
      return { data: null, error: axiosErr(err) };
    }
  }

  async function login(payload: Pick<Payload, "email" | "password">) {
    try {
      // 1. Hit your Rust backend
      const res = await axios.post(`${url}/login`, payload, {
        headers: { "Content-Type": "application/json" },
      });

      const token: string = res.data.token;

      // 2. Pass the token to Next.js API route to store it in an httpOnly cookie
      await axios.post("/api/login", { token });

      return { data: res.data, error: null };
    } catch (err) {
      return { data: null, error: axiosErr(err) };
    }
  }

  async function getToken() {
    try {
      const res = await axios.get("/api/getCookie");
      return res.data.token as string | undefined;
    } catch {
      return undefined;
    }
  }

  return { signup, login, getToken };
}