const API_URL = "https://emkc.org/api/v2/piston/execute";

const LANG_VERSIONS = {
  javascript: "18.15.0",
  typescript: "5.0.3",
  python: "3.10.0",
};

export const executeCode = async (language, sourceCode) => {
  const data = {
    language: language,
    version: LANG_VERSIONS[language],
    files: [
      {
        content: sourceCode,
      },
    ],
  };
  const response = await fetch(API_URL, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });
  return await response.json();
};