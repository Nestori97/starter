import { redirectTo } from "./addressController.js";
import * as itemServices from "../services/itemServices.js";
const addItem = async (request) => {
    const url = new URL(request.url);
    const urlParts = url.pathname.split("/");
    const formData = await request.formData();
    const name = formData.get("name");
  
    await itemServices.createItemToList(urlParts[2], name);
  
    return redirectTo("/lists/"+ urlParts[2]);
  };
  const markAsCollected = async (request) => {
    const url = new URL(request.url);
    const urlParts = url.pathname.split("/");
    await itemServices.collect(urlParts[4]);
    return redirectTo("/lists/"+ urlParts[2]);
  }
  export { addItem, markAsCollected};