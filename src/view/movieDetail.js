import React, { Component } from 'react';
import Loading, { toggleLoading } from '../components/loading.js';

import { api } from '../api/movieApi.js'

class MovieDetail extends Component {
    constructor(props) {
        debugger
        super(props);
        this.state = {item: null}
    }

    async getMovieDataById(movieId) {
        const response = await api.getMovieById(movieId);
        if(!response.isError) {
            const data = response.data.data.movie;
            this.setState({item: data});
        } else {
            console.log('error');
        }
    }

    componentDidMount() {
        if(!this.state.item) {
            toggleLoading();
        }

        const urls = window.location.href.split('/');
        const movieId = urls[4];
        this.getMovieDataById(movieId);
    }

    goHome() {
        window.location.href = '/';
    }

    goMoviePage() {
        window.open(this.state.item.url, '_blank');
    }

    render() {
        let body;
        if(!this.state.item) {
            body = <Loading></Loading>;
        } else {
            body = 
            <div className="detail-wrapper">
                <div className="movie-item">
                    <h2 className="title">{this.state.item.title}</h2>
                    <div className="movie-wrapper">
                        <div className="left-block">
                            <img src={this.state.item.medium_cover_image} alt="movie poster" onClick={this.goMoviePage.bind(this)}></img>
                        </div>
                        <div className="right-block">
                            <p className="year">개봉년도 : {this.state.item.year}</p>
                            <p className="runtime">러닝타임 : {this.state.item.runtime}</p>
                            <p className="genres">장르 : {this.state.item.genres}</p>
                            <p className="rating">영화 평점 : {this.state.item.rating}</p>
                            <p className="desc">줄거리 요약 : {this.state.item.description_intro}</p>
                            <p className="go-home" onClick={this.goHome}>돌아가기</p>
                        </div>
                    </div>
                </div>
            </div>;
        }

        return (
            body
        );
    }
}

export default MovieDetail;