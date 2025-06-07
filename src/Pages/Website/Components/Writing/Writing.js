import CategoriesData from "../CategoriesData/CategoriesData";

export default function Writing() {
  return (
    <>
      <div className="p-4">
        <h1>Writing</h1>
        <hr />
        <CategoriesData catType={"Writing"} />
      </div>
    </>
  );
}
