import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import HomePage from "./HomePage";
import About from "./About";
import Authorize from "./Authorize";
import AuthorizeOnPatient from "./Authorize/AuthorizeOnPatient";
import Doctors from "./Doctors";
import Patients from "./Patients";
import ViewPatient from "./Patients/ViewPatient";
import MessagePatient from "./Patients/MessagePatient";
import BookAppointment from "./Doctors/BookAppointment";
import "./App.css";

function App() {
  return (
    <Router>
      <Switch>
        <Route exact path="/" component={HomePage} />
        <Route exact path="/about" component={About} />
        <Route exact path="/authorize" component={Authorize} />
        <Route exact path="/patient/authorize" component={AuthorizeOnPatient} />
        <Route exact path="/search-doctors" component={Doctors} />
        <Route exact path="/search-patients" component={Patients} />
        <Route exact path="/view-patient" component={ViewPatient} />
        <Route exact path="/message-patient" component={MessagePatient} />
        <Route exact path="/book-appointment" component={BookAppointment} />
      </Switch>
    </Router>
  );
}

export default App;
