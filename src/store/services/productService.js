import API from "./api";

export const addProductService = async (data, token) => {
    const response = await API.post(`/product/add-product`, data, {
        headers: { Authorization: `Bearer ${token}` },
    });
    return response.data;
};

export const getProductsService = async (token) => {
    const response = await API.get(`/product/all-products`, {
        headers: { Authorization: `Bearer ${token}` },
    });
    return response.data;
};

export const deleteProductService = async (id, token) => {
    const response = await API.delete(`/product/delete?product_id=${id}`, {
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

export const toggleProductStatusService = async (data, token) => {
    console.log(data.id);
    const response = await API.put(
        `/product/update/is_active?product_id=${data.id}`,
        { 'is_active': data.is_active },
        {
            headers: { Authorization: `Bearer ${token}` },
        }
    );
    return response.data;
};

export const getProductsWithPaginationService = async (page=0, limit=20, is_active=null, token) => {
    const response = await API.get(`/product/all-products?page=${page}&limit=${limit}&is_active=${is_active}`, {
        headers: { Authorization: `Bearer ${token}` },
    });
    return response.data;
}
