
import * as listsServices from "../services/listsServices.js";
import { renderFile } from "https://deno.land/x/eta@v2.0.0/mod.ts";
import { redirectTo } from "./addressController.js";
const responseDetails = {
    headers: { "Content-Type": "text/html;charset=UTF-8" },
  };
const addTask = async (request) => {
    const formData = await request.formData();
    const name = formData.get("name");
  
    await listsServices.create(name);
  
    return redirectTo("/lists");
  };
  const viewLists = async(request) =>{
    const data = {
        lists:[ await listsServices.findAllActiveLists(),],
    };
    return new Response(await renderFile("/home/nestori/starter/shopping-lists/views/lists.eta", data), responseDetails);
  };
  export {addTask, viewLists};