# theMovieApi
yts.mx 영화 API 호출 웹 페이지



### 1. theMovieApi 프로젝트
> yts.mx 홈페이지에서 api 호출 기능 구현 (URL : https://yts.mx/api#list_movies)

> React 라이브러리를 사용해 구현

> 이미지 Lazyloading 구현

> fetch 시 abort 기능 구현

> ES6 문법을 활용한 모듈 분리

> router 를 작성을 통한 SPA(Single Page Application) 구현



### 2. 개요
1) 사용언어 : HTML, CSS, Javascript (ES6)

2) 서버 : Node.js (npm start 를 통한 실행)

3) 실행환경 : Chrome 브라우저 (IE 및 다른 브라우저에서 특정 기능이 수행 되지 않을 수 있음)

4) 라이브러리 : React



## 3. 실행화면
<div>
  <img width="45%" src="https://user-images.githubusercontent.com/36183001/94910716-0f407500-04e0-11eb-8bc1-f302bc83b3cd.gif">
  &nbsp;&nbsp;&nbsp;
  <img width="45%" src="https://user-images.githubusercontent.com/36183001/94910725-11a2cf00-04e0-11eb-8853-2e05b6afe779.gif">
</div>

> 왼쪽부터 API 호출, API 호출 중 abort 실행

<div>
  <img width="45%" src="https://user-images.githubusercontent.com/36183001/94910733-136c9280-04e0-11eb-83cf-93c604c7abec.gif">
  &nbsp;&nbsp;&nbsp;
  <img width="45%" src="https://user-images.githubusercontent.com/36183001/94910738-14052900-04e0-11eb-8062-18d1b002dd12.gif">
</div>

> 왼쪽부터 UI 기능 구현, API 호출 중 에러 발생시 에러처리



## 4. 구현한 코드

### 1. AbortController

> fetch는 promise를 기본적으로 반환하는데 비동기 호출을 중단하는 abort 기능이 없다. 

> AbortController를 통해서 비동기 호출을 취소하고 새로운 데이터를 fetch 하는 것이 가능하다.


```
// fetch가 진행중인지 검사하는 boolean 변수
let whileFetching = false;
// AbortController 객체를 담는 변수
let abortController;

const request = async url => {
    try {
        // fetch가 진행중이면 abort() 메소드로 취소시킴
        if(whileFetching) abortController.abort();

        abortController = new AbortController;
        whileFetching = true;

        // abort 기능을 사용하기 위해 fetch 메소드의 signal 파라미터에 AbortController signal 속성 대입
        const response = await fetch(url, {
            signal: abortController.signal
        });

        if(response.ok) {
            const result = await response.json();
            // fetch를 통해 데이터를 가져오는데 성공한 경우 fetch가 끝났기 때문에 변수 whileFetch에 false 대입
            whileFetching = false;
            return result;
        } else {
            const err = await response.json();
            throw err;
        }
    } catch(e) {
        // abort 메소드 호출시 'AbortError'로 예외처리됨
        if(e.name === 'AbortError') {
            throw {
                status: 'FetchAbort'
            }
        }
        throw {
            message: e.message,
            status: e.status
        }
    }
};
```



### 2. yts.mx API

> 기본 yts.mx API URL : https://yts.mx/api/v2/

> 임의의 이름순으로 정렬된 10개의 영화 데이터를 .json 형태로 가져오기 위한 URL : list_movies.json?sort=title&page=3&limit=10


```
const BASE_MOVIE_URL = 'https://yts.mx/api/v2/';
const GET_TITLE = 'list_movies.json?sort=title&page=3&limit=10';
const GET_RATING = 'list_movies.json?sort=rating&page=4&limit=10';
```



### 3. localStorage

> API를 통해 불러온 내용을 localStorage 를 사용해 저장

> 저장한 내용을 최신화하기 위해 5분마다 저장소 초기화

```
const getLocal = keywords => {
    const data = localStorage.getItem(keywords);
    if(keywords === 'movies') {
        const jsonData = JSON.parse(data);
        return jsonData;
    }
}

const setLocal = (keywords, data, timeOut) => {
    const jsonData = JSON.stringify(data);
    localStorage.setItem(keywords, jsonData);

    setTimeout(() => {
        localStorage.removeItem(keywords);
    }, timeOut);
}
```



### 4. IntersectionObserver

> IntersectionObserver 를 통해 현재 웹 화면의 viewport 에 이미지가 존재할 경우 불러오는 것으로 로딩속도 개선

```
const lazyLoad = () => {
    const lazyImages = [].slice.call(document.querySelectorAll('img.lazy'));

    if("IntersectionObserver" in window) {
        let lazyImageObserver = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if(entry.isIntersecting) {
                    let lazyImage = entry.target;
                    lazyImage.src = lazyImage.dataset.src;
                    lazyImage.classList.remove('lazy');
                    lazyImageObserver.unobserve(lazyImage);
                }
            });
        });

        lazyImages.forEach(lazyImage => {
            lazyImageObserver.observe(lazyImage);
        });
    }
}
```


