// composables/makeFetch.ts

export default () => {
  const baseURL: string = process.env.API_URL || "http://localhost:3000";

  const request = async (
    url: string,
    options: RequestInit = {}
  ): Promise<Response> => {
    // Construct the full URL
    const fullUrl = new URL(baseURL + url).toString();
    // console.log("..::BaseFull URL::..", fullUrl);
    // Add Authorization header
    const headers = new Headers(options.headers);
    headers.append("Authorization", `Bearer ${process.env.API_TOKEN}`);
    headers.append("Content-Type", "application/x-www-form-urlencoded");

    // Update options with headers
    options.headers = headers;

    // console.log("..::Starting Request::..", { url: fullUrl, options });

    try {
      const response = await fetch(fullUrl, options);

      // console.log("..::Response::..", response);

      // Check for HTTP errors
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      return response;
    } catch (error) {
      // console.error("..::ERROR::..", error);
      throw error;
    }
  };

  return { request };
};
