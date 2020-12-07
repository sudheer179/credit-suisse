import { Box, Container } from "@material-ui/core";
import { BrowserRouter as Router, Route, Switch, } from "react-router-dom";
import Login from './login';
import SignUp from './sign-up';
import Users from './users';
import './App.css';

function App() {
  return (
    <Box height="100%">
      <Container maxWidth="xl">
        <Router>
          <Switch>
            <Route path="/sign-up" component={SignUp} />
            <Route path="/login" component={Login} />
            <Route path="/" component={Users} />
          </Switch>
        </Router>
      </Container>
    </Box>
  );
}

export default App;
