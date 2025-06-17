export const isMac = () => {
  if (navigator.userAgentData) {
    return navigator.userAgentData.platform.toUpperCase().includes("MAC");
  }
  return navigator.userAgent.toUpperCase().includes("MAC");
};
