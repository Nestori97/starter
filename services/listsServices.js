import { sql} from "../database/database.js";
const create = async (name) => {
    await sql `INSERT INTO shopping_lists (name) VALUES (${ name })`;
  };
  const findAllActiveLists = async () => {
    const results=await sql`SELECT * FROM shopping_lists WHERE active = true`;
    console.log(results)
    return results;
  };
  const findById = async (id) => {
    const rows = await sql`SELECT * FROM shopping_lists WHERE id = ${ id }`;
  
    if (rows && rows.length > 0) {
      return rows[0];
    }
  
    return { id: 0, name: "Unknown" };
  };
  const deactivateList = async (id) =>{
    await sql`UPDATE shopping_lists SET active = false WHERE id = ${ id }`;
  }
  const finadAllLists = async() =>  {
    const results=await sql`SELECT * FROM shopping_lists `;
    if (results && results.length > 0) {

      return results;
    }
    return false;
  }
  export {create, findAllActiveLists, findById, deactivateList, finadAllLists};