export const getMarkdown = async (path) => {
  const response = await fetch(path);
  const text = await response.text();
  return text;
};
