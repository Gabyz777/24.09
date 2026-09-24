import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import MovieDetails from './pages/MovieDetails';
import Favorites from './pages/Favorites';
import Navbar from './components/Navbar';
import styles from './App.module.css';

function App() {
    return (
        <BrowserRouter>
            <Navbar />
            <div className={styles.container}>
                <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/filme/:id" element={<MovieDetails />} />
                    <Route path="/favoritos" element={<Favorites />} />
                </Routes>
            </div>
        </BrowserRouter>
    );
}

export default App;
