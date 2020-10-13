import React, { Component } from 'react';

class Header extends Component {    
    goHome() {
        window.location.href = '/';
    }

    render() {
        return (
            <header>
                <h2 className="title" onClick={this.goHome}>
                    <span role="img" aria-label="film">🎬</span> 추천 영화 리스트
                </h2>
                <div className="btn-wrapper">
                    <button className="get-title-btn" onClick={() => this.props.onClick('title')}>
                        <span role="img" aria-label="list">📝</span> 타이틀순
                    </button>
                    <button className="get-rating-btn" onClick={() => this.props.onClick('rating')}>
                        <span role="img" aria-label="rating">⭐</span> 평점순
                    </button>
                </div>
            </header>
        );
    }
}

export default Header;