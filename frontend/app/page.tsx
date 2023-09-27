import Image from "next/image";
import styles from "./page.module.css";
import { TestComponent } from "./components/TestComponent";

export default function Home() {
  return <main className={styles.main}><TestComponent numberOne={20} numberTwo={30} /></main>;
}
