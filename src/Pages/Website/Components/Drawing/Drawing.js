import CategoriesData from "../CategoriesData/CategoriesData";

export default function Drawing() {
  return (
    <>
      <div className="p-4">
        <h1>Drawing</h1>
        <hr />
        <CategoriesData catType={"Drawing"} />
      </div>
    </>
  );
}
