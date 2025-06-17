import { Http } from "@Http";

export const ServiceCreateAccount = async (data) => {
  try {
    const resp = await Http(
      {
        user_email: data.email,
        user_password: data.password,
        user_name: data.fullName,
      },
      { base: "auth", entry: "signUp", method: "POST" }
    );
    return {
      status: resp.status,
      message: resp.message,
    };
  } catch (error) {
    throw error.response.data;
  }
};
