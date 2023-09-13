
import * as listsServices from "../services/listsServices.js";
import * as itemServices from "../services/itemServices.js";
import { configure, renderFile } from "https://deno.land/x/eta@v2.0.0/mod.ts";
import { redirectTo } from "./addressController.js";
configure({
  views: `${Deno.cwd()}/views/`,
});
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
        lists: await listsServices.findAllActiveLists(),
    };
    return new Response(await renderFile("./lists.eta", data), responseDetails);
  };
  const viewIndividualList = async(request) => {
    const url = new URL(request.url);
    const urlParts = url.pathname.split("/");
    const data = {
      individualList: await listsServices.findById(urlParts[2]),
      items: await  itemServices.findShoppingListItems(urlParts[2]),
      collected: await itemServices.findcOLLECTEDShoppingListItems(urlParts[2]),
    }
    
    return new Response(await renderFile("/individiualList.eta", data), responseDetails);
  }
  const deactivateList = async(request) => {
    const url = new URL(request.url);
    const urlParts = url.pathname.split("/");
    await listsServices.deactivateList(urlParts[2])
    return redirectTo("/lists");
    }
  const mainpageFunction = async(request) =>{
    const howManyItems = await itemServices.findAllItems();
    const howManyLists = await listsServices.finadAllLists();
    const data = {
      lists: howManyLists,
      items: howManyItems,
    };
    return new Response(await renderFile("./mainpage.eta", data), responseDetails);
  }
  export {addTask, viewLists, viewIndividualList, deactivateList,mainpageFunction};