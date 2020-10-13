import React, { Component } from 'react';

import Header from '../components/header.js';
import Contents from '../components/contents.js';
// import Error from '../components/error.js';

import { toggleLoading } from '../components/loading.js';

import { api } from '../api/movieApi.js'

class HomePage extends Component {
    constructor(props) {
        super(props);

        this.state = {
            movies: null
        };
    }

    handleFetch(response, mode) {
        if(!response.isError) {
            const movies = response.data.data.movies;
            // setLocal('movies', movies, 1000 * 60 * 5);
            //contents.setState(movies);
            this.setState({
                movies: movies
            });
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
                    console.log('mode : ',mode)
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
                <Contents
                data={this.state.movies}
                >
                </Contents>
            </div>
        );
    }
}

export default HomePage;