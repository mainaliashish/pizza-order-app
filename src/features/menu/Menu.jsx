import { useLoaderData } from "react-router-dom";
import { getMenu } from "../../services/apiRestaurant";
import MenuItem from "../menu/MenuItem";

function Menu() {
  const menu = useLoaderData();
  // console.log(menu)
  return (
    <ul className="divide-y divide-stone-300 px-2">
      {menu.map((item) => (
        <MenuItem pizza={item} key={item.id} />
      ))}
    </ul>
  );
}

// Define loader function for react router dom
export async function loader() {
  const menu = await getMenu();
  return menu;
}

export default Menu;
