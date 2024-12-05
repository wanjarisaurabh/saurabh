export { removetv } from "../reducers/tvreducer";
import axios from "../../utils/axios";
import { loadtv } from "../reducers/tvreducer";

export const asyncloadtv = (id) => async (dispatch, getState) => {
  try {
    const detail = await axios.get(`/tv/${id}`);
    console.log("Detail response:", detail.data);
    const externalid = await axios.get(`/tv/${id}/external_ids`);
    console.log("External ID response:", externalid.data);
    const recommendations = await axios.get(`/tv/${id}/recommendations`);
    console.log("Recommendations response:", recommendations.data);
    const similar = await axios.get(`/tv/${id}/similar`);
    console.log("Similar tvs response:", similar.data);
    const videos = await axios.get(`/tv/${id}/videos`);
    console.log("Videos response:", videos.data);
    const watchproviders = await axios.get(`/tv/${id}/watch/providers`);
    console.log(watchproviders);
    let theultimatedetails = {
      details: detail.data || null,
      externalids: externalid.data || null,
      recommendations: recommendations.data?.results || [],
      similar: similar.data?.results || [],
      videos: videos.data?.results?.find((m) => m.type === "Trailer") || null,
      watchproviders: watchproviders.data?.results?.IN || null,
    };

    dispatch(loadtv(theultimatedetails));
    console.log("Final tv details:", theultimatedetails);
  } catch (error) {
    console.error("Error loading tv data:", {
      message: error.message,
      response: error.response?.data,
      stack: error.stack,
    });
  }
};
