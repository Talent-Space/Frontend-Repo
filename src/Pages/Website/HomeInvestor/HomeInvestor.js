import { useEffect, useState } from "react";
import HomePage from "../HomePage/HomePage";
import styles from "./homeinvestor.module.css";
import { USERS } from "../../../Api/Api";
import { Axios } from "../../../Api/Axios";

export default function HomeInvestor() {
  const [bestTalents, setBestTalents] = useState([]);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        await Axios.get(`${USERS}`).then((res) => setBestTalents(res.data))
      } catch (error) {
        console.log(error.message);
      }
    }
    fetchUsers();
  }, [])

  // console.log(bestTalents)

  return (
    <>
      <HomePage bestTalents={bestTalents} />
    </>
  );
}
