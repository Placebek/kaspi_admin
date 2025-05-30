import API from "./api";

export const addProductService = async (data, token) => {
  const response = await API.post(`/product/add-product`, data, {
    headers: { Authorization: `Bearer ${token}` },
  });
  return response.data;
}

export const getProductsService = async (token) => {
  const response = await API.get(`/product/all-products`, {
    headers: { Authorization: `Bearer ${token}` },
  });
  return response.data;
};

export const deleteProductService = async (id, token) => {
  const response = await API.delete(`/product/delete-product/${id}`, {
    headers: { Authorization: `Bearer ${token}` },
  });
  return response.data;
};

export const updateProductService = async (id, data, token) => {
  const response = await API.put(`/product/update-product/${id}`, data, {
    headers: { Authorization: `Bearer ${token}` },
  });
  return response.data;
};

export const toggleProductStatusService = async (id, token) => {
  const response = await API.put(`/product/update/is_active/${id}`, {}, {
    headers: { Authorization: `Bearer ${token}` },
  });
  return response.data;
}

