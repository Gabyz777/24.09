import { useEffect, useState } from 'react';
import tmdbApi from '../api/tmdb.js';
import MovieCard from '../components/MovieCard.jsx';
import useFavorites from '../hooks/useFavorites.js';
import styles from './Home.module.css';

const GENRES = [
    { id: 'popular', name: 'Populares', endpoint: '/movie/popular' },
    { id: '28', name: 'Ação', endpoint: '/discover/movie', params: { with_genres: 28 } },
    { id: '35', name: 'Comédia', endpoint: '/discover/movie', params: { with_genres: 35 } },
    { id: '18', name: 'Drama', endpoint: '/discover/movie', params: { with_genres: 18 } },
    { id: '10749', name: 'Romance', endpoint: '/discover/movie', params: { with_genres: 10749 } },
    {
        id: '878',
        name: 'Ficção Científica',
        endpoint: '/discover/movie',
        params: { with_genres: 878 },
    },
    {
        id: '10751',
        name: 'Infantil',
        endpoint: '/discover/movie',
        params: { with_genres: '16,10751' },
    },
];

export default function Home() {
    const [movies, setMovies] = useState([]);
    const [loading, setLoading] = useState(true);
    const [activeTab, setActiveTab] = useState(GENRES[0]);
    const [page, setPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);

    const { isFavorite, toggleFavorite } = useFavorites();

    const handleTabChange = (genre) => {
        if (genre.id !== activeTab.id) {
            setActiveTab(genre);
            setPage(1);
        }
    };

    const handlePageChange = (newPage) => {
        setPage(newPage);
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    useEffect(() => {
        const fetchMovies = async () => {
            setLoading(true);
            try {
                const response = await tmdbApi.get(activeTab.endpoint, {
                    params: {
                        ...activeTab.params,
                        page: page,
                    },
                });
                setMovies(response.data.results);
                setTotalPages(response.data.total_pages || 1);
            } catch (error) {
                console.error('Erro ao buscar filmes', error);
            } finally {
                setLoading(false);
            }
        };

        fetchMovies();
    }, [activeTab, page]);

    return (
        <div className={styles.homePage}>
            <div className={styles.tabsContainer}>
                {GENRES.map((genre) => (
                    <button
                        key={genre.id}
                        className={`${styles.tabBtn} ${activeTab.id === genre.id ? styles.active : ''}`}
                        onClick={() => handleTabChange(genre)}>
                        {genre.name}
                    </button>
                ))}
            </div>

            <h1 className={styles.title}>Categoria: {activeTab.name}</h1>

            {loading ? (
                <p className={styles.loadingText}>A carregar filmes...</p>
            ) : (
                <>
                    <div className={styles.grid}>
                        {movies.map((movie) => (
                            <MovieCard
                                key={movie.id}
                                movie={movie}
                                isFavorite={isFavorite(movie.id)}
                                onToggleFavorite={toggleFavorite}
                            />
                        ))}
                    </div>

                    <div className={styles.paginationContainer}>
                        <button
                            className={styles.pageBtn}
                            onClick={() => handlePageChange(page - 1)}
                            disabled={page === 1}>
                            ←
                        </button>

                        <span className={styles.pageInfo}>Página {page}</span>

                        <button
                            className={styles.pageBtn}
                            onClick={() => handlePageChange(page + 1)}
                            disabled={page >= totalPages}>
                            →
                        </button>
                    </div>
                </>
            )}
        </div>
    );
}
