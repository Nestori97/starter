import { sql } from "../database/database.js";

const createItemToList = async (shopping_list_id ,name) => {
  await sql`INSERT INTO
  shopping_list_items  (shopping_list_id , name)
    VALUES (${shopping_list_id }, ${name} )`;
};

const findShoppingListItems = async (shopping_list_id ) => {
  const rows = await sql`SELECT * FROM shopping_list_items 
    WHERE shopping_list_id  = ${ shopping_list_id  }  ORDER BY name; `;
    console.log(rows[0])
  if (rows && rows.length > 0) {

    return rows;
  }
  return false;
};
const collect = async(id) => {
  await sql`UPDATE shopping_list_items SET collected = true WHERE id = ${ id }`;
}
const findcOLLECTEDShoppingListItems = async (shopping_list_id ) => {
  const rows = await sql`SELECT * FROM shopping_list_items 
    WHERE shopping_list_id  = ${ shopping_list_id  } AND collected=TRUE  ORDER BY name; `;
  if (rows && rows.length > 0) {

    return rows;
  }
  return false;
};
const findAllItems = async() => {
  const results= await sql`SELECT * FROM shopping_list_items`;
  if (results && results.length > 0) {

    return results;
  }
  return false;
}

export { createItemToList, findShoppingListItems, collect, findcOLLECTEDShoppingListItems, findAllItems };