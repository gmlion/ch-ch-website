import generateGeneralPublications from "../generate/generalPublications";
import generateMenuRoutes from "../generate/menuEntries";

export default async (): Promise<string[]> => {
  //const menuRoutes = await generateMenuRoutes();
  const generalPublications = await generateGeneralPublications();
  //console.log("menuRoutes", menuRoutes);
  return [...generalPublications];
};
