import React, { Component } from 'react';

class Loading extends Component {
    toggleLoading() {
        const loadingWrapper = document.querySelector('.loading-wrapper');
        loadingWrapper.classList.toggle('hidden');
    }

    render() {
        return (
            <div className="loading-wrapper hidden">
                <img className="loading-img" src="./img/loading.gif" alt="loading-img"></img>
            </div>
        );
    }
}

export default Loading;