import { PRODUCTS_URL, UPLOAD_URL } from "../constants";
import { apiSlice } from "./appSlice";

export const productsApiSlice = apiSlice.injectEndpoints({
    endpoints: builder => ({
        getProducts: builder.query({
            query: ({ pageNumber, keyword }) => ({
                url: `${PRODUCTS_URL}`,
                params: {
                    pageNumber,
                    keyword,
                }
            }),
            keepUnusedDataFor: 5,
            providesTags: ['Products']
        }),
        getProductDetail: builder.query({
            query: productId => ({
                url: `${PRODUCTS_URL}/${productId}`
            }),
            keepUnusedDataFor: 5,
            providesTag: ['Products']
        }),
        createProduct: builder.mutation({
            query: data => ({
                url: PRODUCTS_URL,
                method: 'POST',
                body: data,
            }),
            invalidatesTags: ['Products'],
        }),
        updateProduct: builder.mutation({
            query: data => ({
                url: `${PRODUCTS_URL}/${data.productId}`,
                method: 'PUT',
                body: data,
            }),
            invalidatesTags: ['Products'],
        }),
        uploadProductImage: builder.mutation({
            query: data => ({
                url: UPLOAD_URL,
                method: 'POST',
                body: data
            })
        }),
        deleteProduct: builder.mutation({
            query: productId => ({
                url: `${PRODUCTS_URL}/${productId}`,
                method: 'DELETE',
            })
        }),
        createReview: builder.mutation({
            query: data => ({
                url: `${PRODUCTS_URL}/${data.productId}/reviews`,
                method: 'POST',
                body: data,
            }),
            invalidatesTags: ['Products']
        }),
        getTopProducts: builder.query({
            query: () => ({
                url: `${PRODUCTS_URL}/top`,
            }),
            keepUnusedDataFor: 5,
        })
    })
})

export const {
    useGetProductsQuery,
    useGetProductDetailQuery,
    useCreateProductMutation,
    useUpdateProductMutation,
    useUploadProductImageMutation,
    useDeleteProductMutation,
    useCreateReviewMutation,
    useGetTopProductsQuery,
} = productsApiSlice