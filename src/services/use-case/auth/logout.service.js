import { Http } from "@Http";

export const ServiceLogout = async () => {
  try {
    const resp = await Http(
      {},
      { base: "auth", entry: "logout", method: "POST", isLogout: true }
    );
    return {
      status: resp.status,
      message: resp.message,
      data: resp.data,
    };
  } catch (error) {
    throw error.response.data;
  }
};
