import { Handler } from "@netlify/functions";

const status: Handler = async (event, context) => {
  return {
    statusCode: 200,
    body: JSON.stringify({ message: "hello worlds" }),
  };
};

export { status };
