import CategoriesData from "../CategoriesData/CategoriesData";

export default function Photography() {
  return (
    <>
      <div className="p-4">
        <h1>Photography</h1>
        <hr />
        <CategoriesData catType={"Photography"} />
      </div>
    </>
  );
}
