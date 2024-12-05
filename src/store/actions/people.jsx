export { removepeople } from "../reducers/peoplereducer";
import axios from "../../utils/axios";
import { loadpeople } from "../reducers/peoplereducer";

export const asyncloadpeople = (id) => async (dispatch, getState) => {
  try {
    const detail = await axios.get(`/person/${id}`);
    console.log("Detail response:", detail.data);
    const externalid = await axios.get(`/person/${id}/external_ids`);
    console.log("External ID response:", externalid.data);

    const combinedcreaditcs = await axios.get(`/person/${id}/combined_credits`);
    const moviecreaditcs = await axios.get(`/person/${id}/movie_credits`);

    const tvcreaditcs = await axios.get(`/person/${id}/tv_credits`);

    let theultimatedetails = {
      details: detail.data,
      Externalids: externalid.data,
      combinedcreaditcs: combinedcreaditcs.data?.cast,
      moviecreaditcs: moviecreaditcs.data?.cast,
      tvcreaditcs: tvcreaditcs.data?.cast,
    };

    // console.log(externalid.data);

    dispatch(loadpeople(theultimatedetails));
    console.log("Final people details:", theultimatedetails);
  } catch (error) {
    console.error("Error loading people data:", {
      message: error.message,
      response: error.response?.data,
      stack: error.stack,
    });
  }
};
