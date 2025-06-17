import { Http } from "@Http";

export const ServiceSignIn = async (creds) => {
  try {
    const resp = await Http(
      { user_email: creds.email, user_password: creds.password },
      { base: "auth", entry: "signIn", method: "POST" }
    );
    const user = resp.data;
    return {
      message: resp.message,
      status: resp.status,
      data: {
        user: {
          user_id: user.user.user_id,
          user_name: user.user.user_name,
          user_email: user.user.user_email,
        },
        tokens: {
          token: user.accessToken,
          refresh_token: user.refreshToken,
        },
      },
    };
  } catch (error) {
    throw error.response.data;
  }
};
