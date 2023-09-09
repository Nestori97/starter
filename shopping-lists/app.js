import { serve } from "./deps.js";
import { redirectTo } from "./controllers/addressController.js";
import { addTask, viewLists } from "./controllers/listControllers.js";

const handleRequest = async (request) => {
  const url = new URL(request.url);
  if (url.pathname === "/" && request.method === "GET") {
    return redirectTo("lists");
  }
  else if (url.pathname === "/lists" && request.method === "GET") {
    return await viewLists(request);
  }
  else if (url.pathname === "/lists" && request.method === "POST") {
    return await addTask(request);
  }
  else{
  return new Response("jotain meni vituiksi!");
  }
};

serve(handleRequest, { port: 7778 });
