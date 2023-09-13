import { serve } from "./deps.js";
import { redirectTo } from "./controllers/addressController.js";
import * as listControllers from "./controllers/listControllers.js";
import * as itemControllers from "./controllers/itemControllers.js";

const handleRequest = async (request) => {
  const url = new URL(request.url);
  if (url.pathname === "/" && request.method === "GET") {
    return await listControllers.mainpageFunction(request)
  }
  else if (url.pathname === "/lists" && request.method === "GET") {
    return await listControllers.viewLists(request);
  }
  else if (url.pathname.match("lists/[0-9]+/items/[0-9]+") && request.method === "POST") {
    return await itemControllers.markAsCollected(request);
  }

  else if (url.pathname === "/lists" && request.method === "POST") {
    return await listControllers.addTask(request);
  }
  else if (url.pathname.match("lists/[0-9]+") && request.method === "GET") {
    return await listControllers.viewIndividualList(request);
  }
  else if (url.pathname.match("lists/[0-9]+/deactivate") && request.method === "POST") {
    return await listControllers.deactivateList(request);
  }
  else if (url.pathname.match("lists/[0-9]+/items") && request.method === "POST") {
    return await itemControllers.addItem(request);
  }
  else{
  return new Response("jotain meni vituiksi!");
  }
};

serve(handleRequest, { port: 7778 });
