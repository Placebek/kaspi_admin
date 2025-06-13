import API from "./api";

export const addProductService = async (data, token) => {
    const response = await API.post(`/product/add`, data, {
        headers: { Authorization: `Bearer ${token}` },
    });
    return response.data;
};

export const getProductsService = async (token) => {
    const response = await API.get(`/product/all`, {
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
    const response = await API.put(
        `/product/update/digital-data?product_id=${id}`,
        data,
        {
            headers: { Authorization: `Bearer ${token}` },
        }
    );
    return response.data;
};

export const toggleProductStatusService = async (id, data, token) => {
    console.log(`/product/update/is_active?product_id=${id}`, data);
    console.log("Token:", token);
    console.log("Data:", data);

    const response = await API.put(
        `/product/update/is_active?product_id=${id}`,
        data,
        {
            headers: { Authorization: `Bearer ${token}` },
        }
    );
    debugger;
    return response.data;
};

export const getProductsWithPaginationService = async (
    page = 0,
    limit = 20,
    is_active = null,
    vender_code = null,
    token
) => {
    if (is_active === null || (is_active === "" && vender_code === null)) {
        const response = await API.get(
            `/product/all?page=${page}&limit=${limit}`,
            {
                headers: { Authorization: `Bearer ${token}` },
            }
        );
        return response.data;
    } else if (vender_code === null && is_active !== null) {
        const response = await API.get(
            `/product/all?page=${page}&limit=${limit}&is_active=${is_active}`,
            {
                headers: { Authorization: `Bearer ${token}` },
            }
        );
        return response.data;
    } else if (is_active === null && vender_code !== null) {
        const response = await API.get(
            `/product/all?page=${page}&limit=${limit}&vender_code=${vender_code}`,
            {
                headers: { Authorization: `Bearer ${token}` },
            }
        );
        return response.data;
    } else {
        const response = await API.get(
            `/product/all?page=${page}&limit=${limit}&is_active=${is_active}&vender_code=${vender_code}`,
            {
                headers: { Authorization: `Bearer ${token}` },
            }
        );
        return response.data;
    }
};
