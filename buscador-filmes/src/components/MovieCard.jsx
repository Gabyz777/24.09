import { Link } from 'react-router-dom';
import styles from './MovieCard.module.css';

export default function MovieCard({ movie, onToggleFavorite, isFavorite }) {
    const imageUrl = movie.poster_path
        ? `https://image.tmdb.org/t/p/w500${movie.poster_path}`
        : 'https://via.placeholder.com/500x750?text=Sem+Imagem';
    const releaseDate = movie.release_date || 'Data de lançamento desconhecida';

    return (
        <div className={styles['movie-card']}>
            <div className={styles['image-container']}>
                <img src={imageUrl}/>
                <button
                    className={styles['favorite-btn']}
                    onClick={(e) => {
                        e.preventDefault();
                        onToggleFavorite(movie);
                    }}
                    title={isFavorite ? 'Remover dos favoritos' : 'Adicionar aos favoritos'}>
                    {isFavorite ? '★' : '☆'}</button>
                <div className={styles.overlay}>
                  <h3>{movie.title}</h3>
                  <p>{releaseDate}</p>
                  <Link to={`/filme/${movie.id}`} className={styles['details-btn']}>
                    Ver Detalhes
                  </Link>
                </div>
            </div>
        </div>
    );
}
