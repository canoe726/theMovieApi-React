import React, { Component } from 'react';

const toggleLoading = () => {
    const loadingWrapper = document.querySelector('.loading-wrapper');
    loadingWrapper.classList.toggle('hidden');
}

class Loading extends Component {
    render() {
        return (
            <div className="loading-wrapper hidden">
                <img className="loading-img" src="/img/loading.gif" alt="loading-img"></img>
            </div>
        );
    }
}

export default Loading;
export { toggleLoading };