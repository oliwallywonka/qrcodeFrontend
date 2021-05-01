import { useQuery, useMutation, useQueryClient} from 'react-query';
import axiosClient from '../config/axios';

const fetchProducts = async() => {
    try {
        const response = await axiosClient.get('/model');
        return response;
    } catch (error) {
        console.log(error);
        return error
    }
}
const createProduct = async({brand,category,clotheModel,refPrice}) => {
    try {
        const response = await axiosClient.post('/model',{brand,category,clotheModel,refPrice});
        return response.json();
    } catch (error) {
        console.log(error);
        return error
    }
}

const editProduct = async({brand,category,clotheModel,refPrice,_id}) => {
    try {
        
        const response = await axiosClient.put(`/model/${_id}`,{brand,category,clotheModel,refPrice});
        return response.json();
    } catch (error) {
        console.log(error);
        return error
    }
}

const desactivateProduct = async({_id}) => {
    try {
        const response = await axiosClient.put(`/model/desactivate/${_id}`);
        return response.json();
    } catch (error) {
        console.log(error);
        return error
    }
}

export const useGetProducts =()=>{
    return useQuery('PRODUCTS',fetchProducts)
}

export const usePostProduct = () => {
    const queryClient = useQueryClient();
    const {mutate} = useMutation(createProduct,{
        onSettled: function () {
            console.log('final')
        },
        onSuccess: ()=>{
            queryClient.invalidateQueries('PRODUCTS');
            console.log('sucess')
        },
        onError: ()=>{
            console.log('error')
        }
    });

    const handlePostRequest = (payload)=> {
        mutate(payload);
    }

    return[
        handlePostRequest
    ];
}

export const usePutProduct = ()=>{
    const queryClient = useQueryClient();
    const {mutate} = useMutation(editProduct,{
        onSuccess: ()=>{
            queryClient.invalidateQueries('PRODUCTS');
        }
    });
    const handlePutRequest = (payload)=>{
        mutate(payload);
    };
    return [
        handlePutRequest
    ];
}

export const useDesactivateProduct = () => {
    const queryClient = useQueryClient();
    const {mutate} = useMutation(desactivateProduct,{
        onSuccess: ()=>{
            queryClient.invalidateQueries('PRODUCTS');
        }
    });
    const handleDesactivateRequest = (payload) =>{
        mutate(payload);
    }
    return [
        handleDesactivateRequest
    ]
}