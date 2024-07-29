import { AppProvider } from "./context/AppContext";
import Main from "./layouts/main";
const App = () => {
  return (
    <AppProvider>
      <Main />
    </AppProvider>
  );
};

export default App;
