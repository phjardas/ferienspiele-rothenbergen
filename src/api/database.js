import "firebase/database";
import { useEffect, useState } from "react";
import { useFirebase } from "./firebase";

export function useDatabaseDocument(path) {
  const [state, setState] = useState({ loading: true });
  const firebase = useFirebase();

  useEffect(() => {
    const ref = firebase.database().ref(path);
    ref.on(
      "value",
      (snapshot) =>
        setState({ loading: false, data: snapshot.exists() && snapshot.val() }),
      (error) => setState({ loading: false, error }),
    );
  }, [path]);

  return state;
}
