import { useQuery, useMutation, useQueryClient} from 'react-query';
import axiosClient from '../config/axios';

const fetchSizes = async() => {
    try {
        const response = await axiosClient.get('/size');
        return response;
    } catch (error) {
        console.log(error);
        return error
    }
}
const createSize = async({size}) => {
    try {
        const response = await axiosClient.post('/size',{size});
        return response.json();
    } catch (error) {
        console.log(error);
        return error
    }
}

const editSize = async({size,_id}) => {
    try {
        
        const response = await axiosClient.put(`/size/${_id}`,{size});
        return response.json();
    } catch (error) {
        console.log(error);
        return error
    }
}

const desactivateSize = async({_id}) => {
    try {
        const response = await axiosClient.put(`/size/desactivate/${_id}`);
        return response.json();
    } catch (error) {
        console.log(error);
        return error
    }
}

export const useGetSizes =()=>{
    return useQuery('SIZES',fetchSizes)
}

export const usePostSize = () => {
    const queryClient = useQueryClient();
    const {mutate} = useMutation(createSize,{
        onSettled: function () {
            console.log('final')
        },
        onSuccess: ()=>{
            queryClient.invalidateQueries('SIZES');
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

export const usePutSize = ()=>{
    const queryClient = useQueryClient();
    const {mutate} = useMutation(editSize,{
        onSuccess: ()=>{
            queryClient.invalidateQueries('SIZES');
        }
    });
    const handlePutRequest = (payload)=>{
        mutate(payload);
    };
    return [
        handlePutRequest
    ];
}

export const useDesactivateSize = () => {
    const queryClient = useQueryClient();
    const {mutate} = useMutation(desactivateSize,{
        onSuccess: ()=>{
            queryClient.invalidateQueries('SIZES');
        }
    });
    const handleDesactivateRequest = (payload) =>{
        mutate(payload);
    }
    return [
        handleDesactivateRequest
    ]
}