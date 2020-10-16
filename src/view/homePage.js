import React, { Component } from 'react';

import Header from '../components/header.js';
import Contents from '../components/contents.js';
// import Error from '../components/error.js';

import { toggleLoading } from '../components/loading.js';

import { getLocal, setLocal } from '../util/localStorage.js';

import { api } from '../api/movieApi.js'

class HomePage extends Component {
    constructor(props) {
        super(props);
        this.handleFetch = this.handleFetch.bind(this);
        this.state = {movies: getLocal('movies')};
    }

    handleFetch(response, mode) {
        if(!response.isError) {
            const movies = response.data.data.movies;
            setLocal('movies', movies);
            toggleLoading();

            this.setState({movies: movies});
        } else {
            const status = response.data.status;
            if(status === 'FetchAbort') {
                console.log(`${mode} fetchAborted!`);
            } else {
                //error.setState(response.data);
            }
        }
    }

    render() {
        return (
            <div className="home-page">
                <Header
                onClick={async mode => {
                    toggleLoading();
                    
                    if(mode === 'title') {
                        const response = await api.getMoviesByTitle();
                        this.handleFetch(response, 'title');
                    }
                    if(mode === 'rating') {
                        const response = await api.getMoviesByRating();
                        this.handleFetch(response, 'rating');
                    }
                }}
                ></Header>
                <Contents data={this.state.movies}>
                </Contents>
            </div>
        );
    }
}

export default HomePage;