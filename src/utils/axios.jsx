import axios from "axios";

const instance = axios.create({
  baseURL: "https://api.themoviedb.org/3",
  headers: {
    accept: "application/json",
    Authorization: `Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJlNzA0NTE0Mjk1YmQ2MTllYmZmZDdmYzJlNWY0ODVmZSIsIm5iZiI6MTczMjcyOTYwNy42NzI3NDYyLCJzdWIiOiI2NzQ3NThmNGJiMmZjZjM2MmRlYTg1MWMiLCJzY29wZXMiOlsiYXBpX3JlYWQiXSwidmVyc2lvbiI6MX0.3k1IR5s14WYv1tUid4dIogyB8DYVvPoAXIykP7s7W-M`,
  },
});

export default instance;
