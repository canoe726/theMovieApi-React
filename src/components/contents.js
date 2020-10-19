import React, { Component } from 'react';

import MovieCard from '../components/movieCard.js';
import Loading from '../components/loading.js';

import { lazyLoad } from '../util/lazyLoading.js';

class Contents extends Component {
    initImageComponent() {
        const movieItems = document.querySelectorAll('.movie-item');
        movieItems.forEach(item => {
            const img = item.querySelector('img');
            img.classList.add('lazy');
            img.removeAttribute('src');
        });
    }

    componentDidMount() {
        this.initImageComponent();
        lazyLoad();
    }

    componentDidUpdate() {
        this.initImageComponent();
        lazyLoad();
    }

    goHome() {
        window.location.href = '/';
    }

    scrollUp() {
        window.scrollTo(0,0);
    }

    render() {
        let contents = '';
        let upBtn = '';
        if(!this.props.data) {
            contents = '';
        } else {
            if(this.props.data.length > 0) {
                contents = 
                this.props.data.map((item, index) => {
                    return (
                        <MovieCard
                        key={index}
                        item={item}
                        ></MovieCard>
                    );
                });

                upBtn = 
                <p className="up-btn" onClick={this.scrollUp}>
                    <span role="img" aria-label="up">☝</span> 위로가기
                </p>;
            } else {
                contents = 
                <div className="notice">
                    <h2 className="fail-message">영화 API를 불러오는데 실패했습니다.</h2>
                    <p className="refresh-page" onClick={(this.goHome)}>새로고침</p>
                </div>;
            }
        }

        return (
            <article className="movie-content">
                {contents}
                {upBtn}
                <Loading></Loading>
            </article>
        ); 
    }
}

export default Contents;