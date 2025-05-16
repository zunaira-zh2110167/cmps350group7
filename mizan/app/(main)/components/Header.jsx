import styles from "./Header.module.css";
import { getCurrentUser } from "@/app/actions/auth";
import ClientNavLinks from "./ClientNavLinks";

export default async function Header() {
  const user = await getCurrentUser();
  return (
    <header className={styles.header}>
      <div className={styles.brandLogo}>Mizān</div>
      <ClientNavLinks user={user} />
    </header>
  );
}
