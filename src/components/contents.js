import React, { Component } from 'react';

import MovieCard from '../components/movieCard.js';
import Loading from '../components/loading.js';

import { lazyLoad } from '../util/lazyLoading.js';

class Contents extends Component {
    goHome() {
        window.location.href = '/';
    }

    scrollUp() {
        window.scrollTo(0,0);
    }

    render() {
        if(!this.props.data) {
            return (
                <article className="movie-content">
                    <div className="movie-items">
                        <Loading></Loading>
                    </div>
                </article>
            );
        }

        if(this.props.data.length > 0) {
            return (
                <article className="movie-content">
                    <div className="movie-items">
                        {this.props.data.map((item, index) => {
                            return <MovieCard
                            key={index}
                            item={item}
                            ></MovieCard>
                        })}
                        <p className="up-btn" onClick={this.scrollUp}>
                            <span role="img" aria-label="up">☝</span> 위로가기
                        </p>
                        <Loading></Loading>
                    </div>
                </article>
            );
        } else {
            return (
                <article className="movie-content">
                    <div className="movie-items">
                        <div className="notice">
                            <h2 className="fail-message">영화 API를 불러오는데 실패했습니다.</h2>
                            <p className="refresh-page" onClick={(this.goHome)}>새로고침</p>
                        </div>
                        <Loading></Loading>
                    </div>
                </article>
            );
        }      
    }
}

export default Contents;