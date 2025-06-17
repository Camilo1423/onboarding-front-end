import { Http } from "@Http";
export const ServiceSession = async () => {
  try {
    const resp = await Http(
      {},
      { base: "auth", entry: "session", method: "GET" }
    );
    const user = resp.data;
    return {
      message: resp.message,
      status: resp.status,
      data: {
        user_id: user.user_id,
        user_name: user.user_name,
        user_email: user.user_email,
      },
    };
  } catch (error) {
    throw error.response.data;
  }
};
