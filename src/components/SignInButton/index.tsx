import { FiX } from "react-icons/fi";
import { FaGithub } from "react-icons/fa";

import styles from "./styles.module.scss";

export function SignInButton() {
  const isUserLoggedIn = false;

  return isUserLoggedIn ? (
    <button type="button" className={styles.signInButton}>
      <FaGithub color="#04d361" />
      Jones Souza
      <FiX color="#737380" className={styles.closeIcon} />
    </button>
  ) : (
    <button type="button" className={styles.signInButton}>
      <FaGithub color="#eba417" />
      Sign in with github
    </button>
  );
}
