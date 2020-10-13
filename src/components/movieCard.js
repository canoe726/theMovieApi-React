import React, { Component } from 'react';

class MovieCard extends Component {
    constructor(props) {
        super(props);
        this.item = this.props.item;
    }

    render() {
        return (
            <div className="movie-item">
                <h2 className='title'>{this.item.title}</h2>
                <div className="movie-card">
                    <div className="left-block">
                        <img data-src={this.item.medium_cover_image} alt="movie poster"></img>
                    </div>
                    <div className="right-block">
                        <p className="year">개봉년도 : {this.item.year}</p>
                        <p className="runtime">러닝타임 : {this.item.runtime}</p>
                        <p className="genres">장르 : {this.item.genres}</p>
                        <p className="rating">영화 평점 : {this.item.rating}</p>
                        <p className="desc">줄거리 요약 : {this.item.summary}</p>
                    </div>
                </div>
            </div>
        );
    }
}

export default MovieCard;