import logo from './logo.svg';
import './App.css';
import { store } from './actions/store';
import { Provider } from 'react-redux';
import DCandidateForm from './components/DCandidateForm';
import DCandidates from './components/DCandidates';
import { Container } from '@mui/material';
import { ToastContainer } from "react-toastify"
import 'react-toastify/dist/ReactToastify.css';



function App() {
  return (
    <Provider store={store}>
            <Container maxWidth="lg">
              <DCandidates />
            </Container>
            <ToastContainer autoClose={3000} position='top-right'/>
    </Provider>
  );
}

export default App;
