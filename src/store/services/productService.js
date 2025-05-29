import API from "./api";

export const addProductService = async (data, token) => {
  const response = await API.post(`/product/add-product`, data, {
    headers: { Authorization: `Bearer ${token}` },
  });
  return response.data;
};
