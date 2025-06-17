import { Http } from "@Http";

export const ServiceCreateCollaborator = async ({ name, email, entryDate }) => {
  try {
    const resp = await Http(
      {
        name_collaborator: name,
        email_collaborator: email,
        entry_date: entryDate,
      },
      {
        base: "collaborator",
        entry: "create",
        method: "POST",
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
