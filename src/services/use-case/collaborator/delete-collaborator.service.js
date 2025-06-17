import { Http } from "@Http";

export const ServiceDeleteCollaborator = async ({ id }) => {
  try {
    const resp = await Http(
      {},
      {
        base: "collaborator",
        entry: "delete",
        method: "DELETE",
        id: `/${id}`,
      }
    );
    return {
      status: resp.status,
      message: resp.message,
    };
  } catch (error) {
    throw error.response.data;
  }
};
