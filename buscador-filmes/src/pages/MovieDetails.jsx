import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import tmdbApi from '../api/tmdb.js';
import styles from './MovieDetails.module.css';

export default function MovieDetails() {
    const { id } = useParams();
    const [movie, setMovie] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchDetails = async () => {
            setLoading(true);
            try {
                const response = await tmdbApi.get(`/movie/${id}`);
                setMovie(response.data);
            } catch (error) {
                console.error('Erro ao buscar detalhes do filme', error);
            } finally {
                setLoading(false);
            }
        };

        fetchDetails();
    }, [id]);

    if (loading) return <p className={styles.loadingText}>A carregar dados do filme...</p>;
    if (!movie) return <p className={styles.loadingText}>Filme não encontrado.</p>;

    const posterUrl = movie.poster_path
        ? `https://image.tmdb.org/t/p/w500${movie.poster_path}`
        : 'https://via.placeholder.com/500x750?text=Sem+Imagem';
    const backdropUrl = movie.backdrop_path
        ? `https://image.tmdb.org/t/p/original${movie.backdrop_path}`
        : null;

    const voteAverage = movie.vote_average ? movie.vote_average.toFixed(1) : 'N/A';
    const releaseDate = movie.release_date || 'N/A';
    const genres = movie.genres ? movie.genres.map((g) => g.name).join(', ') : 'N/A';

    return (
        <div className={styles.wrapper}>
            <div className={styles.container}>
                <Link to="/" className={styles.backLink}>
                    &larr; Voltar para o Catálogo
                </Link>

                <div className={styles.content}>
                    <div className={styles.imagesContainer}>
                        <img src={posterUrl} alt={movie.title} className={styles.flag} />

                        {backdropUrl && (
                            <div>
                                <h4 className={styles.coatTitle}>Fundo de Ecrã (Backdrop)</h4>
                                <img
                                    src={backdropUrl}
                                    alt={`Backdrop de ${movie.title}`}
                                    className={styles.coatImage}
                                />
                            </div>
                        )}
                    </div>

                    <div className={styles.infoContainer}>
                        <h1 className={styles.countryName}>{movie.title}</h1>
                        <p className={styles.officialName}>{movie.original_title}</p>

                        <div className={styles.badges}>
                            <span className={styles.regionBadge}>⭐ {voteAverage} / 10</span>
                            <span className={styles.capitalBadge}>📅 {releaseDate}</span>
                        </div>

                        <div className={styles.detailsList}>
                            <div className={styles.detailItem}>
                                <strong className={styles.detailLabel}>🎭 Géneros:</strong>{' '}
                                <span className={styles.detailValue}>{genres}</span>
                            </div>
                            <div className={styles.detailItem}>
                                <strong className={styles.detailLabel}>⏱️ Duração:</strong>{' '}
                                <span className={styles.detailValue}>{movie.runtime} minutos</span>
                            </div>
                            <div className={styles.detailItem}>
                                <strong className={styles.detailLabel}>📝 Sinopse:</strong>{' '}
                                <span className={styles.detailValue}>
                                    {movie.overview || 'Sinopse indisponível.'}
                                </span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
