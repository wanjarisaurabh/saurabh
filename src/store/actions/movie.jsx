export { removemovie } from "../reducers/moviereducer";
import axios from "../../utils/axios";
import { loadmovie } from "../reducers/moviereducer";

export const asyncloadmovie = (id) => async (dispatch, getState) => {
  try {
    const detail = await axios.get(`/movie/${id}`);
    console.log("Detail response:", detail.data);
    const externalid = await axios.get(`/movie/${id}/external_ids`);
    console.log("External ID response:", externalid.data);
    const recommendations = await axios.get(`/movie/${id}/recommendations`);
    console.log("Recommendations response:", recommendations.data);
    const similar = await axios.get(`/movie/${id}/similar`);
    console.log("Similar movies response:", similar.data);
    const videos = await axios.get(`/movie/${id}/videos`);
    console.log("Videos response:", videos.data);
    const watchproviders = await axios.get(`/movie/${id}/watch/providers`);
    console.log(watchproviders);
    let theultimatedetails = {
      details: detail.data || null,
      externalids: externalid.data || null,
      recommendations: recommendations.data?.results || [],
      similar: similar.data?.results || [],
      videos: videos.data?.results?.find((m) => m.type === "Trailer") || null,
      watchproviders: watchproviders.data?.results?.IN || null,
    };

    dispatch(loadmovie(theultimatedetails));
    console.log("Final movie details:", theultimatedetails);
  } catch (error) {
    console.error("Error loading movie data:", {
      message: error.message,
      response: error.response?.data,
      stack: error.stack,
    });
  }
};
