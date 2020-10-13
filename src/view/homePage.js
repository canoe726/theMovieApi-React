import React, { Component } from 'react';

import Header from '../components/header.js';
import Contents from '../components/contents.js';
import Loading from '../components/loading.js';
// import Error from '../components/error.js';

import { api } from '../api/movieApi.js'

class HomePage extends Component {
    constructor(props) {
        super(props);
        this._loading = React.createRef();
    }

    componentDidMount() {
        
    }

    handleFetch(response, contents, loading, error, mode) {
        if(!response.isError) {
            const movies = response.data.data.movies;
            // setLocal('movies', movies, 1000 * 60 * 5);
            contents.setState(movies);
        } else {
            const status = response.data.status;
            if(status === 'FetchAbort') {
                console.log(`${mode} fetchAborted!`);
            } else {
                error.setState(response.data);
            }
        }  
        loading.toggleLoading();
    }

    render() {
        return (
            <div className="home-page">
                <Header
                onClick={async mode => {
                    this._loading.current.toggleLoading();
                    console.log('mode : ',mode)
                    
                    if(mode === 'title') {
                        const response = await api.getMoviesByTitle();
                        // this.handleFetch(response, contents, loading, error, 'title');
                    }
                    if(mode === 'rating') {
                        const response = await api.getMoviesByRating();
                        // this.handleFetch(response, contents, loading, error, 'rating');
                    }
                    this._loading.current.toggleLoading();
                }}
                ></Header>
                <Contents>
                    <Loading ref={this._loading}></Loading>
                </Contents>
            </div>
        );
    }
}

export default HomePage;