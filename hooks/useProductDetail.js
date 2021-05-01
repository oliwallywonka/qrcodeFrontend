import { useQuery, useMutation, useQueryClient} from 'react-query';
import axiosClient from '../config/axios';

const createProductDetail = async(payload) => {
    try {
        console.log(payload.get('size'))
        const response = await axiosClient.post('/clothe',payload);
        return response.json();
    } catch (error) {
        console.log(error);
        return error
    }
}

const editProductDetail = async(payload) => {
    try {
        const response = await axiosClient.put(`/clothe/${payload.get('_id')}`,payload);
        return response.json();
    } catch (error) {
        console.log(error);
        return error
    }
}

const desactivateProductDetail = async({_id}) => {
    try {
        const response = await axiosClient.put(`/clothe/desactivate/${_id}`);
        return response;
    } catch (error) {
        console.log(error);
        return error
    }
}

export const useGetProductDetails =({_id})=>{
    return useQuery('DETAILS',async()=>{
        const response = await axiosClient.get(`/clothe/model/${_id}`);
        return response;
    });
    //return useQuery('DETAILS',fetchProductDetails(_id))
}

export const usePostProductDetail = () => {
    const queryClient = useQueryClient();
    const {mutate} = useMutation(createProductDetail,{
        onSettled: function () {
            console.log('final')
        },
        onSuccess: ()=>{
            queryClient.invalidateQueries('DETAILS');
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

export const usePutProductDetail = ()=>{
    const queryClient = useQueryClient();
    const {mutate} = useMutation(editProductDetail,{
        onSuccess: ()=>{
            queryClient.invalidateQueries('DETAILS');
        }
    });
    const handlePutRequest = (payload)=>{
        mutate(payload);
    };
    return [
        handlePutRequest
    ];
}

export const useDesactivateProductDetail = () => {
    const queryClient = useQueryClient();
    const {mutate} = useMutation(desactivateProductDetail,{
        onSuccess: ()=>{
            queryClient.invalidateQueries('DETAILS');
        }
    });
    const handleDesactivateRequest = (payload) =>{
        mutate(payload);
    }
    return [
        handleDesactivateRequest
    ]
}