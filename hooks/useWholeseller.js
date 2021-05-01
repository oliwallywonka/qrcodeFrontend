import { useQuery, useMutation, useQueryClient} from 'react-query';
import axiosClient from '../config/axios';

const fetchWholesellers = async() => {
    try {
        const response = await axiosClient.get('/wholeseller');
        return response;
    } catch (error) {
        console.log(error);
        return error
    }
}
const createWholeseller = async({name,phone}) => {
    try {
        const response = await axiosClient.post('/wholeseller',{name,phone});
        return response.json();
    } catch (error) {
        console.log(error);
        return error
    }
}

const editWholeseller = async({name,phone,_id}) => {
    try {
        
        const response = await axiosClient.put(`/wholeseller/${_id}`,{name,phone});
        return response.json();
    } catch (error) {
        console.log(error);
        return error
    }
}

const desactivateWholeseller = async({_id}) => {
    try {
        const response = await axiosClient.put(`/wholeseller/desactivate/${_id}`);
        return response.json();
    } catch (error) {
        console.log(error);
        return error
    }
}

export const useGetWholesellers =()=>{
    return useQuery('WHOLESELLERS', fetchWholesellers)
}

export const usePostWholeseller = () => {
    const queryClient = useQueryClient();
    const {mutate} = useMutation(createWholeseller,{
        onSettled: function () {
            console.log('final')
        },
        onSuccess: ()=>{
            queryClient.invalidateQueries('WHOLESELLERS');
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

export const usePutWholeseller = ()=>{
    const queryClient = useQueryClient();
    const {mutate} = useMutation(editWholeseller,{
        onSuccess: ()=>{
            queryClient.invalidateQueries('WHOLESELLERS');
        }
    });
    const handlePutRequest = (payload)=>{
        mutate(payload);
    };
    return [
        handlePutRequest
    ];
}

export const useDesactivateWholeseller = () => {
    const queryClient = useQueryClient();
    const {mutate} = useMutation(desactivateWholeseller,{
        onSuccess: ()=>{
            queryClient.invalidateQueries('WHOLESELLERS');
        }
    });
    const handleDesactivateRequest = (payload) =>{
        mutate(payload);
    }
    return [
        handleDesactivateRequest
    ]
}