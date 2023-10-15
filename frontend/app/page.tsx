"use client"
import styles from "./page.module.css";
import FilmsHorseApp from "./components/FilmsHorseApp";
import {
  QueryClient,
  QueryClientProvider,
} from '@tanstack/react-query'
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'

const queryClient = new QueryClient();

export default function Home() {
  return (
    <main className={styles.main}>
      <QueryClientProvider client={queryClient}>
        <FilmsHorseApp />
        <ReactQueryDevtools initialIsOpen={false} />
      </QueryClientProvider>
    </main>
  );
}
