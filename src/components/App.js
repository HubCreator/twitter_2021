import { useState } from "react";
import AppRouter from "components/Router";
import {authService} from "my_firebase"

function App() {
  
  const [isLoggedIn, setIsLoggedIn] = useState(authService.currentUser);

  return <AppRouter isLoggedIn={isLoggedIn} />;
}

export default App;
