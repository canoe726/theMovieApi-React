import React, { Component } from 'react';

class MovieCard extends Component {
    goMovieDetailPage(movieId) {
        console.log('move detail page : ', movieId)
        window.history.pushState({movie: movieId}, "movie id", `movies/${movieId}`);
        window.history.go(0);
    }

    render() {
        return (
            <div className="movie-item">
                <h2 className='title'>{this.props.item.title}</h2>
                <div className="movie-card" onClick={this.goMovieDetailPage.bind(this, this.props.item.id)}>
                    <div className="left-block">
                    <img className="lazy" data-src={this.props.item.medium_cover_image} alt="movie poster"></img>
                    </div>
                    <div className="right-block">
                        <p className="year">개봉년도 : {this.props.item.year}</p>
                        <p className="runtime">러닝타임 : {this.props.item.runtime}</p>
                        <p className="genres">장르 : {this.props.item.genres}</p>
                        <p className="rating">영화 평점 : {this.props.item.rating}</p>
                        <p className="desc">줄거리 요약 : {this.props.item.summary}</p>
                    </div>
                </div>
            </div>
        );
    }
}

export default MovieCard;