import { useSelector } from "react-redux";
import { Route, Routes } from "react-router-dom";
import { getAllMovies } from "../api";
import Carousel from "../components/Carousel";
import Footer from "../components/footer";
import MoviePreview from "../components/movieDetails";
import MovieList from "../components/movieList";
import ShowSelection from "../components/selectShow";
import useFetch from "../hooks/useFetch";
import { bannerList } from "../mock";



export default function Dashboard() {

    const state = useSelector((state) => state);

    const { data: movieList, loading:moviesLoading, error:moviesError } = useFetch(getAllMovies(state?.location),[state?.location]);
    return (
        <Routes>
            <Route
                path="movies/:movieId"
                element={<MoviePreview />}
            />
            <Route
                path="movies/select-show/:movieId"
                element={<ShowSelection />}
            />
            <Route
                path="/"
                element={ <>
                    <Carousel options={bannerList} ></Carousel>
                    <MovieList list={movieList} loading={moviesLoading} error={moviesError}></MovieList>
                    <Footer></Footer>
                </>}
            />
        </Routes>
        
    )
}