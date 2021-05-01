import { useQuery, useMutation, useQueryClient} from 'react-query';
import axiosClient from '../config/axios';

const fetchBrands = async() => {
    try {
        const response = await axiosClient.get('/brand');
        return response;
    } catch (error) {
        console.log(error);
        return error
    }
}
const createBrand = async({brand}) => {
    try {
        const response = await axiosClient.post('/brand',{brand});
        return response.json();
    } catch (error) {
        console.log(error);
        return error
    }
}

const editBrand = async({brand,_id}) => {
    try {
        
        const response = await axiosClient.put(`/brand/${_id}`,{brand});
        return response.json();
    } catch (error) {
        console.log(error);
        return error
    }
}

const desactivateBrand = async({_id}) => {
    try {
        const response = await axiosClient.put(`/brand/desactivate/${_id}`);
        return response.json();
    } catch (error) {
        console.log(error);
        return error
    }
}

export const useGetBrands =()=>{
    return useQuery('BRANDS',fetchBrands)
}

export const usePostBrand = () => {
    const queryClient = useQueryClient();
    const {mutate} = useMutation(createBrand,{
        onSettled: function () {
            console.log('final')
        },
        onSuccess: ()=>{
            queryClient.invalidateQueries('BRANDS');
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

export const usePutBrand = ()=>{
    const queryClient = useQueryClient();
    const {mutate} = useMutation(editBrand,{
        onSuccess: ()=>{
            queryClient.invalidateQueries('BRANDS');
        }
    });
    const handlePutRequest = (payload)=>{
        mutate(payload);
    };
    return [
        handlePutRequest
    ];
}

export const useDesactivateBrand = () => {
    const queryClient = useQueryClient();
    const {mutate} = useMutation(desactivateBrand,{
        onSuccess: ()=>{
            queryClient.invalidateQueries('BRANDS');
        }
    });
    const handleDesactivateRequest = (payload) =>{
        mutate(payload);
    }
    return [
        handleDesactivateRequest
    ]
}